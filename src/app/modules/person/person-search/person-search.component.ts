import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Person } from 'src/app/shared/models/person.model'
import { PersonService } from 'src/app/shared/services/person.service'

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {
  private _person: Person
  @Input()
    set person(value: Person) {
      this._person = value
      this.foundPersonChanged.emit(value)
    }
    get person() {
      return this._person
    }
  @Output() foundPersonChanged = new EventEmitter()

  isLoadingSearch = false
  foundPersons: Person[]

  constructor(private personService: PersonService) {}

  ngOnInit() {}

  clearPerson() {
    this.person = null
  }

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
