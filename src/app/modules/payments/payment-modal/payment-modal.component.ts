import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { PaymentService } from 'src/app/shared/services/payment.service'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { PaymentView } from '../../../shared/models/payments/payment-view.model'

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  @Output() addPaymentToList = new EventEmitter<PaymentView>()
  @Output() updatePaymentInList = new EventEmitter<PaymentView>()
  
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
    private notification: NotificationComponent) {}

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

  openAddPaymentDialog() {
    this.modalTitle = `Додати платіж`
    this.paymentForm.reset()
    this.paymentForm.markAsUntouched()

    this.isVisible = true
  }

  openEditPaymentDialog(payment: PaymentView) {
    this.modalTitle = `Редагування платежу для - ${payment.accountingPointName}`
    this.paymentForm.reset()
    this.paymentForm.patchValue(payment)
    this.paymentForm.markAsUntouched()

    this.selectedAccountingPoint = { id: payment.accountingPointId, text: `${payment.accountingPointName}, ${payment.payerInfo}`, payerInfo: payment.payerInfo }
    this.searchAccountingPointResults.push(this.selectedAccountingPoint)

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
    this.paymentForm.value.accountingPointId = selectedAccountingPoint.id
    this.paymentForm.value.payerInfo = selectedAccountingPoint.payerInfo

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
          payment => {
            this.updatePaymentInList.emit(payment)
            this.resetForm()
            this.isOkLoading = false
            this.isVisible = false
            this.notification.show('success', 'Успіх', `Платіж для ${payment.accountingPointName}, успішно оновлено!`)
          },
          error => {
            this.isOkLoading = false
            this.notification.show('error', 'Фіаско', `Не вдалося оновити платіж`)
          }
        )
    } else {
      this.paymentService.add(this.paymentForm.value)
        .subscribe(
          payment => {
            this.addPaymentToList.emit(payment)
            this.resetForm()
            this.isOkLoading = false
            this.isVisible = false
            this.notification.show('success', 'Успіх', `Платіж успішно додано!`)
          },
          error => {
            this.isOkLoading = false
            this.notification.show('error', 'Фіаско', `Не вдалося додати платіж`)
          }
        )
    }
  }
}
