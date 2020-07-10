import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PersonFormComponent } from './form/form.component'
import { PersonEditComponent } from './edit/edit.component'

import { PersonSearchComponent } from './search/search.component'
import { CComponent } from './c/c.component'

@NgModule({
  declarations: [
    PersonFormComponent,
    PersonEditComponent,

    PersonSearchComponent,
    CComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzCardModule,
    NzDividerModule,
    NzGridModule,
    NzAutocompleteModule,
    NzIconModule,
  ],
  exports: [
    PersonFormComponent,
    PersonSearchComponent
  ]
})
export class PersonModule {}
