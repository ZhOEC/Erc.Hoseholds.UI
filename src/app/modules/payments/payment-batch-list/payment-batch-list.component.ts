import { Component, OnInit, ViewChild } from '@angular/core'
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service'
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model'
import { PaymentBatchAddComponent } from '../payment-batch-add-modal/payment-batch-add-modal.component'

@Component({
  selector: 'app-payment-batch-list',
  templateUrl: './payment-batch-list.component.html',
  styleUrls: ['./payment-batch-list.component.css']
})
export class PaymentBatchListComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
  
  @ViewChild(PaymentBatchAddComponent) 
  private PaymentBatchAddComponent: PaymentBatchAddComponent

  totalCount: number
  pageNumber = 1
  pageSize = 10
  showClosedPaymentBatch = false
  paymentsBatchList: PaymentBatchView[]
  isLoading = false

  constructor(private paymentBatchService: PaymentBatchService) { }

  ngOnInit() {
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentBatch)
  }

  getPaymentBatches(pageNumber: number, pageSize: number, showClosed: boolean) {
    this.isLoading = true
    this.paymentBatchService.getPart(pageNumber, pageSize, showClosed)
      .subscribe(response => {
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.paymentsBatchList = <PaymentBatchView[]>response.body
        this.isLoading = false
      })
  }

  onChangedTablePageIndex(pageIndex: number) {
    this.pageNumber = pageIndex
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentBatch)
  }

  onChangedTablePageSize(pageSize: number) {
    this.pageSize = pageSize
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentBatch)
  }

  onChangedShowClosedPaymentsBatch(showClosed: boolean) {
    this.showClosedPaymentBatch = showClosed
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentBatch)  
  }

  openDialogAddPaymentsBatch() {
    this.PaymentBatchAddComponent.openDialog();
  }

  onAddPaymentsBatchToList(paymentsBatch: PaymentBatchView) {
    if (this.pageNumber === 1)
        this.paymentsBatchList.unshift(paymentsBatch)
  }

  edit(id: number) {
  }

  delete(id: number) {
    this.paymentBatchService.delete(id)
      .subscribe(res => {
        this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentBatch)
      })
  }
}
