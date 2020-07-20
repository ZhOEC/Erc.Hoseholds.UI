import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service'
import { AccountingPointDetailService } from '../../accounting-point-view/accounting-point-detail.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class AccountingPointEditComponent implements OnInit {
  form: FormGroup
  isLoadingSubmit = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private accountingPointDetailService: AccountingPointDetailService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.form = this.formBuilder.group({})

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => params.getAll('id'))
    ).subscribe(id => {
      if (id) {
        this.form.get('tariffId')?.disable()
        this.accountingPointDetailService.getOne(+id).subscribe(acd => {
          console.log(acd)
          this.form.patchValue(acd)
        })
      }
    })
  }

  onAccountingPointFormChanged(fg: FormGroup) {
    for (const c in fg.controls) {
      this.form.addControl(c, fg.controls[c])
    }
  }

  cancelEdit() {
    this.router.navigate(['accounting-points/', this.form.get('id').value])
  }

  submitForm() {
    if (this.form.valid) {
      this.isLoadingSubmit = true
      this.accountingPointService.update(this.form.value)
        .subscribe(
          () => {
            this.notification.show('success', 'Успіх', `Точка обліку - ${this.form.value.name}, успішно оновлена`)
            this.isLoadingSubmit = false
            this.router.navigate(['accounting-points/', this.form.get('id').value])
          },
          () => {
            this.notification.show('error', 'Фіаско', `Не вдалося оновити точку обліку`)
            this.isLoadingSubmit = false
          })
    }
  }
}
