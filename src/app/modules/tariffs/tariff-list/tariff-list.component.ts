import { Component, OnInit, ViewChild } from '@angular/core';
import { TariffService } from '../../../shared/services/tariff.service';
import { Tariff } from '../../../shared/models/tariff';
import { TariffRateComponent } from 'src/app/modules/tariffs/tariff-rate/tariff-rate.component';
import { TariffRate } from '../../../shared/models/tariff-rate';
import { Commodity, commodityMap } from 'src/app/shared/models/commodity';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss']
})
export class TariffListComponent implements OnInit {

  @ViewChild(TariffRateComponent, { static: false })
  private tariffRateComponent: TariffRateComponent;

  tariffs: Tariff[];
  editRowId: number = -1;

  constructor(private tariffsSvc: TariffService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(p => {
      let commodity = +p.get('commodity')
      if (commodity == 0) commodity = 1
      return this.tariffsSvc.getTariffList(commodity)
    }))
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

  editRate(tariffId:number, tariffRate: TariffRate) {
    const tariff = this.tariffs.find(t => t.id == tariffId);
    this.tariffRateComponent.openEditDialog(tariff, tariffRate);
  }

  deleteRate(tariffId: number, rateId: number) {
    this.tariffsSvc.deleteTariffRate(tariffId, rateId).subscribe(() => {
      const tariff = this.tariffs.find(t => t.id == tariffId);
      tariff.rates = tariff.rates.filter(r => r.id != rateId);
    });
  }
}
