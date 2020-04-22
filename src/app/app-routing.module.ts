import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffListComponent } from './modules/tariffs/tariff-list/tariff-list.component';
import { AccountingPointNewComponent } from './modules/accounting-point/accounting-point-new/accounting-point-new.component';
import { AccountingPointDetailComponent } from './modules/accounting-point/accounting-point-detail/accounting-point-detail.component';
import { PaymentChannelListComponent } from './modules/payment-channel/payment-channel-list/payment-channel-list.component';

const routes: Routes = [
  { path: 'accounting-point-new', component: AccountingPointNewComponent },
  { path: 'accounting-point/:id', component: AccountingPointDetailComponent },
  { path: 'tariffs', component: TariffListComponent },
  { path: 'payment-channel', component: PaymentChannelListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
