import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExportConsumptionSocialServicesComponent } from './export-consumption-social-services/export-consumption-social-services.component'
import { ErcSharedModule } from 'src/app/shared/modules/erc-shared.module'

@NgModule({
  imports: [
    CommonModule,
    ErcSharedModule
  ],
  declarations: [ExportConsumptionSocialServicesComponent]
})
export class InformationExchangeModule { }
