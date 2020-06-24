import { Component, OnInit, ViewChild } from '@angular/core'
import { PaymentChannelService } from 'src/app/shared/services/payment-channel.service'
import { PaymentChannel } from 'src/app/shared/models/payments/payment-channel.model'
import { PaymentChannelModalComponent } from '../payment-channel-modal/payment-channel-modal.component'

@Component({
  selector: 'app-payment-channel-list',
  templateUrl: './payment-channel-list.component.html',
  styleUrls: ['./payment-channel-list.component.css']
})

export class PaymentChannelListComponent implements OnInit {

  @ViewChild(PaymentChannelModalComponent) 
  private paymentChannelModal: PaymentChannelModalComponent

  paymentChannels: PaymentChannel[]
  
  constructor(private paymentChannelService: PaymentChannelService) {}

  ngOnInit() {
    this.getList()
  }

  getList() {
    this.paymentChannelService.getAll().subscribe(data => {
      this.paymentChannels = data
    });
  }

  addNew(paymentChannels: PaymentChannel[]) {
    this.paymentChannelModal.openAddDialog(paymentChannels)
  }

  edit(paymentChannels: PaymentChannel[], paymentChannel: PaymentChannel) {
    this.paymentChannelModal.openEditDialog(paymentChannels, paymentChannel)
  }

  delete(id: number) {
    this.paymentChannelService.delete(id).subscribe(() => {
      this.paymentChannels = this.paymentChannels.filter(item => item.id !== id)
    })
  }
}