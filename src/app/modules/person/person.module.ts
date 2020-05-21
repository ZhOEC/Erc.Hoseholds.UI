import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PersonAddComponent } from './person-add/person-add.component'

@NgModule({
  declarations: [
    PersonAddComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PersonAddComponent
  ]
})
export class PersonModule { }
