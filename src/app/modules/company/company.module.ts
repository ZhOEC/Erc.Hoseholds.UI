import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CompanyEditComponent } from './company-edit/company-edit.component'

@NgModule({
  imports: [
    CommonModule,
    ErcSharedModule
  ],
  declarations: [CompanyEditComponent]
})
export class CompanyModule {}
