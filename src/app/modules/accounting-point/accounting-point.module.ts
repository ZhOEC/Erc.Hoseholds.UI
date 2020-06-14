import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component'
import { AccountingPointsSearchComponent } from './accounting-point-search/accounting-points-search.component'
import { AccountingPointDetailComponent } from './accounting-point-detail/accounting-point-detail.component'
import { PersonModule } from '../person/person.module'

@NgModule({
  declarations: [
    AccountingPointNewComponent, 
    AccountingPointsSearchComponent, 
    AccountingPointDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PersonModule
  ],
  exports: [
    AccountingPointsSearchComponent
  ]
})
export class AccountingPointModule { }
