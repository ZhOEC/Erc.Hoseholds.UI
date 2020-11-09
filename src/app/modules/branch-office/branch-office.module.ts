import { NgModule } from '@angular/core';
import { BranchOfficePeriodsComponent } from './branch-office-periods/branch-office-periods.component';
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module';

@NgModule({
  declarations: [BranchOfficePeriodsComponent],
  imports: [
    ErcSharedModule
  ]
})
export class BranchOfficeModule { }
