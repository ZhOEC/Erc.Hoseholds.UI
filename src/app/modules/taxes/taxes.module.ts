import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ErcSharedModule } from '../../shared/modules/erc-shared.module'
import { TaxInvoiceListComponent } from './tax-invoice-list/tax-invoice-list.component'
import { TaxInvoiceCreateComponent } from './tax-invoice-create/tax-invoice-create.component'

@NgModule({
  declarations: [
    TaxInvoiceListComponent,
    TaxInvoiceCreateComponent
  ],
  imports: [
    RouterModule,
    ErcSharedModule
  ]
})
export class TaxesModule { }
