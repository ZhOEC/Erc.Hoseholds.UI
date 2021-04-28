import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { BranchOfficeService } from './../../../shared/services/branch-office.service'
import { TaxInvoiceService } from 'src/app/shared/services/tax-invoices.service'
import { TaxInvoiceCreateRequest } from './../../../shared/models/tax-invoices/tax-invoice-create-request'
import { TaxInvoiceTabLine } from 'src/app/shared/models/tax-invoices/tax-invoice-tab-line'
import { TaxInvoiceType, taxInvoiceMap, TaxInvoiceTypeData } from './../../../shared/models/tax-invoices/tax-invoice-type'
import { TaxInvoice } from 'src/app/shared/models/tax-invoices/tax-invoice'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { TrueRoundPipe } from './../../../shared/pipes/true-round.pipe'

@Component({
  selector: 'app-tax-invoice-create',
  templateUrl: './tax-invoice-create.component.html',
  styleUrls: ['./tax-invoice-create.component.scss']
})
export class TaxInvoiceCreateComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
  datesMoreEndDatePeriod = null

  taxInvoiceForm: FormGroup
  createTaxInvoiceData: TaxInvoiceCreateRequest[] = []
  branchOfficesOptions: { label: string, value: BranchOffice, disabled: boolean }[] = []
  taxInvoiceTypes: TaxInvoiceTypeData[] = []
  
  taxInvoice: TaxInvoice
  tabLines: TaxInvoiceTabLine[] = []
  isLoadingSubmit: boolean

  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private taxInvoiceService: TaxInvoiceService,
    private notification: NotificationComponent,
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

    this.getDataForCreateTaxInvoice()
  }

  private getDataForCreateTaxInvoice() {
    this.branchOfficeService.getDataCreateTaxInvoice().subscribe(
      response => {
        this.createTaxInvoiceData = response
        this.branchOfficesOptions = response.map(bo => {
          return { label: bo.branchOffice.name, value: bo.branchOffice, disabled: bo.isDisabled }
        })
      })
  }

  onChangeBranchOffice(branchOffice: BranchOffice) {
    this.createTaxInvoiceData.filter(item => item.branchOffice.id == branchOffice?.id)
      .map(i => {
        this.taxInvoiceForm.controls.type.reset()

        this.taxInvoiceTypes = [taxInvoiceMap[0]] // set default type: CompensationDso
        i.branchOffice.availableCommodities.forEach(c => {
          this.taxInvoiceTypes.push(taxInvoiceMap[c])
        })
      })
  }

  onChangeInvoiceType() {
    let cti = this.createTaxInvoiceData.find(x => x.branchOffice.id = this.taxInvoiceForm.controls.branchOffice.value)    
    this.taxInvoiceForm.controls.liabilityDate.patchValue(new Date(cti.period.endDate))

    // disabling dates
    this.datesMoreEndDatePeriod = (date: Date): boolean => {
      if(this.taxInvoiceForm.controls.type.value == TaxInvoiceType.CompensationDso)
        return date > new Date(cti.period.endDate)
      else
        return date != new Date(cti.period.endDate)
      
    }

    // Calculate quantity and set per
    this.quantityCalculate()
  }

  onChangePaymentsSum(paymentsSum: number) {
    /*decimal taxSum = decimal.Round(paymentsSum / ((1 + taxKoeff) / taxKoeff), 6, MidpointRounding.AwayFromZero);
    decimal liabilitySum = decimal.Round(paymentsSum - taxSum, 2, MidpointRounding.AwayFromZero);
    taxSum = decimal.Round(liabilitySum / 5, 6, MidpointRounding.AwayFromZero);*/

    let tax = this.trueRoundPipe.transform((paymentsSum / 6), 6)
    let liabilityAmount = this.trueRoundPipe.transform(paymentsSum - tax, 2)
    tax = this.trueRoundPipe.transform((liabilityAmount / 5), 6)

    this.taxInvoiceForm.controls.liabilitiesAmount.setValue(liabilityAmount)
    this.taxInvoiceForm.controls.tax.setValue(tax)

    // Calculate and set quantity after change paymentsSum
    this.quantityCalculate()
  }

  onChangeTariff(tariff: number) {
    let price = this.trueRoundPipe.transform(tariff / 1.2, 8) // tariff without tax
    this.taxInvoiceForm.controls.price.setValue(price)

    // Calculate and set quantity after change tariff
    this.quantityCalculate()
  }

  getQuantitySuffix() { return this.taxInvoiceTypes.find(x => x.value == this.taxInvoiceForm.controls.type.value)?.unit }

  private quantityCalculate() {
    let paymentsSum = this.taxInvoiceForm.controls.paymentsSum?.value
    let tariff = this.taxInvoiceForm.controls.tariff?.value
    // Get quantity
    if (paymentsSum && tariff) {
      let precision = this.taxInvoiceForm.controls.type.value == TaxInvoiceType.NaturalGas ? 2 : 0

      let quantity = this.trueRoundPipe.transform(paymentsSum / tariff, precision)
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
        productName: taxInvoiceMap[taxInvoiceType].productName,
        productCode: taxInvoiceMap[taxInvoiceType].productCode,
        unit: taxInvoiceMap[taxInvoiceType].unit,
        unitCode: taxInvoiceMap[taxInvoiceType].unitCode,
        quantity: this.taxInvoiceForm.controls.quantity.value,
        price: this.taxInvoiceForm.controls.price.value,
        liabilitiesAmount: this.taxInvoiceForm.controls.liabilitiesAmount.value,
        tax: this.taxInvoiceForm.controls.tax.value
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
    this.taxInvoice = {
      branchOfficeId: branchOffice.id,
      periodId: this.createTaxInvoiceData.filter(item => item.branchOffice.id == branchOffice.id)[0].period.id,
      type: this.taxInvoiceForm.controls.type.value,
      liabilityDate: this.taxInvoiceForm.controls.liabilityDate.value,
      liabilitySum: this.tabLines.map(x => x.liabilitiesAmount).reduce((a, b) => a + b, 0),
      quantityTotal: this.tabLines.map(x => x.quantity).reduce((a, b) => a + b, 0),
      taxSum: this.tabLines.map(x => x.tax).reduce((a, b) => a + b, 0),
      fullSum: this.tabLines.map(x => x.liabilitiesAmount).reduce((a, b) => a + b, 0) + this.tabLines.map(x => x.tax).reduce((a, b) => a + b, 0),
      tabLines: this.tabLines
    }

    this.taxInvoiceService.create(this.taxInvoice).subscribe(
      _ => {
        this.notification.show('success', 'Успіх', `Податкову накладну, успішно створено!`)
        this.taxInvoiceForm.enable()
        this.taxInvoiceForm.reset()
        this.taxInvoice = null
        this.tabLines = []

        this.getDataForCreateTaxInvoice()

        this.isLoadingSubmit = false
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося створити податкову накладну!`)
        this.isLoadingSubmit = false
      })
  }
}