import { Payment } from './../../../shared/models/payments/payment.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
  @Output() onCloseModal = new EventEmitter<Payment>()

  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }

  paymentForm: FormGroup
  isVisible = false
  isOkLoading = false

  paymentTypeList = [
    { id: 0, name: 'Платіж абонента' },
    { id: 1, name: 'Соціальна допомога' },
    { id: 2, name: 'Компенсація ОСР' },
    { id: 3, name: 'Корегування' }
  ]

  constructor(private formBuilder: FormBuilder,
    private notification: NotificationComponent) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      accountingPointName: [null, [Validators.required]],
      payerInfo: [null, [Validators.required]],
      payDate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      type: [null, [Validators.required]]
    })
  }

  openDialog() {
    this.isVisible = true
  }

  resetForm() {
    this.paymentForm.reset()
  }

  submitForm() {
    this.isOkLoading = true
  }
}
