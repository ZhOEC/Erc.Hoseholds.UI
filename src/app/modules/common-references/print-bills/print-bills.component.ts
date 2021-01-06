import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as FileSaver from 'file-saver'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'
import { Period } from 'src/app/shared/models/period.model'
import { BillService } from 'src/app/shared/services/bill.service'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'

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
    private notification: NotificationComponent,
    private formBuilder: FormBuilder,
    private branchOfficeService: BranchOfficeService,
    private billService: BillService) {}

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

  submitForm() {
      this.isSubmit = true
      this.billService.getBillsByFile(this.form.get('branchOfficeId').value, this.form.get('periodId').value).subscribe(
        response => {
          FileSaver.saveAs(response, this.form.get('branchOfficeId').value + '_' + this.form.get('periodId').value + '.xlsx')
          this.isSubmit = false
        },
        _ => {
          this.notification.show('error', 'Фіаско', `Не вдалося отримати файл`)
          this.isSubmit = false
        }
      )
  }
}
