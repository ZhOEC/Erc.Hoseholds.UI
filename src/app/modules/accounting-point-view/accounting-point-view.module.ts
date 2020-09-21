import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component';
import { AccountingPointInvoicesComponent } from './accounting-point-invoices/accounting-point-invoices.component';
import { RouterModule } from '@angular/router'
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module';

@NgModule({
  declarations: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    ErcSharedModule
  ],
  exports: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ]
})
export class AccountingPointViewModule { }
