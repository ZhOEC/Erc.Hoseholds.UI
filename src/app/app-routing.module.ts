import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffListComponent } from './tariffs/tariff-list/tariff-list.component';
import { AccountingPointNewComponent } from './accounting-points/accounting-point-new/accounting-point-new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'accounting-point-new', component: AccountingPointNewComponent },
  { path: 'tariffs', component: TariffListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
