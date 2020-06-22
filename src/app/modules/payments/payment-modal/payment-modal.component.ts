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
  @Input() paymentsBatchId: number
  @Input() paymentType: number
  @Output() addPaymentToList = new EventEmitter<PaymentView>()

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
      paymentsBatchId: [null],
      accountingPointId: [null],
      payDate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      payerInfo: [null],
      type: [null]
    })
  }

  openAddPaymentDialog() {
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
                payerInfo: `${element.owner}, ${element.streetAddress}`
               })
            })
          }
        )
    }
  }

  selectedFoundAccountingPoint(accountingPoint: { id: number; text: string; payerInfo: string }) {
    this.paymentForm.get('paymentsBatchId').setValue(this.paymentsBatchId)
    this.paymentForm.get('accountingPointId').setValue(accountingPoint.id)
    this.paymentForm.get('payerInfo').setValue(accountingPoint.payerInfo)
    this.paymentForm.get('type').setValue(this.paymentType)
  }

  resetForm() {
    this.paymentForm.reset()
    this.selectedAccountingPoint = null
    this.searchAccountingPointResults = []
  }

  submitForm() {
    this.isOkLoading = true
    
    this.paymentService.add(this.paymentForm.value)
      .subscribe(
        payment => {
          console.log(payment)
          this.addPaymentToList.emit(payment)
          this.resetForm()
          this.isOkLoading = false
          this.isVisible = false
          this.notification.show('success', 'Успіх', `Платіж успішно додано!`)
        },
        error => {
          this.isOkLoading = false
          this.notification.show('error', 'Фіаско', `Не додати платіж`)
        }
    )
  }
}
