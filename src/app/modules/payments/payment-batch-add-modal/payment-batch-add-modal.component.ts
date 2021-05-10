import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { BranchOffice } from 'src/app/shared/models/branch-office'
import { PaymentBatchService } from 'src/app/shared/services/payment-batch.service'
import { NotificationService } from '../../../shared/components/notification/notification.service'
import { PaymentChannelService } from '../../../shared/services/payment-channel.service'
import { PaymentChannel } from '../../../shared/models/payments/payment-channel.model'
import { PaymentBatchView } from 'src/app/shared/models/payments/payment-batch-view.model'
import { NzUploadFile } from 'ng-zorro-antd/upload'

@Component({
  selector: 'app-payment-batch-add-modal',
  templateUrl: './payment-batch-add-modal.component.html',
  styleUrls: ['./payment-batch-add-modal.component.css']
})

export class PaymentBatchAddComponent implements OnInit {
  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  isVisible = false
  isOkLoading = false

  paymentBatchForm: FormGroup
  branchOfficesList: BranchOffice[]
  paymentChannelsList: PaymentChannel[]
  
  @Output() addPaymentsBatchToList = new EventEmitter<PaymentBatchView>()

  constructor(
    private branchOfficeService: BranchOfficeService,
    private paymentChannelService: PaymentChannelService,
    private paymentBatchService: PaymentBatchService,
    private notification: NotificationService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.paymentBatchForm = this.formBuilder.group({
      branchOfficeId: [null, [Validators.required]],
      paymentChannelId: [null, [Validators.required]],
      incomingDate: [null, [Validators.required]],
      uploadFile: new FormControl()
    })

    this.getBranchOffices()
    this.getPaymentChannels()
  }

  openDialog() {
    this.isVisible = true
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(
      data => {
        this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name))
        if (this.branchOfficesList.length === 1) {
          this.paymentBatchForm.get('branchOfficeId').setValue(this.branchOfficesList[0].id)
        }
    })
  }

  getPaymentChannels() {
    this.paymentChannelService.getAll().subscribe(data => {
      this.paymentChannelsList = data
    })
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.paymentBatchForm.get('uploadFile').setValue(file)
    return false;
  };

  resetForm() {
    this.paymentBatchForm.reset()
  }

  submitForm() {
    this.isOkLoading = true

    const formData = new FormData()
    for (const key of Object.keys(this.paymentBatchForm.value)) {
      let value = this.paymentBatchForm.get(key).value
      if (value instanceof Date) value = (new Date(value)).toISOString()
      formData.append(key, value)
    }

    this.paymentBatchService.add(formData).subscribe(paymentsBatch => {
      this.addPaymentsBatchToList.emit(paymentsBatch)
      this.isOkLoading = false

      this.notification.show('success', 'Успіх', `Пачку платежів, успішно додано!`)
      this.paymentBatchForm.reset()
      this.isVisible = false
    },
    _ => {
      this.notification.show('error', 'Фіаско', `Не вдалося додати пачку платежів!`)
      this.isOkLoading = false
    })
  }
}
