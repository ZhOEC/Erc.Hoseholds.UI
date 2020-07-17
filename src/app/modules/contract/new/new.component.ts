import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { AccountingPointDetailService } from '../../accounting-point-view/accounting-point-detail.service'
import { AccountingPointDetail } from '../../accounting-point-view/accounting-point-detail.model'
import { Person } from 'src/app/shared/models/person.model'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'

@Component({
  selector: 'app-contract-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ContractNewComponent implements OnInit {
  person: Person
  form: FormGroup
  accountingPointDetail: AccountingPointDetail

  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  isSubmit = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private accountingPointDetailService: AccountingPointDetailService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contractStartDate: [null, Validators.required],
      sendPaperBill: [false],
      owner: this.formBuilder.group({})
    })

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.accountingPointDetailService.getOne(+params.get('id')))
    ).subscribe(ap => {
      this.accountingPointDetail = ap
      this.person = ap.owner
    })
  }

  onPersonFormChanged(fg: FormGroup) {
    for (const c in fg.controls) {
      (this.form.controls.owner as FormGroup).addControl(c, fg.controls[c])
    }
  }

  onFoundPersonChanged(p: Person) {
    if(p) this.form.get('owner')?.patchValue(p)
    else this.form.get('owner')?.reset()
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

  cancel() {
    this.router.navigate(['accounting-points/', this.accountingPointDetail.id])
  }

  submitForm() {
    console.log(this.form)
    if (this.validateForm()) {
      this.accountingPointService.openNewContract(this.accountingPointDetail.id, this.form.getRawValue()).subscribe(
        () => {
          this.isSubmit = false
          this.notification.show('success', 'Успіх', `Дані власника, успішно оновлено!`)
          this.router.navigate(['accounting-points/', this.accountingPointDetail.id])
        },
        () => {
          this.isSubmit = false
          this.notification.show('error', 'Фіаско', `Не вдалося оновити дані власника!`)
        }
      )
    } else this.isSubmit = false
  }
}
