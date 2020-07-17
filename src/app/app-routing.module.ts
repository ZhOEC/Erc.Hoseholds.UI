import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TariffListComponent } from './modules/tariffs/tariff-list/tariff-list.component'
import { AccountingPointNewComponent } from './modules/accounting-point/new/new.component'
import { AccountingPointDetailComponent } from './modules/accounting-point-view/accounting-point-detail/accounting-point-detail.component'
import { PaymentChannelListComponent } from './modules/payments/payment-channel-list/payment-channel-list.component'
import { PaymentBatchListComponent } from './modules/payments/payment-batch-list/payment-batch-list.component'
import { PaymentBatchDetailComponent } from './modules/payments/payment-batch-detail/payment-batch-detail.component'
import { ExemptionCategyListComponent } from './modules/common-references/exemption-categy-list/exemption-categy-list.component'
import { PersonEditComponent } from './modules/person/edit/edit.component'
import { ContractNewComponent } from './modules/contract/new/new.component'
import { AccountingPointEditComponent } from './modules/accounting-point/edit/edit.component'

const routes: Routes = [
  { path: 'accounting-point/new', component: AccountingPointNewComponent, },
  { path: 'accounting-point/:id/edit', component: AccountingPointEditComponent },
  { path: 'accounting-point/:id/open-new-contract', component: ContractNewComponent },
  { path: 'accounting-points/:id', component: AccountingPointDetailComponent },
  { path: 'tariffs', component: TariffListComponent },
  { path: 'exemption-categories', component: ExemptionCategyListComponent },
  { path: 'payment-channels', component: PaymentChannelListComponent },
  { path: 'payment-batches', component: PaymentBatchListComponent },
  { path: 'payment-batch/:id', component: PaymentBatchDetailComponent },
  { path: 'person/:id/edit', component: PersonEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
