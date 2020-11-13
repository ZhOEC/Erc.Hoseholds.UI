import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'
import { Period } from 'src/app/shared/models/period.model'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  form: FormGroup
  reports: Array<{ slug: string, name: string }> = [{ slug: 'tobs', name: 'Обігово-сальдова відомість' }]
  branchOffices: BranchOffice[]
  periods: Period[]
  isSubmit: boolean
  isLoadingPeriods: boolean
  branchOfficeId: number
  periodId: number
  slug: string

  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService) { }

  ngOnInit() {
    /*  this.form = this.formBuilder.group({
       branchOfficeId: [null, Validators.required],
       periodId: [null, Validators.required]
     }) */

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
    if (branchOfficeId) {
      this.isLoadingPeriods = true
      this.branchOfficeService.getPeriods(branchOfficeId).subscribe(
        periods => {
          this.periods = periods
          this.isLoadingPeriods = false
        })
    }
  }

  submitForm = () => window.location.href = `${environment.apiServer}reports/${this.slug}?branch_office_id=${this.branchOfficeId}&period_id=${this.periodId}`

}
