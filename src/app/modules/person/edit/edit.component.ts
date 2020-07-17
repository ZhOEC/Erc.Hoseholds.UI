import { Component, OnInit, AfterViewInit } from '@angular/core'
import { PersonService } from 'src/app/shared/services/person.service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { switchMap } from 'rxjs/operators'
import { Person } from 'src/app/shared/models/person.model'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PersonEditComponent implements OnInit, AfterViewInit {
  form: FormGroup
  person: Person
  isSubmit = false

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      person: this.formBuilder.array([])
    })
  }

  ngAfterViewInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.personService.getOne(+params.get('id')))
    ).subscribe(data => {
      this.person = data
      this.form.get('person')?.patchValue(this.person)
    })
  }

  validateForm() {
    for (const p in this.form.controls) {
      this.form.controls[p].markAsDirty()
      this.form.controls[p].updateValueAndValidity()
    }

    return this.form.valid
  }

  cancel() {
    this.location.back()
  }

  submitForm() {
    if (this.validateForm()) {
      this.isSubmit = true
      this.personService.update(this.form.value).subscribe(
        () => {
          this.isSubmit = false
          this.notification.show('success', 'Успіх', `Дані власника, успішно оновлено!`)
        },
        () => {
          this.isSubmit = false
          this.notification.show('error', 'Фіаско', `Не вдалося оновити дані власника!`)
        }
      )
    }
  }

  onPersonFormChanged(fg: FormGroup) {
    this.form.controls.person = fg
    for (const c in fg.controls) {
      this.form.registerControl(c, fg.controls[c])
    }
  }
}
