import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component';
import { AccountingPointsSearchComponent } from './accounting-points-search/accounting-points-search.component';
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AccountingPointNewComponent, 
    AccountingPointsSearchComponent, AccountingPointDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [AccountingPointNewComponent, AccountingPointsSearchComponent]
})
export class AccountingPointsModule { }
