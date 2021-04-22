import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal'
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
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'

@NgModule({
  declarations: [
    UnitPipe
  ],
  imports: [
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
    ReactiveFormsModule,
    NzRadioModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDropDownModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzDrawerModule,
    NzAvatarModule,
    NzLayoutModule,
    NzPopoverModule,
    NzNotificationModule,
    NzPopconfirmModule
  ],
  exports: [
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
    ReactiveFormsModule,
    NzRadioModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDropDownModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzDrawerModule,
    NzAvatarModule,
    NzLayoutModule,
    NzPopoverModule,
    NzNotificationModule,
    NzPopconfirmModule
  ]
})
export class ErcSharedModule { }
