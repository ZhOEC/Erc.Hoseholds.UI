import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  @Input() visibility = true

  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  datesLessToday = (date: number): boolean => { return date < Date.now() }
  
  personForm: FormGroup
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      id: [null],
      taxCode: [null],
      idCardNumber: [null, [Validators.required]],
      idCardIssuer: [null, [Validators.required]],
      idCardIssuanceDate: [null, [Validators.required]],
      idCardExpDate: [ null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      patronymic: [null, [Validators.required]],
      mobilePhones: [null],
      email: [null, [Validators.email]]
    })
  }

  validateForm() {
    for (const p in this.personForm['controls']) {
      this.personForm.get(p).markAsDirty()
      this.personForm.get(p).updateValueAndValidity()
    }
  }

  resetForm() {
    this.personForm.reset()
  }
}
