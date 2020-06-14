import { NgModule, LOCALE_ID } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IconsProviderModule } from './icons-provider.module'
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

import { BranchOfficeService } from './shared/services/branch-office.service'
import { AccountingPointService } from './shared/services/accounting-point.service'
import { DistributionSystemOperatorService } from './shared/services/distribution-system-operator.service'
import { AddressService } from './shared/services/address.service'
import { PersonService } from './shared/services/person.service'
import { PaymentChannelService } from './shared/services/payment-channel.service'
import { PaymentBatchService } from './shared/services/payment-batch.service'
import { PaymentService } from './shared/services/payment.service'

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
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AngularSvgIconModule,
    AccountingPointModule,
    TariffModule,
    PaymentsModule,
    PersonModule
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
    { provide: NZ_I18N, useValue: uk_UA },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
