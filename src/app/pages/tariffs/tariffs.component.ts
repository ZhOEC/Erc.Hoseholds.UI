import { Component, OnInit } from '@angular/core';
import { TariffsService } from './tariffs.service';
import { Tariff } from './tariff';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent implements OnInit {
  tariffs: Tariff[];
  editRowId: number = -1;

  constructor(private tariffsSvc: TariffsService) {

  }

  updateTariff(tariff: Tariff) {
    this.tariffsSvc.updateTariff(tariff).subscribe(data => {
      tariff = data;
      this.editRowId = -1;
    });
  }

  ngOnInit() {
    this.tariffsSvc.getTariffs()
      .subscribe(data => { this.tariffs = data });
  }

}
