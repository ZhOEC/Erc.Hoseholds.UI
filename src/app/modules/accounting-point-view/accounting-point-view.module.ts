import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component';
import { AccountingPointInvoicesComponent } from './accounting-point-invoices/accounting-point-invoices.component';
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ]
})
export class AccountingPointViewModule { }
