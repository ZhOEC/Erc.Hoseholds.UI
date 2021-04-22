import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { BranchOfficeService } from './../../../shared/services/branch-office.service'
import { TaxInvoiceService } from 'src/app/shared/services/tax-invoices.service'
import { TaxInvoiceCreateRequest } from './../../../shared/models/tax-invoices/tax-invoice-create-request'
import { TaxInvoiceTabLine } from 'src/app/shared/models/tax-invoices/tax-invoice-tab-line'
import { taxInvoiceMap, TaxInvoiceTypeData } from './../../../shared/models/tax-invoices/tax-invoice-type'
import { TaxInvoice } from 'src/app/shared/models/tax-invoices/tax-invoice'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'

@Component({
  selector: 'app-tax-invoice-create',
  templateUrl: './tax-invoice-create.component.html',
  styleUrls: ['./tax-invoice-create.component.scss']
})
export class TaxInvoiceCreateComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'

  taxInvoiceForm: FormGroup
  createTaxInvoiceData: TaxInvoiceCreateRequest[] = []
  branchOfficesOptions: { label: string, value: BranchOffice, disabled: boolean }[] = []
  taxInvoiceTypes: TaxInvoiceTypeData[] = []

  tabLines: TaxInvoiceTabLine[] = []
  taxInvoice: TaxInvoice

  isLoadingSubmit: boolean

  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private taxInvoiceService: TaxInvoiceService,
    private notification: NotificationComponent) {}

  ngOnInit() {
    this.taxInvoiceForm = this.formBuilder.group({
      branchOffice: [null, Validators.required],
      type: [null, Validators.required],
      liabilityDate: [null, Validators.required], // Дата забов'язань

      liabilitiesAmount: [null, Validators.required], // База опадаткування
      quantity: [null, Validators.required], // Кількість
      price: [null, Validators.required], // Ціна постачання одиниці товару/послуги
      tax: [null, Validators.required] // Сума ПДВ
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
        this.taxInvoiceForm.get('type').reset()
        this.taxInvoiceForm.get('liabilityDate').patchValue(i.period.endDate)

        this.taxInvoiceTypes = [taxInvoiceMap[0]] // set default type: CompensationDso
        i.branchOffice.availableCommodities.forEach(c => {
          this.taxInvoiceTypes.push(taxInvoiceMap[c])
        })
      })
  }

  getQuantitySuffix() { return this.taxInvoiceTypes.find(x => x.value == this.taxInvoiceForm.get('type').value)?.unit }

  private validateForm() {
    for (const p in this.taxInvoiceForm.controls) {
      this.taxInvoiceForm.controls[p].markAsDirty()
      this.taxInvoiceForm.controls[p].updateValueAndValidity()
    }

    return this.taxInvoiceForm.valid
  }

  addTabLine() {
    if (this.validateForm()) {
      let taxInvoiceType = this.taxInvoiceForm.get('type').value
      this.tabLines = [...this.tabLines, {
        rowNumber: this.tabLines.length + 1,
        productName: taxInvoiceMap[taxInvoiceType].productName,
        productCode: taxInvoiceMap[taxInvoiceType].productCode,
        unit: taxInvoiceMap[taxInvoiceType].unit,
        unitCode: taxInvoiceMap[taxInvoiceType].unitCode,
        quantity: this.taxInvoiceForm.get('quantity').value,
        price: this.taxInvoiceForm.get('price').value,
        liabilitiesAmount: this.taxInvoiceForm.get('liabilitiesAmount').value,
        tax: this.taxInvoiceForm.get('tax').value
      }]
    }
  }

  removeTabLine(tabLine: TaxInvoiceTabLine) {
    this.tabLines = this.tabLines.filter(tb => tb != tabLine)
    this.tabLines.forEach(x => x.rowNumber = this.tabLines.indexOf(x) + 1)
  }

  submitTaxes() {
    this.isLoadingSubmit = true

    let branchOffice = this.taxInvoiceForm.get('branchOffice').value
    this.taxInvoice = {
      branchOfficeId: branchOffice.id,
      periodId: this.createTaxInvoiceData.filter(item => item.branchOffice.id == branchOffice.id)[0].period.id,
      type: this.taxInvoiceForm.get('type').value,
      liabilityDate: this.taxInvoiceForm.get('liabilityDate').value,
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

