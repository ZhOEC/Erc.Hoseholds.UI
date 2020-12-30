import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'
import { Period } from 'src/app/shared/models/period.model'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-print-bills',
  templateUrl: './print-bills.component.html',
  styleUrls: ['./print-bills.component.scss']
})
export class PrintBillsComponent implements OnInit {
  form: FormGroup
  branchOffices: BranchOffice[]
  periods: Period[]
  isSubmit: boolean
  isLoadingPeriods: boolean

  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      branchOfficeId: [null, Validators.required],
      periodId: [null, Validators.required]
    })

    this.getBranchOffices()
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(
      offices => {
        this.branchOffices = offices
        if (this.branchOffices.length == 1) {
          this.form.get('branchOfficeId').setValue(this.branchOffices[0].id)
          this.getPeriods(this.branchOffices[0].id)
        }
      })
  }

  getPeriods(branchOfficeId: number) {
    this.form.get('periodId').reset()
    if (branchOfficeId) {
      this.isLoadingPeriods = true
      this.branchOfficeService.getPeriods(branchOfficeId).subscribe(
        periods => {
          this.periods = periods
          this.isLoadingPeriods = false
        })
    }
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
      window.location.href = `${environment.apiServer}bills/?branch_office_id=${this.form.get('branchOfficeId').value}&period_id=${this.form.get('periodId').value}`
    }
  }
}
