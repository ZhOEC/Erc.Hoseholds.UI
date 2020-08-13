import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datepicker-disable-after-today',
  templateUrl: './datepicker-disable-after-today.component.html',
  styleUrls: ['./datepicker-disable-after-today.component.css']
})

export class DatepickerDisableAfterTodayComponent implements OnInit {
  @Input() dateFormat = 'dd.MM.yyyy'
  datesAfterToday = (date: number): boolean => { return date > Date.now() }

  constructor() {}

  ngOnInit() {}
}
