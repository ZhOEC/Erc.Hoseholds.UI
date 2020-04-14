import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, uk_UA } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BranchOfficeService } from './shared/services/branch-office.service';
import { AccountingPointsService } from './shared/services/accounting-points.service';
import { AccountingPointModule } from './accounting-point/accounting-point.module';
import { TariffModule } from './tariffs/tariff.module';
import { DistributionSystemOperatorService } from './shared/services/distribution-system-operator.service';
import { AddressService } from './shared/services/address.service';
import { PersonService } from './shared/services/person.service';

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
    TariffModule
  ],
  providers: [
    DistributionSystemOperatorService,
    BranchOfficeService,
    AccountingPointsService,
    AddressService,
    PersonService,
    { provide: NZ_I18N, useValue: uk_UA },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
