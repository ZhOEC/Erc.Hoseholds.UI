import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PersonService } from 'src/app/shared/services/person.service'
import { Person } from 'src/app/shared/models/person.model'

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})

export class PersonAddComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  datesLessToday = (date: number): boolean => { return date < Date.now() }
  
  personForm: FormGroup
  isPersonInputsShown = false
  isLoadingSearch = false
  findPersons: Person[]
  
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
  ) {}

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      searchPerson: [null, [Validators.required]],
      id: [0],
      taxCode: [{value: null, disabled: true}, [Validators.required]],
      idCardNumber: [null, [Validators.required]],
      idCardIssuer: [null, [Validators.required]],
      idCardIssuanceDate: [null, [Validators.required]],
      idCardExpirationDate: [ null, [Validators.required]],
      firstName: [{value: null, disabled: true}, [Validators.required]],
      lastName: [{value: null, disabled: true}, [Validators.required]],
      patronymic: [{value: null, disabled: true}, [Validators.required]],
      mobilePhones: [ null, [Validators.required]]
    })
  }

  searchPerson(searchString: string): void {
    if(searchString.length > 6) {
      this.isLoadingSearch = true
      this.personService.searchPerson(searchString).subscribe((persons: Array<Person>) => {
        this.findPersons = persons
        this.isLoadingSearch = false
      })
    }
  }

  setDataPerson(selectedPerson: Person) {
    this.isPersonInputsShown = true

    if(selectedPerson != null) {
      this.personForm.patchValue(selectedPerson)

      this.personForm.get('taxCode').disable()
      this.personForm.get('firstName').disable()
      this.personForm.get('lastName').disable()
      this.personForm.get('patronymic').disable()
    }
  }

  personInputsTrigger() {
    this.isPersonInputsShown = true

    this.personForm.get('taxCode').enable()
    this.personForm.get('firstName').enable()
    this.personForm.get('lastName').enable()
    this.personForm.get('patronymic').enable()

    this.resetForm()
  }

  validateForm() {
    if(this.isPersonInputsShown) {
      this.personForm.get('searchPerson').setErrors(null)
      this.personForm.get('searchPerson').clearValidators()

      for (const p in this.personForm['controls']) {
        this.personForm.get(p).markAsDirty()
        this.personForm.get(p).updateValueAndValidity()
      }
    } else {
      this.personForm.get('searchPerson').markAsDirty()
      this.personForm.get('searchPerson').updateValueAndValidity()
    }
  }

  resetForm() {
    this.isPersonInputsShown = false

    this.personForm.reset({ id: 0 })
  }
}
