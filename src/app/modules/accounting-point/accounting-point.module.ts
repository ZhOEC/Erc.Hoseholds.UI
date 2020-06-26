import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component'
import { AccountingPointsSearchComponent } from './accounting-point-search/accounting-points-search.component'
import { CloseExemptionComponent } from './close-exemption/close-exemption.component'
import { CustomersModule } from '../customers/customers.module'


@NgModule({
  declarations: [
    AccountingPointNewComponent, 
    AccountingPointsSearchComponent, 
    CloseExemptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzCheckboxModule,
    CustomersModule
  ],
  exports: [
    AccountingPointsSearchComponent
  ]
})
export class AccountingPointModule { }
