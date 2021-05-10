import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model'
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service'
import { PaymentModalComponent } from './../payment-modal/payment-modal.component'
import { PaymentService } from 'src/app/shared/services/payment.service'
import { PaymentView } from 'src/app/shared/models/payments/payment-view.model'
import { NotificationService } from 'src/app/shared/components/notification/notification.service'

@Component({
  selector: 'app-payment-batch-detail',
  templateUrl: './payment-batch-detail.component.html',
  styleUrls: ['./payment-batch-detail.component.css']
})

export class PaymentBatchDetailComponent implements OnInit {
  @ViewChild(PaymentModalComponent)
  private paymentModalComponent: PaymentModalComponent

  paymentsBatch: PaymentBatchView
  paymentList: PaymentView[]

  totalCount = 0
  pageNumber = 1
  pageSize = 10
  showProcessedPayments = false
  isLoading = true

  showPaymentModal = false

  constructor(private route: ActivatedRoute,
    private paymentBatchService: PaymentBatchService,
    private paymentService: PaymentService,
    private notification: NotificationService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPaymentsBatchById(+params['id'])
      this.getPaymentsPart(+params['id'], this.pageNumber, this.pageSize, this.showProcessedPayments)
    })
  }

  getPaymentsBatchById(batchId: number) {
    this.paymentBatchService.getOne(+batchId)
      .subscribe(paymentsBatch => {
        this.paymentsBatch = paymentsBatch
      })
  }

  getPaymentsPart(paymentsBatchId: number, pageNumber: number, pageSize: number, showProcessed: boolean) {
    this.isLoading = true
    this.paymentService.getPart(paymentsBatchId, pageNumber, pageSize, showProcessed)
      .subscribe(response => {
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.paymentList = <PaymentView[]>response.body
        this.isLoading = false
      })
  }

  onChangedShowProcessedPayments(showProcessed: boolean) {
    this.showProcessedPayments = showProcessed
    this.getPaymentsPart(+this.paymentsBatch.id, this.pageNumber, this.pageSize, this.showProcessedPayments)
  }

  openPaymentDialog(payment: PaymentView) {
    if (payment)
      this.paymentModalComponent.openDialog(payment)
    else {
      let consPayment: PaymentView = { 
        id: null,
        batchId: this.paymentsBatch.id,
        branchOfficeName: null,
        accountingPointId: null,
        accountingPointName: null,
        payerInfo: null,
        payDate: null,
        amount: null,
        status: null,
        type: this.paymentsBatch.paymentChannelPaymentsType, 
      }
      this.paymentModalComponent.openDialog(consPayment)
    }
  }

  pageIndexChange(pageIndex: number) {
    this.pageNumber = pageIndex
    this.getPaymentsPart(+this.paymentsBatch.id, this.pageNumber, this.pageSize, this.showProcessedPayments)
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.getPaymentsPart(+this.paymentsBatch.id, this.pageNumber, this.pageSize, this.showProcessedPayments)
  }

  deletePayment(payment: PaymentView) {
    this.paymentService.delete(payment.id)
      .subscribe(
        _ => {
          this.updatePageData()
          this.notification.show('success', 'Успіх', `Платіж успішно видалено!`)
        },
        _ => {
          this.notification.show('error', 'Фіаско', `Не вдалося видалити платіж`)
      })
  }

  updatePageData() {
    this.getPaymentsBatchById(+this.paymentsBatch.id)
    this.getPaymentsPart(+this.paymentsBatch.id, this.pageNumber, this.pageSize, this.showProcessedPayments)
  }
}
