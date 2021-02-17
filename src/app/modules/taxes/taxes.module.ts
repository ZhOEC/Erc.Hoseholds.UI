import { NgModule } from '@angular/core'
import { ErcSharedModule } from '../../shared/modules/erc-shared.module'
import { TaxInvoiceListComponent } from './tax-invoice-list/tax-invoice-list.component'

@NgModule({
  declarations: [
    TaxInvoiceListComponent
  ],
  imports: [
    ErcSharedModule
  ]
})
export class TaxesModule { }
