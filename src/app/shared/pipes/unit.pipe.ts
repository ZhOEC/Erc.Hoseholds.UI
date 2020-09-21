import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} ${environment.units}`;
  }

}
