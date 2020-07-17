import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { Person } from 'src/app/shared/models/person.model'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class AccountingPointNewComponent implements OnInit {
  form: FormGroup
  person: Person
  isLoadingSubmit = false
  datesMoreToday = (date: number): boolean => { return date > Date.now() }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private notification: NotificationComponent) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      contractStartDate: [null, Validators.required],
      sendPaperBill: [true],
      owner: this.formBuilder.group({})
    })
  }

  onAccountingPointFormChanged(fg: FormGroup) {
    for (const c in fg.controls) {
      this.form.addControl(c, fg.controls[c])
    }
  }

  onPersonFormChanged(fg: FormGroup) {
    for (const c in fg.controls) {
      (this.form.get('owner') as FormGroup).addControl(c, fg.controls[c])
    }
  }

  onFoundPersonChanged(p: Person) {
    if(p) this.form.get('owner')?.patchValue(p)
    else this.form.get('owner')?.reset()
  }

  resetForm() {
    this.form.reset()
  }

  validateForm() {
    this.updateTreeValidity(this.form)
    return this.form.valid
  }

  updateTreeValidity(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key]
  
      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.updateTreeValidity(abstractControl)
      } else {
        abstractControl.markAsTouched()
        abstractControl.updateValueAndValidity()
      }
    })
  }

  submitForm() {
    if (this.validateForm()) {
      this.isLoadingSubmit = true
      this.accountingPointService.add(this.form.getRawValue()).subscribe(
        ap => {
          this.notification.show('success', 'Успіх', `Точку обліку - ${ this.form.value.name }, успішно додано`)
          this.isLoadingSubmit = false
          this.router.navigate(['accounting-points/', ap.id])
        },
        () => {
          this.notification.show('error', 'Фіаско', `Не вдалося додати точку обліку`)
          this.isLoadingSubmit = false
        }
      )
    }
  }
}
