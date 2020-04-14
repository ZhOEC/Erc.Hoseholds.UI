import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffListComponent } from './tariffs/tariff-list/tariff-list.component';
import { AccountingPointNewComponent } from './accounting-point/accounting-point-new/accounting-point-new.component';
import { AccountingPointDetailComponent } from './accounting-point/accounting-point-detail/accounting-point-detail.component';

const routes: Routes = [
  { path: 'accounting-point-new', component: AccountingPointNewComponent },
  { path: 'accounting-point/:id', component: AccountingPointDetailComponent },
  { path: 'tariffs', component: TariffListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
