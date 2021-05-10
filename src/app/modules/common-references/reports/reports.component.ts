import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { Period } from 'src/app/shared/models/period'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { ReportService } from 'src/app/shared/services/report.service'
import * as FileSaver from 'file-saver'
import { NotificationService } from '../../../shared/components/notification/notification.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  form: FormGroup
  reports: Array<{ slug: string, name: string }> = [{ slug: 'tobs', name: 'Обігово-сальдова відомість' }, { slug: 'tobspl', name: 'Обігово-сальдова відомість поіменна' }]
  branchOffices: BranchOffice[]
  periods: Period[]
  isSubmit: boolean
  isLoadingPeriods: boolean
  branchOfficeId: number
  periodId: number
  slug: string

  constructor(
    private notification: NotificationService,
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private reportService: ReportService) { }

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
    if (branchOfficeId) {
      this.isLoadingPeriods = true
      this.branchOfficeService.getPeriods(branchOfficeId).subscribe(
        periods => {
          this.periods = periods
          this.isLoadingPeriods = false
        })
    }
  }

  submitForm() {
    this.isSubmit = true
    console.log(this.slug)
    this.reportService.getReport(this.slug, this.branchOfficeId, this.periodId).subscribe(
      response => {
        FileSaver.saveAs(response, this.branchOfficeId + '_' + this.periodId + '.xlsx')
        this.isSubmit = false
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося отримати файл`)
        this.isSubmit = false
      }
    )
  }
}
