import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-datepicker-disable-before-today',
  templateUrl: './datepicker-disable-before-today.component.html',
  styleUrls: ['./datepicker-disable-before-today.component.css']
})
export class DatepickerDisableBeforeTodayComponent implements OnInit {
  @Input() dateFormat = 'dd.MM.yyyy'
  datesBeforeToday = (date: number): boolean => { return date < Date.now() }

  constructor() {}

  ngOnInit() {
    
  }
}
