import { Component, OnInit, ViewChild } from '@angular/core'
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service'
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model'
import { PaymentBatchAddComponent } from '../payment-batch-add-modal/payment-batch-add-modal.component'
import { PaymentChannelService } from './../../../shared/services/payment-channel.service'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { PaymentChannel } from 'src/app/shared/models/payments/payment-channel.model'

@Component({
  selector: 'app-payment-batch-list',
  templateUrl: './payment-batch-list.component.html',
  styleUrls: ['./payment-batch-list.component.css']
})

export class PaymentBatchListComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  
  @ViewChild(PaymentBatchAddComponent)
  private paymentBatchAddComponent: PaymentBatchAddComponent

  totalCount: number
  pageNumber = 1
  pageSize = 10
  showClosedPaymentsBatch = false
  isLoading = false

  editCache: { [key: string]: { edit: boolean; data: PaymentBatchView} } = {}
  paymentsBatchList: PaymentBatchView[]
  paymentChannelsList: PaymentChannel[]

  constructor(private paymentBatchService: PaymentBatchService,
    private paymentChannelService: PaymentChannelService,
    private notification: NotificationComponent) {}

  ngOnInit() {
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentsBatch)
    this.getPaymentChannels()
  }

  getPaymentBatches(pageNumber: number, pageSize: number, showClosed: boolean) {
    this.isLoading = true
    this.paymentBatchService.getPart(pageNumber, pageSize, showClosed)
      .subscribe(response => {
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.paymentsBatchList = <PaymentBatchView[]>response.body
        this.paymentsBatchList.forEach(item => {
          this.editCache[item.id] = {
            edit: false,
            data: { ...item }
          }
        })
        this.isLoading = false
      })
  }

  getPaymentChannels() {
    this.paymentChannelService.getAll().subscribe(data => {
      this.paymentChannelsList = data
    })
  }

  onChangedTablePageIndex(pageIndex: number) {
    this.pageNumber = pageIndex
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentsBatch)
  }

  onChangedTablePageSize(pageSize: number) {
    this.pageSize = pageSize
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentsBatch)
  }

  onChangedShowClosedPaymentsBatch(showClosed: boolean) {
    this.showClosedPaymentsBatch = showClosed
    this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentsBatch)
  }

  openDialogAddPaymentsBatch() {
    this.paymentBatchAddComponent.openDialog()
  }

  onAddPaymentsBatchToList(paymentsBatch: PaymentBatchView) {
    this.paymentsBatchList = [...this.paymentsBatchList, paymentsBatch]
  }

  editBatch(id: number) {
    this.editCache[id].edit = true
  }

  updateBatch(paymentBatch: PaymentBatchView) {
    const indexPaymentBatch = this.paymentsBatchList.findIndex(item => item.id === paymentBatch.id)
    const indexPaymentChannel = this.paymentChannelsList.findIndex(item => item.id === this.editCache[paymentBatch.id].data.paymentChannelId)

    Object.assign(this.paymentsBatchList[indexPaymentBatch], this.editCache[paymentBatch.id].data)
    // Separately replace payment channel name in main list data
    this.paymentsBatchList[indexPaymentBatch].paymentChannelName = this.paymentChannelsList[indexPaymentChannel].name
    this.editCache[paymentBatch.id].edit = false

    this.paymentBatchService.update(paymentBatch)
      .subscribe(
        _ => {
          this.notification.show('success', 'Успіх', `Пачку платежів ${paymentBatch.name} успішно оновлено!`)
        },
        _ => {
          this.notification.show('error', 'Фіаско', `Не вдалося оновити пачку`)
      })
  }

  cancelEdit(id: number) {
    const index = this.paymentsBatchList.findIndex(item => item.id === id)
    this.editCache[id] = {
      data: { ...this.paymentsBatchList[index] },
      edit: false
    }
  }

  deleteBatch(id: number) {
    this.paymentBatchService.delete(id)
      .subscribe(
        _ => {
          this.getPaymentBatches(this.pageNumber, this.pageSize, this.showClosedPaymentsBatch)
          this.notification.show('success', 'Успіх', `Пачку успішно видалено!`)
        },
        _ => {
          this.notification.show('error', 'Фіаско', `Не вдалося видалити пачку`)
      })
  }
}
