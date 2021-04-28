import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'trueRound'
})
export class TrueRoundPipe implements PipeTransform {

  transform(value: number, precision?: number): number {
    let factor = Math.pow(10, precision || 0)
    return Math.round(+(value * factor).toFixed(2)) / factor
  }
}
