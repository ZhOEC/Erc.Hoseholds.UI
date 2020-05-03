import { PaymentChannelService } from './../../../shared/services/payment-chennel.service';
import { PaymentChannel } from './../../../shared/models/payment-channel';
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'

@Component({
  selector: 'app-payment-batch-add',
  templateUrl: './payment-batch-add.component.html',
  styleUrls: ['./payment-batch-add.component.css']
})
export class PaymentBatchAddComponent implements OnInit {

  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }

  paymentBatchForm: FormGroup
  branchOfficesList: BranchOffice[]
  paymentChannelsList: PaymentChannel[]

  constructor(
    private branchOfficeService: BranchOfficeService,
    private paymentChannelService: PaymentChannelService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.paymentBatchForm = this.formBuilder.group({
      branchOfficeId: [null, [Validators.required]],
      paymentChannelId: [null, [Validators.required]],
      dateComing: [null, [Validators.required]]
    })

    this.getBranchOffices()
    this.getPaymentChannel()
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name))
      if (this.branchOfficesList.length === 1) {
        this.paymentBatchForm.get('branchOfficeId').setValue(this.branchOfficesList[0].id)
      }
    })
  }

  getPaymentChannel() {
    this.paymentChannelService.getAll().subscribe(data => {
      this.paymentChannelsList = data
    })
  }

  resetForm() {}

  submitForm() {}
}
