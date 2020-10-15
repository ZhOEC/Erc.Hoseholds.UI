import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commodity } from '../models/commodity';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: unknown, commodity:Commodity): unknown {
    return `${value} ${commodity == Commodity.ElectricPower ? 'кВт⋅год': 'м³'}`;
  }

}
