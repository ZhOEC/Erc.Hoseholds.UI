import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddRecordpointRoutingModule } from './add-recordpoint-routing.module';
import { AddRecordpointComponent } from './add-recordpoint.component';

@NgModule({
  imports: [
    AddRecordpointRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule
  ],
  declarations: [AddRecordpointComponent],
  exports: [AddRecordpointComponent]
})
export class AddRecordpointModule {}