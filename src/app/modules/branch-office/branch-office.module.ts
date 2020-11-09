import { NgModule } from '@angular/core';
import { BranchOfficePeriodsComponent } from './branch-office-periods/branch-office-periods.component';
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module';
import { BranchOfficeEditComponent } from './branch-office-edit/branch-office-edit.component';

@NgModule({
  declarations: [
    BranchOfficePeriodsComponent,
    BranchOfficeEditComponent
  ],
  imports: [
    ErcSharedModule
  ]
})
export class BranchOfficeModule { }
