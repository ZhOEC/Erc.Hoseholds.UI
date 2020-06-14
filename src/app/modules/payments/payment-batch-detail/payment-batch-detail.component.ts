import { PaymentModalComponent } from './../payment-modal/payment-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core'
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model'
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { PaymentService } from 'src/app/shared/services/payment.service'
import { Payment } from 'src/app/shared/models/payments/payment.model'

@Component({
  selector: 'app-payment-batch-detail',
  templateUrl: './payment-batch-detail.component.html',
  styleUrls: ['./payment-batch-detail.component.css']
})
export class PaymentBatchDetailComponent implements OnInit {
  @ViewChild(PaymentModalComponent)
  private paymentModalComponent: PaymentModalComponent

  paymentsBatch: PaymentBatchView
  paymentList: Payment[]

  dateFormat = 'hh:mm:ss dd.MM.yyyy'
  paymentsBatchId: string = null
  totalCount = 0
  pageNumber = 1
  pageSize = 10
  showProcessedPayments = false
  isLoading = true

  showPaymentModal = false

  constructor(private route: ActivatedRoute,
    private paymentBatchService: PaymentBatchService,
    private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.paymentsBatchId = params.get('id')
    )).subscribe(() => {
      this.getPaymentsBatchById(this.paymentsBatchId)
      this.getPaymentsPart(+this.paymentsBatchId, this.pageNumber, this.pageSize, this.showProcessedPayments)
    })
  }

  getPaymentsBatchById(paymentsBatchId: string) {
    this.paymentBatchService.getOne(+paymentsBatchId)
      .subscribe(paymentsBatch =>
        this.paymentsBatch = paymentsBatch
    )
  }

  getPaymentsPart(paymentsBatchId: number, pageNumber: number, pageSize: number, showProcessed: boolean) {
    this.isLoading = true
    this.paymentService.getPart(paymentsBatchId, pageNumber, pageSize, showProcessed)
      .subscribe(response => {
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.paymentList = <Payment[]>response.body
        this.isLoading = false
      })
  }

  onChangedShowProcessedPayments(showProcessed: boolean) {
    this.showProcessedPayments = showProcessed
    this.getPaymentsPart(+this.paymentsBatchId, this.pageNumber, this.pageSize, this.showProcessedPayments)  
  }

  openPaymentDialog() {
    this.paymentModalComponent.openDialog()
  }
}
