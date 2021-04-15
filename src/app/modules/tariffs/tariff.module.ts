import { ErcSharedModule } from './../../shared/modules/erc-shared.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { TariffListComponent } from './tariff-list/tariff-list.component';
import { TariffRateComponent } from './tariff-rate/tariff-rate.component';

@NgModule({
  declarations: [
    TariffListComponent,
    TariffRateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErcSharedModule
  ],
  exports: [
    TariffListComponent,
    TariffRateComponent
  ]
})
export class TariffModule { }
