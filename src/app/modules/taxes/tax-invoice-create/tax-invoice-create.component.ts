import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { BranchOfficeService } from './../../../shared/services/branch-office.service'
import { TaxInvoiceService } from 'src/app/shared/services/tax-invoices.service'
import { TaxInvoiceTabLine } from 'src/app/shared/models/tax-invoices/tax-invoice-tab-line'
import { TaxInvoiceType, taxInvoiceMap, TaxInvoiceTypeData } from './../../../shared/models/tax-invoices/tax-invoice-type'
import { TaxInvoice } from 'src/app/shared/models/tax-invoices/tax-invoice'
import { NotificationService } from '../../../shared/components/notification/notification.service'
import { TrueRoundPipe } from './../../../shared/pipes/true-round.pipe'
import { Period } from 'src/app/shared/models/period'

@Component({
  selector: 'app-tax-invoice-create',
  templateUrl: './tax-invoice-create.component.html',
  styleUrls: ['./tax-invoice-create.component.scss']
})
export class TaxInvoiceCreateComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
  disabledDates = null
  previousPeriod: Period
  
  taxInvoiceForm: FormGroup
  branchOffices: BranchOffice[] = []
  periods: Period[]
  taxInvoiceTypesOptions: { label: string, value: TaxInvoiceTypeData, disabled: boolean }[] = []
  
  taxInvoice: TaxInvoice
  tabLines: TaxInvoiceTabLine[] = []
  isLoadingSubmit: boolean

  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private taxInvoiceService: TaxInvoiceService,
    private notification: NotificationService,
    private trueRoundPipe: TrueRoundPipe) {}

  ngOnInit() {
    this.taxInvoiceForm = this.formBuilder.group({
      branchOffice: [null, Validators.required],
      type: [null, Validators.required],
      liabilityDate: [null, Validators.required], // Дата забов'язань

      paymentsSum: [null, Validators.required], // База опадаткування
      tariff: [null, Validators.required], // Тариф

      liabilitiesAmount: [{ value: null, disabled: true }], // База опадаткування
      quantity: [{ value: null, disabled: true }], // Кількість
      price: [{ value: null, disabled: true }], // Ціна постачання одиниці товару/послуги
      tax: [{ value: null, disabled: true }] // Сума ПДВ
    })

    this.getBranchOffices()
  }

  private getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(
      bos => this.branchOffices = bos
    )
  }

  onChangeBranchOffice(branchOffice: BranchOffice) {
      this.taxInvoiceForm.controls.type.reset()
      this.taxInvoiceForm.controls.liabilityDate.reset()

      if (branchOffice) {
        this.branchOfficeService.getPeriods(branchOffice.id).subscribe(
          periods => {
            this.previousPeriod = periods.sort(x => x.id).filter(x => x.id != branchOffice.currentPeriod.id)[0]

            this.taxInvoiceTypesOptions = [{ label: taxInvoiceMap[0].title, value: taxInvoiceMap[0], disabled: false }] // set default type: CompensationDso
            branchOffice.availableCommodities.forEach(c => {
              this.taxInvoiceService.getByPeriod(branchOffice.id, this.previousPeriod.id).subscribe(
                response => {
                  let isDisabled = response.find(t => t.type != TaxInvoiceType.CompensationDso) ? true : false
                  this.taxInvoiceTypesOptions = [...this.taxInvoiceTypesOptions, { label: taxInvoiceMap[c].title, value: taxInvoiceMap[c], disabled: isDisabled }]
                })
            })
          })
      }
  }

  onChangeInvoiceType(invoiceTypeData: TaxInvoiceTypeData) {
    if (invoiceTypeData) {
      // set date previous period
      this.taxInvoiceForm.controls.liabilityDate.patchValue(new Date(this.previousPeriod.endDate))
      // disabling dates
      this.disabledDates = (date: Date): boolean => invoiceTypeData.value !== TaxInvoiceType.CompensationDso && date != new Date(this.previousPeriod.endDate)
      }
    // Calculate quantity and set per
    this.quantityCalculate()
  }

  onChangePaymentsSum(paymentsSum: number) {
    let tax = this.trueRoundPipe.transform(paymentsSum / 6, 6)
    let liabilityAmount = this.trueRoundPipe.transform(paymentsSum - tax, 2)
    tax = this.trueRoundPipe.transform(liabilityAmount / 5, 6)

    this.taxInvoiceForm.controls.liabilitiesAmount.setValue(liabilityAmount)
    this.taxInvoiceForm.controls.tax.setValue(tax)

    // Calculate and set quantity after change paymentsSum
    this.quantityCalculate()
  }

  onChangeTariff(tariff: number) {
    const precision = (this.taxInvoiceForm.controls.type?.value.value == TaxInvoiceType.CompensationDso) ? 2 : 8
    console.log(this.taxInvoiceForm.controls.type?.value.value);
    console.log(precision);
    
    let price = this.trueRoundPipe.transform(tariff / 1.2, precision) // tariff without tax
    this.taxInvoiceForm.controls.price.setValue(price)

    // Calculate and set quantity after change tariff
    this.quantityCalculate()
  }

  getQuantitySuffix() { return this.taxInvoiceTypesOptions.find(x => x.value == this.taxInvoiceForm.controls.type.value)?.value.unit }

  private quantityCalculate() {
    let invoiceType = this.taxInvoiceForm.controls.type?.value
    let paymentsSum = this.taxInvoiceForm.controls.paymentsSum?.value
    let tariff = this.taxInvoiceForm.controls.tariff?.value
    // Get quantity
    if (paymentsSum && tariff && invoiceType) {
      let quantity = this.trueRoundPipe.transform(paymentsSum / tariff, invoiceType.precision)
      this.taxInvoiceForm.controls.quantity.setValue(quantity)
    }
  }

  private validateForm() {
    for (const p in this.taxInvoiceForm.controls) {
      this.taxInvoiceForm.controls[p].markAsDirty()
      this.taxInvoiceForm.controls[p].updateValueAndValidity()
    }

    return this.taxInvoiceForm.valid
  }

  addTabLine() {
    if (this.validateForm()) {
      let taxInvoiceType = this.taxInvoiceForm.controls.type.value
      this.tabLines = [...this.tabLines, {
        rowNumber: this.tabLines.length + 1,
        productName: taxInvoiceMap[taxInvoiceType.value].productName,
        productCode: taxInvoiceMap[taxInvoiceType.value].productCode,
        unit: taxInvoiceMap[taxInvoiceType.value].unit,
        unitCode: taxInvoiceMap[taxInvoiceType.value].unitCode,
        quantity: this.trueRoundPipe.transform(this.taxInvoiceForm.controls.quantity.value, taxInvoiceType.precision),
        liabilitiesAmount: this.trueRoundPipe.transform(this.taxInvoiceForm.controls.liabilitiesAmount.value, 2),
        price: this.trueRoundPipe.transform(this.taxInvoiceForm.controls.price.value, 8),
        tax: this.trueRoundPipe.transform(this.taxInvoiceForm.controls.tax.value, 6)
      }]
    }
  }

  removeTabLine(tabLine: TaxInvoiceTabLine) {
    this.tabLines = this.tabLines.filter(tb => tb != tabLine)
    this.tabLines.forEach(x => x.rowNumber = this.tabLines.indexOf(x) + 1)
  }

  submitTaxes() {
    this.isLoadingSubmit = true

    let branchOffice = this.taxInvoiceForm.controls.branchOffice.value
    let invoiceType = this.taxInvoiceForm.controls.type.value
    this.taxInvoice = {
      branchOfficeId: branchOffice.id,
      periodId: this.previousPeriod.id,
      type: invoiceType.value,
      liabilityDate: this.taxInvoiceForm.controls.liabilityDate.value,

      liabilitySum: this.trueRoundPipe.transform(this.tabLines.map(x => x.liabilitiesAmount).reduce((a, b) => a + b, 0), 2),
      quantityTotal: this.trueRoundPipe.transform(this.tabLines.map(x => x.quantity).reduce((a, b) => a + b, 0), invoiceType.precision),
      taxSum: this.trueRoundPipe.transform(this.tabLines.map(x => x.tax).reduce((a, b) => a + b, 0), 2),
      fullSum: this.trueRoundPipe.transform(this.tabLines.map(x => x.liabilitiesAmount).reduce((a, b) => a + b, 0) + this.tabLines.map(x => x.tax).reduce((a, b) => a + b, 0), 2),
      tabLines: this.tabLines
    }

    this.taxInvoiceService.create(this.taxInvoice).subscribe(
      _ => {
        this.notification.show('success', 'Успіх', `Податкову накладну, успішно створено!`)
        this.taxInvoiceForm.reset()
        this.taxInvoice = null
        this.tabLines = []

        this.isLoadingSubmit = false
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося створити податкову накладну!`)
        this.isLoadingSubmit = false
      })
  }
}