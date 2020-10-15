import { NgModule, LOCALE_ID } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//import { IconsProviderModule } from './icons-provider.module'
import { NgZorroAntdModule, NZ_I18N, uk_UA } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { registerLocaleData } from '@angular/common'
import { AuthInterceptor } from './core/interceptors/auth.interceptor'
import uk from '@angular/common/locales/uk'

import { AppRoutingModule } from './app-routing.module'
import { AccountingPointModule } from './modules/accounting-point/accounting-point.module'
import { TariffModule } from './modules/tariffs/tariff.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { PersonModule } from './modules/person/person.module'
import { AccountingPointViewModule } from './modules/accounting-point-view/accounting-point-view.module'
import { CommonReferencesModule } from './modules/common-references/common-references.module'
import { ContractModule } from './modules/contract/contract.module'
import { BranchOfficeService } from './shared/services/branch-office.service'
import { AccountingPointService } from './shared/services/accounting-point.service'
import { DistributionSystemOperatorService } from './shared/services/distribution-system-operator.service'
import { AddressService } from './shared/services/address.service'
import { PersonService } from './shared/services/person.service'
import { PaymentChannelService } from './shared/services/payment-channel.service'
import { PaymentBatchService } from './shared/services/payment-batch.service'
import { PaymentService } from './shared/services/payment.service'
import { UsageCategoryService } from './shared/services/usage-category.service'
import { BuildingTypeService } from './shared/services/building-type.service'
import { BranchOfficeModule } from './modules/branch-office/branch-office.module';
import { UnitPipe } from './shared/pipes/unit.pipe'
import { ConsumptionService } from './shared/services/consumption.service'

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    BranchOfficeModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule,
    AccountingPointModule,
    TariffModule,
    PaymentsModule,
    AccountingPointViewModule,
    CommonReferencesModule,
    PersonModule,
    ContractModule
  ],
  providers: [
    DistributionSystemOperatorService,
    BranchOfficeService,
    AccountingPointService,
    AddressService,
    PersonService,
    PaymentChannelService,
    PaymentBatchService,
    PaymentService,
    BuildingTypeService,
    UsageCategoryService,
    ConsumptionService,
    { provide: NZ_I18N, useValue: uk_UA },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
