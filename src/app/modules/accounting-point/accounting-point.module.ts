import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzCardModule } from 'ng-zorro-antd/card'
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { AccountingPointNewComponent } from './accounting-point-new/accounting-point-new.component'
import { AccountingPointsSearchComponent } from './accounting-point-search/accounting-points-search.component'
import { CloseExemptionComponent } from './close-exemption/close-exemption.component'
import { PersonModule } from '../person/person.module'

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
    NzAutocompleteModule,
    NzIconModule,
    NzCardModule,
    PersonModule
  ],
  exports: [
    AccountingPointsSearchComponent
  ]
})
export class AccountingPointModule { }
