import { Component, OnInit, Input } from '@angular/core';
import { TariffRate } from './tariff-rate';

@Component({
  selector: 'app-tariff-rate',
  templateUrl: './tariff-rate.component.html',
  styleUrls: ['./tariff-rate.component.scss']
})
export class TariffRateComponent implements OnInit {
  @Input() tariffRate: TariffRate;
  constructor() { }

  ngOnInit() {
  }

}
