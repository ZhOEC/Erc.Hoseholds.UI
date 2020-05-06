import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service';
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model';
import { PaymentBatchAddComponent } from '../payment-batch-add-modal/payment-batch-add-modal.component';

@Component({
  selector: 'app-payment-batch-list',
  templateUrl: './payment-batch-list.component.html',
  styleUrls: ['./payment-batch-list.component.css']
})
export class PaymentBatchListComponent implements OnInit {
  
  @ViewChild(PaymentBatchAddComponent) 
  private PaymentBatchAddComponent: PaymentBatchAddComponent

  paymentBatchesList: PaymentBatchView[]

  constructor(private paymentBatchService: PaymentBatchService) { }

  ngOnInit() {
    this.getPaymentBatches()
  }

  getPaymentBatches() {
    this.paymentBatchService.getAll().subscribe(data => {
      this.paymentBatchesList = data
    })
  }

  addPaymentBatch() {
    this.PaymentBatchAddComponent.openDialog();
  }
}
