import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzPageHeaderModule
  ],
  exports: [
    NzPageHeaderModule, 
    CommonModule
  ]
})
export class ErcSharedModule { }
