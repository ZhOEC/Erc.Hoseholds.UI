import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from '../components/shared.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UnitPipe } from '../pipes/unit.pipe';

@NgModule({
  declarations: [
    UnitPipe
  ],
  imports: [
    SharedModule,
    CommonModule,
    NzPageHeaderModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzGridModule
  ],
  exports: [
    SharedModule,
    NzPageHeaderModule, 
    CommonModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzGridModule,
    UnitPipe
  ]
})
export class ErcSharedModule { }
