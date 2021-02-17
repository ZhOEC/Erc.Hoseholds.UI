import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { SharedModule } from '../components/shared.module'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzCardModule } from 'ng-zorro-antd/card'
import { UnitPipe } from '../pipes/unit.pipe'
import { NzFormModule } from 'ng-zorro-antd/form'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    NzTableModule,
    NzSelectModule,
    NzUploadModule,
    NzGridModule,
    AngularSvgIconModule,
    NzSpaceModule,
    NzInputModule,
    NzCardModule,
    NzFormModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    SharedModule,
    NzPageHeaderModule, 
    CommonModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzSelectModule,
    NzUploadModule,
    NzGridModule,
    AngularSvgIconModule,
    UnitPipe,
    NzSpaceModule,
    NzInputModule,
    NzCardModule,
    NzFormModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ErcSharedModule { }
