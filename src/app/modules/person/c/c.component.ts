import { Component, OnInit } from '@angular/core'
import { Person } from 'src/app/shared/models/person.model'

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css']
})
export class CComponent implements OnInit {
  person: Person

  constructor() {}

  ngOnInit() {}
}
