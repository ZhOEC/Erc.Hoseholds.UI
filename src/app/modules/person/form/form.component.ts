import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-person-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class PersonFormComponent implements OnInit {
  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  datesLessToday = (date: number): boolean => { return date < Date.now() }
  
  personForm: FormGroup
  
  constructor(
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      id: [null],
      taxCode: [null],
      idCardNumber: [null, [Validators.required]],
      idCardIssuer: [null, [Validators.required]],
      idCardIssuanceDate: [null, [Validators.required]],
      idCardExpDate: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      patronymic: [null, [Validators.required]],
      mobilePhones: [null],
      email: [null]
    })

    this.personForm.get('id').valueChanges.subscribe(
      id => {
        if(id) {
          this.personForm.get('taxCode').disable()
          this.personForm.get('firstName').disable()
          this.personForm.get('lastName').disable()
          this.personForm.get('patronymic').disable()
        } else {
          this.personForm.get('taxCode').enable()
          this.personForm.get('firstName').enable()
          this.personForm.get('lastName').enable()
          this.personForm.get('patronymic').enable()
        }
      }
    )

    this.personForm.get('idCardNumber').valueChanges.subscribe(
      number => {
        if(number?.length > 8) {
            this.personForm.get('idCardExpDate').setValidators(Validators.required)
            this.personForm.get('idCardExpDate').markAsDirty()
          } else {
            this.personForm.get('idCardExpDate').clearValidators()
            this.personForm.get('idCardExpDate').updateValueAndValidity()
        }
      }
    )
  }

  validateForm() {
    for (const p in this.personForm['controls']) {
      this.personForm.controls[p].markAsDirty();
      this.personForm.controls[p].updateValueAndValidity();
    }
  }

  resetForm() {
    this.personForm.reset()
    this.personForm.clearValidators()
  }
}
