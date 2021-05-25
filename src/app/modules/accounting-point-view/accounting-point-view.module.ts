import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component';
import { AccountingPointInvoicesComponent } from './accounting-point-invoices/accounting-point-invoices.component';
import { RouterModule } from '@angular/router'
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module';
import { AccountingPointPaymentsComponent } from './accounting-point-payments/accounting-point-payments.component';
import { AccountingPointMarkersComponent } from './accounting-point-markers/accounting-point-markers.component'
import { AccountingPointMarkerAdd } from './accounting-point-marker-add/accounting-point-marker-add.component'

@NgModule({
  declarations: [
    AccountingPointDetailComponent, 
    AccountingPointInvoicesComponent, 
    AccountingPointPaymentsComponent,
    AccountingPointMarkersComponent,
    AccountingPointMarkerAdd
  ],
  imports: [
    CommonModule,
    RouterModule,
    ErcSharedModule
  ],
  exports: [
    AccountingPointDetailComponent, AccountingPointInvoicesComponent
  ]
})
export class AccountingPointViewModule { }
