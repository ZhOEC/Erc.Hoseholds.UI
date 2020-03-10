import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component';
import { AccountingPointsSearchComponent } from './accounting-points-search/accounting-points-search.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [AccountingPointNewComponent, AccountingPointsSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule
  ],
  exports: [AccountingPointNewComponent, AccountingPointsSearchComponent]
})
export class AccountingPointsModule { }
