import { Component, OnInit } from '@angular/core'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { ExemptionCategoryService } from 'src/app/shared/services/exemption-category.service'
import { ExemptionCategory } from 'src/app/shared/models/exemption-category'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { Person } from 'src/app/shared/models/person.model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { switchMap } from 'rxjs/operators'
import { AccountingPointDetailService } from '../../accounting-point-view/accounting-point-detail.service'

@Component({
  selector: 'app-open-exemption',
  templateUrl: './open-exemption.component.html',
  styleUrls: ['./open-exemption.component.css']
})
export class OpenExemptionComponent implements OnInit {
  accountingPointId: number
  openExemptionForm: FormGroup
  exemtions: ExemptionCategory[]
  isLoadingSubmit = false
  person: Person

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private exemptionCategoryService: ExemptionCategoryService,
    private accountingPointDetailService: AccountingPointDetailService,
    private accountingPointsService: AccountingPointService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.openExemptionForm = this.fb.group({
      exemptionCategoryId: [null, [Validators.required]],
      date: [null, [Validators.required]],
      certificate: [null, [Validators.required]],
      personCount: [null, [Validators.required]],
      limit: [false],
      note: [null],
      person: this.fb.group({})
    })

    this.getExemptions()

    this.route.paramMap.pipe(switchMap((params: ParamMap) => 
      this.accountingPointDetailService.getOne(+params.get('id'))))
        .subscribe(ap => {
          this.accountingPointId = ap.id
          this.person = ap.owner
        });
  }

  getExemptions() {
    this.exemptionCategoryService.getList().subscribe(data => this.exemtions = data);
  }

  onPersonFormChanged(fg: FormGroup) {
    for (const c in fg.controls) {
      (this.openExemptionForm.get('person') as FormGroup).addControl(c, fg.controls[c])
    }
  }

  onFoundPersonChanged(p: Person) {
    if (p) this.openExemptionForm.get('person')?.patchValue(p)
    else this.openExemptionForm.get('person')?.reset({ id: 0 })
  }

  resetForm() {
    this.openExemptionForm.reset()
  }

  validateForm() {
    this.updateTreeValidity(this.openExemptionForm)
    return this.openExemptionForm.valid
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
      this.accountingPointsService.openExemption(this.accountingPointId, this.openExemptionForm.getRawValue())
        .subscribe(() => {
          this.notification.show('success', 'Успіх', `Пільгу успішно відкрито`)
          this.isLoadingSubmit = false
          this.router.navigate(['accounting-points/', this.accountingPointId])
        },
          () => {
            this.notification.show('error', 'Фіаско', `Не вдалося додати точку обліку`)
            this.isLoadingSubmit = false
          })
    }
  }
}
