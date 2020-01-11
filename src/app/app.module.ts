import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, uk_UA } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { AuthInterceptor } from './core/auth.interceptor';
import { BranchOfficeService } from './baranch-office/branch-office.service';

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
    FormsModule
  ],
  providers: [
    BranchOfficeService,
    { provide: NZ_I18N, useValue: uk_UA },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
