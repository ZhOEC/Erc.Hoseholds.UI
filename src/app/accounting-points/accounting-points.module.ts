import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingPointsSearchComponent } from './accounting-points-search/accounting-points-search.component';
import { NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccountingPointsSearchComponent],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule
  ],
  exports: [AccountingPointsSearchComponent]
})
export class AccountingPointsModule { }
