import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecordpointComponent } from './add-recordpoint.component';

const routes: Routes = [
  { path: '', component: AddRecordpointComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecordpointRoutingModule { }
