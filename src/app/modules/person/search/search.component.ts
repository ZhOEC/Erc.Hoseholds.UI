import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Person } from 'src/app/shared/models/person.model'
import { PersonService } from 'src/app/shared/services/person.service'

@Component({
  selector: 'app-person-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class PersonSearchComponent implements OnInit {
  private _person: Person
  @Input()
    set model(value: Person) {
      this._person = value
      this.modelChange.emit(value)
    }
    get model() {
      return this._person
    }
  @Output() modelChange = new EventEmitter()

  isLoadingSearch = false
  foundPersons: Person[]

  constructor(private personService: PersonService) { }

  ngOnInit() {}

  onSearchPerson(searchString: string) {
    if (searchString?.length > 2) {
      this.isLoadingSearch = true
      this.personService.searchPerson(searchString).subscribe(
        p => {
          this.foundPersons = p
          this.isLoadingSearch = false
        })
    }
  }
}
