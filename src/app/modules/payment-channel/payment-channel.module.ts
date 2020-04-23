import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentChannelListComponent } from './payment-channel-list/payment-channel-list.component';
import { PaymentChannelModalComponent } from './payment-channel-modal/payment-channel-modal.component'

@NgModule({
  declarations: [
    PaymentChannelListComponent,
    PaymentChannelModalComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NzTableModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaymentChannelListComponent,
    PaymentChannelModalComponent
  ]
})
export class PaymentChannelModule { }
