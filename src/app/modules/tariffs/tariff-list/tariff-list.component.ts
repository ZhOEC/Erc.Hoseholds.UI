import { Component, OnInit, ViewChild } from '@angular/core';
import { TariffsService } from '../../../shared/services/tariffs.service';
import { Tariff } from '../../../shared/models/tariff';
import { TariffRateComponent } from 'src/app/modules/tariffs/tariff-rate/tariff-rate.component';
import { TariffRate } from '../../../shared/models/tariff-rate';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss']
})
export class TariffListComponent implements OnInit {

  @ViewChild(TariffRateComponent, {static: false})
  private tariffRateComponent: TariffRateComponent;

  tariffs: Tariff[];
  editRowId: number = -1;

  constructor(private tariffsSvc: TariffsService) {

  }

  ngOnInit() {
    this.tariffsSvc.getTariffList()
      .subscribe(data => { this.tariffs = data });
  }

  updateTariff(tariff: Tariff) {
    this.tariffsSvc.updateTariff(tariff).subscribe(data => {
      tariff = data;
      this.editRowId = -1;
    });
  }

  addTariff(tariff: Tariff) {
    this.tariffsSvc.addTariff(tariff).subscribe(data => {
      tariff = data;
    });
  }

  addNewRate(tariff: Tariff) {
    this.tariffRateComponent.openAddDialog(tariff);
  }

  editRate(tariffRate: TariffRate) {
    const tariff = this.tariffs.find(t => t.id == tariffRate.tariffId);
    this.tariffRateComponent.openEditDialog(tariff, tariffRate);
  }
  
  deleteRate(tariffId: number, rateId: number) {
    this.tariffsSvc.deleteTariffRate(tariffId, rateId).subscribe(() => {
      const tariff = this.tariffs.find(t => t.id == tariffId);
      tariff.rates = tariff.rates.filter(r => r.id !== rateId);
    });
  }
}
