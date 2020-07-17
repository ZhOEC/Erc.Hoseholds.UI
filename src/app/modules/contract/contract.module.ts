import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContractNewComponent } from './new/new.component'
import { PersonModule } from '../person/person.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzDescriptionsModule,
    NzDatePickerModule,
    NzCheckboxModule,
    PersonModule
  ],
  declarations: [
    ContractNewComponent
  ]
})
export class ContractModule { }
