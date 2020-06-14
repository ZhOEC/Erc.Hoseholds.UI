import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component';
import { AccountingPointInvoicesComponent } from './accounting-point-invoices/accounting-point-invoices.component';

@NgModule({
  declarations: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ]
})
export class AccountingPointViewModule { }
