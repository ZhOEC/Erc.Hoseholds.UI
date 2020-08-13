import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ExemptionCategyListComponent } from './exemption-categy-list/exemption-categy-list.component';

@NgModule({
  declarations: [
    ExemptionCategyListComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule
  ],
  exports: [
    
    ExemptionCategyListComponent
  ]
})
export class CommonReferencesModule { }
