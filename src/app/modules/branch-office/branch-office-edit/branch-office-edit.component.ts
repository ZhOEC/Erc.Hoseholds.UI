import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { switchMap } from 'rxjs/operators'
import { Location } from '@angular/common'

@Component({
  selector: 'app-branch-office-edit',
  templateUrl: './branch-office-edit.component.html',
  styleUrls: ['./branch-office-edit.component.scss']
})
export class BranchOfficeEditComponent implements OnInit {
  form: FormGroup
  isSubmit = false

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private branchOfficeService: BranchOfficeService,
    private notification: NotificationComponent) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [0],
      name: [null, [Validators.required]],
      chiefName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      bookkeeperName: [null, [Validators.required]],
      bankFullName: [null, [Validators.required]],
      iban: [null, [Validators.required]]
    })
  }

  ngAfterViewInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.branchOfficeService.getOne(+params.get('id')))
    ).subscribe(branchOffice => {
      this.form.patchValue(branchOffice)
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
      this.branchOfficeService.update(this.form.value).subscribe(
        () => {
          this.isSubmit = false
          this.notification.show('success', 'Успіх', `Дані ЦОК, успішно оновлено!`)
        },
        () => {
          this.isSubmit = false
          this.notification.show('error', 'Фіаско', `Не вдалося оновити дані ЦОК!`)
        }
      )
    }
  }

  cancel() {
    this.location.back()
  }
}