import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PaymentService } from 'src/app/shared/services/payment.service'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { PaymentView } from '../../../shared/models/payments/payment-view.model'
import { NotificationService } from '../../../shared/components/notification/notification.service'

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  @Output() updateData = new EventEmitter()
  
  modalTitle: string
  datesMoreToday = (date: number): boolean => { return date > Date.now() }

  paymentForm: FormGroup
  selectedAccountingPoint: { id: number; text: string; payerInfo: string }
  searchAccountingPointResults: Array<{ id: number; text: string; payerInfo: string }> = []
  isVisible = false
  isOkLoading = false

  constructor(private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private paymentService: PaymentService,
    private notification: NotificationService) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      id: [null],
      batchId: [null],
      accountingPointId: [null],
      payDate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      payerInfo: [null],
      type: [null]
    })
  }

  openDialog(payment: PaymentView) {
    this.paymentForm.reset()

    if (payment) {
      this.modalTitle = `Редагування платежу`
      this.paymentForm.patchValue(payment)

      if (payment.accountingPointName) {
        this.selectedAccountingPoint = { id: payment.accountingPointId, text: `${payment.accountingPointName} ${payment.payerInfo}`, payerInfo: payment.payerInfo }
        this.searchAccountingPointResults.push(this.selectedAccountingPoint)
      }
    } else {
      this.modalTitle = `Додати платіж`
      this.paymentForm.get('batchId').setValue(payment.batchId)
      this.paymentForm.get('type').setValue(payment.type)
    }

    this.paymentForm.markAsUntouched()
    this.isVisible = true
  }

  searchAccountingPoint(searchQuery: string) {
    if(searchQuery.length >= 6) {
      this.accountingPointService.search(searchQuery)
        .subscribe(
          (data: any[]) => {
            this.searchAccountingPointResults = []
            data.forEach(element => {
              this.searchAccountingPointResults.push({ 
                id: element.id, 
                text: `${element.name}, ${element.owner}, ${element.streetAddress}, ${element.cityName}`,
                payerInfo: `${element.owner}, ${element.streetAddress}, ${element.cityName}`
               })
            })
          }
        )
    }
  }

  selectedFoundAccountingPoint(selectedAccountingPoint: { id: number; text: string; payerInfo: string }) {
    this.paymentForm.get('accountingPointId').setValue(selectedAccountingPoint.id)
    this.paymentForm.get('payerInfo').setValue(selectedAccountingPoint.payerInfo)

    this.paymentForm.markAllAsTouched()
  }

  resetForm() {
    this.paymentForm.reset()
    this.selectedAccountingPoint = null
    this.searchAccountingPointResults = []
  }

  submitForm() {
    this.isOkLoading = true
    
    if (this.paymentForm.value.id) {
      this.paymentService.update(this.paymentForm.value)
        .subscribe(
          _ => {
            this.updateData.emit()
            this.resetForm()
            this.isOkLoading = false
            this.isVisible = false
            this.notification.show('success', 'Успіх', `Платіж успішно оновлено!`)
          },
          _ => {
            this.isOkLoading = false
            this.notification.show('error', 'Фіаско', `Не вдалося оновити платіж`)
          }
        )
    } else {
      this.paymentService.add(this.paymentForm.value)
        .subscribe(
          _ => {
            this.updateData.emit()
            this.resetForm()
            this.isOkLoading = false
            this.isVisible = false
            this.notification.show('success', 'Успіх', `Платіж успішно додано!`)
          },
          _ => {
            this.isOkLoading = false
            this.notification.show('error', 'Фіаско', `Не вдалося додати платіж`)
          }
        )
    }
  }
}
