import { CompanyEditComponent } from './modules/company/company-edit/company-edit.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TariffListComponent } from './modules/tariffs/tariff-list/tariff-list.component'
import { AccountingPointNewComponent } from './modules/accounting-point/accounting-point-new/accounting-point-new.component'
import { AccountingPointDetailComponent } from './modules/accounting-point-view/accounting-point-detail/accounting-point-detail.component'
import { PaymentChannelListComponent } from './modules/payments/payment-channel-list/payment-channel-list.component'
import { PaymentBatchListComponent } from './modules/payments/payment-batch-list/payment-batch-list.component'
import { PaymentBatchDetailComponent } from './modules/payments/payment-batch-detail/payment-batch-detail.component'
import { ExemptionCategyListComponent } from './modules/common-references/exemption-categy-list/exemption-categy-list.component'
import { PersonEditComponent } from './modules/person/person-edit/person-edit.component'
import { ContractNewComponent } from './modules/contract/contract-new/contract-new.component'
import { AccountingPointEditComponent } from './modules/accounting-point/accounting-point-edit/accounting-point-edit.component'
import { OpenExemptionComponent } from './modules/accounting-point/open-exemption/open-exemption.component'
import { BranchOfficePeriodsComponent } from './modules/branch-office/branch-office-periods/branch-office-periods.component'
import { ConsumptionLoaderFormComponent } from './modules/common-references/consumption-loader-form/consumption-loader-form.component'

const routes: Routes = [
  { path: 'accounting-point/new', component: AccountingPointNewComponent, },
  { path: 'accounting-point/:id/edit', component: AccountingPointEditComponent },
  { path: 'accounting-point/:id/open-new-contract', component: ContractNewComponent },
  { path: 'accounting-point/:id/open-exemption', component: OpenExemptionComponent },
  { path: 'accounting-points/:id', component: AccountingPointDetailComponent },
  { path: 'tariffs', component: TariffListComponent },
  { path: 'exemption-categories', component: ExemptionCategyListComponent },
  { path: 'payment-channels', component: PaymentChannelListComponent },
  { path: 'payment-batches', component: PaymentBatchListComponent },
  { path: 'payment-batch/:id', component: PaymentBatchDetailComponent },
  { path: 'person/:id/edit', component: PersonEditComponent },
  { path: 'branch-office-periods', component: BranchOfficePeriodsComponent },
  { path: 'consumption-loader', component: ConsumptionLoaderFormComponent },
  { path: 'company/:id/edit', component: CompanyEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
