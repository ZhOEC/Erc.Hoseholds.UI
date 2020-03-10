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
import { AuthInterceptor } from './core/auth.interceptor';
import { BranchOfficeService } from './baranch-office/branch-office.service';
import { AccountingPointsService } from './accounting-points/shared/accounting-points.service';
import { TariffListComponent } from './tariffs/tariff-list/tariff-list.component';
import { TariffRateComponent } from './tariffs/tariff-rate/tariff-rate.component';
import { AccountingPointsModule } from './accounting-points/accounting-points.module';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
    TariffListComponent,
    TariffRateComponent
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
    AccountingPointsModule
  ],
  providers: [
    BranchOfficeService,
    AccountingPointsService,
    { provide: NZ_I18N, useValue: uk_UA },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
