import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddRecordpointRoutingModule } from './add-recordpoint-routing.module';
import { AddRecordpointComponent } from './add-recordpoint.component';

@NgModule({
  imports: [
    AddRecordpointRoutingModule, 
    FormsModule,
    CommonModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule
  ],
  declarations: [AddRecordpointComponent],
  exports: [AddRecordpointComponent]
})
export class AddRecordpointModule {}