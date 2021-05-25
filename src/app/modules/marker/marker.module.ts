import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarkersListComponent } from './markers-list/markers-list.component'
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module'
import { MarkerModalComponent } from './marker-modal/marker-modal.component'

@NgModule({
  imports: [
    CommonModule,
    ErcSharedModule
  ],
  declarations: [
    MarkersListComponent,
    MarkerModalComponent
  ]
})
export class MarkerModule { }
