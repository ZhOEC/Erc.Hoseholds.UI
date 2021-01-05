import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'
import { Period } from 'src/app/shared/models/period.model'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { InformationExchangeService } from 'src/app/shared/services/information-exchange.service'
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-export-consumption-social-services',
  templateUrl: './export-consumption-social-services.component.html',
  styleUrls: ['./export-consumption-social-services.component.scss']
})
export class ExportConsumptionSocialServicesComponent implements OnInit {
  form: FormGroup
  branchOffices: BranchOffice[]
  periods: Period[]
  isSubmit: boolean
  isLoadingPeriods: boolean
  branchOfficeId: number
  periodStartDate: Date
  
  constructor(
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private informationExchangeService: InformationExchangeService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
       branchOfficeId: [null, Validators.required],
       periodStartDate: [null, Validators.required]
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

  submitForm () {
    this.informationExchangeService.exportConsumptionSocialService(this.periodStartDate).subscribe(
      response => FileSaver.saveAs(response, 'list.csv')
    )
  }
}
