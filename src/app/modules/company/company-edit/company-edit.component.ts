import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Location } from '@angular/common'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { CompanyService } from 'src/app/shared/services/company.service'

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  form: FormGroup
  isSubmit = false

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [0],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      directorName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required]],
      www: [null, [Validators.required]],
      taxpayerPhone: [null, [Validators.required]],
      bookkeeperName: [null, [Validators.required]],
      bookkeeperTaxNumber: [null, [Validators.required]]
    })
  }

  ngAfterViewInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.companyService.getOne(+params.get('id')))
    ).subscribe(company => {
      this.form.patchValue(company)
    })

  }
  
  validateForm() {
    for (const p in this.form.controls) {
      this.form.controls[p].markAsDirty()
      this.form.controls[p].updateValueAndValidity()
    }

    return this.form.valid
  }

  submitForm() {
    if (this.validateForm()) {
      this.isSubmit = true
      this.companyService.update(this.form.value).subscribe(
        () => {
          this.isSubmit = false
          this.notification.show('success', 'Успіх', `Дані компанії, успішно оновлено!`)
        },
        () => {
          this.isSubmit = false
          this.notification.show('error', 'Фіаско', `Не вдалося оновити дані компанії!`)
        }
      )
    }
  }

  cancel() {
    this.location.back()
  }
}
