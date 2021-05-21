import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { Period } from 'src/app/shared/models/period'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { ReportService } from 'src/app/shared/services/report.service'
import * as FileSaver from 'file-saver'
import { NotificationService } from '../../../shared/components/notification/notification.service'
import { DistributionSystemOperator } from 'src/app/shared/models/distribution-system-operator'
import { DistributionSystemOperatorService } from './../../../shared/services/distribution-system-operator.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  formReport: FormGroup
  reports: Array<{ slug: string, name: string }> = [
    { slug: 'tobs', name: 'Обігово-сальдова відомість' }, 
    { slug: 'tobspl', name: 'Обігово-сальдова відомість поіменна' }
  ]
  
  branchOffices: BranchOffice[]
  periods: Period[]
  distributionSystemOperators: DistributionSystemOperator[] = []
  distributionSystemOperatorsIds: number[] = []

  isLoadingPeriods: boolean
  isLoadingDsos: boolean
  isSubmit: boolean
  slug: string

  constructor (
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private distributionSystemOperatorService: DistributionSystemOperatorService,
    private reportService: ReportService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.formReport = this.formBuilder.group({
      slug:  [ null, Validators.required ],
      branchOfficeId: [ null, Validators.required ],
      dsoIds: [ [], Validators.required ],
      periodId: [ null, Validators.required ]
     })

    this.getBranchOffices()
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(
      offices => {
        this.branchOffices = offices
        if (this.branchOffices.length == 1) {
          this.formReport.get('branchOfficeId').setValue(this.branchOffices[0].id)
          this.getPeriods(this.branchOffices[0].id)
        }
      })
  }

  onChangeBranchOffice(branchOfficeId: number) {
    this.formReport.controls.periodId.reset()
    this.formReport.controls.dsoIds.reset()

    this.getPeriods(branchOfficeId)
    this.getDistributionSystemOperators(branchOfficeId)
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

  getDistributionSystemOperators(branchOfficeId: number) {
    if (branchOfficeId) {
      this.distributionSystemOperatorsIds.length = 0
      this.distributionSystemOperators.length = 0

      const commoditiesBranchOffice = this.branchOffices.find(x => x.id == branchOfficeId).availableCommodities
      commoditiesBranchOffice.forEach(commodity => {
        this.isLoadingDsos = true
        this.distributionSystemOperatorService.getDistributionSystemOperators(commodity).subscribe(
          responseOperators => {
            this.distributionSystemOperators.push(...responseOperators)
            this.distributionSystemOperatorsIds.push(...responseOperators.map(x => x.id))
            this.isLoadingDsos = false
          },
          _ => this.isLoadingDsos = false
        )
      })
    }
  }

  submitForm() {
    this.isSubmit = true
    this.reportService.getReport(this.formReport.value).subscribe(
      response => {
        FileSaver.saveAs(response, this.formReport.controls.branchOfficeId.value + '_' + this.formReport.controls.periodId.value + '.xlsx')
        this.isSubmit = false
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося отримати файл`)
        this.isSubmit = false
      }
    )
  }
}
