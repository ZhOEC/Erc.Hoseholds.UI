import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component';
import { AccountingPointsSearchComponent } from './accounting-point-search/accounting-points-search.component';
import { CloseExemptionComponent } from './close-exemption/close-exemption.component';

@NgModule({
  declarations: [
    AccountingPointNewComponent, 
    AccountingPointsSearchComponent, CloseExemptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    AccountingPointNewComponent, 
    AccountingPointsSearchComponent
  ]
})
export class AccountingPointModule { }
