import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PaymentChannelListComponent } from './payment-channel-list/payment-channel-list.component'
import { PaymentChannelModalComponent } from './payment-channel-modal/payment-channel-modal.component'
import { PaymentBatchAddComponent } from './payment-batch-add/payment-batch-add.component'

@NgModule({
  declarations: [
    PaymentChannelListComponent,
    PaymentChannelModalComponent,
    PaymentBatchAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzTableModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzUploadModule
  ],
  exports: [
    PaymentChannelListComponent,
    PaymentChannelModalComponent,
    PaymentBatchAddComponent
  ]
})
export class PaymentsModule { }
