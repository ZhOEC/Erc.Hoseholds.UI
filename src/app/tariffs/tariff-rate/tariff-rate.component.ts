import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TariffRate } from '../shared/tariff-rate';
import { Tariff } from 'src/app/tariffs/shared/tariff';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TariffsService } from '../shared/tariffs.service';

@Component({
  selector: 'app-tariff-rate',
  templateUrl: './tariff-rate.component.html',
  styleUrls: ['./tariff-rate.component.scss']
})
export class TariffRateComponent implements OnInit {

  tariffRate: TariffRate;
  tariff: Tariff;
  tariffRateForm: FormGroup;
  isVisible: boolean = false;
  title: string;

  constructor(private fb: FormBuilder, private tariffsService: TariffsService) { }

  ngOnInit() {
    this.tariffRateForm = this.fb.group({
      id: [0],
      startDate: [null, [Validators.required]],
      value: [null, [Validators.required]],
      consumptionLimit: [null, []],
      heatingConsumptionLimit: [null, []],
      heatingStartDay: [{ value: null, disabled: true }, []],
      heatingEndDay: [{ value: null, disabled: true }, []]
    });

    this.tariffRateForm.get('heatingConsumptionLimit').valueChanges
      .subscribe(l => {
        if ((l || 0) == 0) {
          this.tariffRateForm.get('heatingStartDay').reset();
          this.tariffRateForm.get('heatingStartDay').disable();
          this.tariffRateForm.get('heatingEndDay').reset();
          this.tariffRateForm.get('heatingEndDay').disable();
        }
        else {
          this.tariffRateForm.get('heatingStartDay').enable();
          this.tariffRateForm.get('heatingEndDay').enable();
        }
      });

    this.tariffRateForm.valueChanges
      .subscribe(() => {
        this.tariffRateForm.markAsTouched();
      })
  }

  openAddDialog(tariff: Tariff) {
    this.tariffRateForm.reset();
    this.tariff = tariff;
    this.isVisible = true;
    this.title = "Нове значення тарифу для " + this.tariff.name;
    this.tariffRateForm.markAsUntouched();
  }

  openEditDialog(tariff: Tariff, tariffRate: TariffRate) {
    this.tariff = tariff;
    this.tariffRate = tariffRate;
    this.isVisible = true;
    this.title = "Редагування значення тарифу для " + tariff.name;
    this.tariffRateForm.patchValue(this.tariffRate);
    this.tariffRateForm.markAsUntouched();
  }

  onSubmit() {
    if (!this.tariffRateForm.value.id) {
      delete this.tariffRateForm.value.id;
      this.tariffsService.addTariffRate(this.tariff.id, this.tariffRateForm.value).subscribe(res => {
        this.tariff.rates.push(res);
        this.isVisible = false;
      });
    }
    else {
      this.tariffsService.updateTariffRate(this.tariff.id, this.tariffRateForm.value).subscribe(() => {
        const i = this.tariff.rates.findIndex(t => t.id == this.tariffRate.id);
        this.tariff.rates[i] = this.tariffRateForm.value;
        this.isVisible = false;
      });
    }
  }

}
