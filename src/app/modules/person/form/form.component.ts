import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Person } from 'src/app/shared/models/person.model'

@Component({
  selector: 'app-person-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class PersonFormComponent implements OnInit {  
  private _form: FormGroup
  @Input()
    set form(fg: FormGroup) {
      this._form = fg
    }
    get form() { return this._form }
  @Output() formChanged = new EventEmitter()

  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  datesLessToday = (date: number): boolean => { return date < Date.now() }
    
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
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

    this.form.get('id').valueChanges.subscribe(
      id => {
        if(id) {
          this.form.get('taxCode').disable()
          this.form.get('firstName').disable()
          this.form.get('lastName').disable()
          this.form.get('patronymic').disable()
        } else {
          this.form.get('taxCode').enable()
          this.form.get('firstName').enable()
          this.form.get('lastName').enable()
          this.form.get('patronymic').enable()
        }
      }
    )

    this.form.get('idCardNumber').valueChanges.subscribe(
      number => {
        if(number?.length > 8) {
            this.form.get('idCardExpDate').setValidators(Validators.required)
            this.form.get('idCardExpDate').updateValueAndValidity()
          } else {
            this.form.get('idCardExpDate').setValue(null)
            this.form.get('idCardExpDate').clearValidators()
            this.form.get('idCardExpDate').updateValueAndValidity()
        }
      }
    )

    this.form.valueChanges.subscribe(() => {
      this._form = this.form
      this.formChanged.emit(this.form)
    })

    this.formChanged.emit(this.form)
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  validateForm() {
    for (const p in this.form['controls']) {
      this.form.controls[p].markAsDirty();
      this.form.controls[p].updateValueAndValidity();
    }

    return this.form.valid //&& !this.form.touched  //&& !this.form.dirty
  }

  resetForm() {
    this.form.reset()
    this.form.clearValidators()
  }
}
