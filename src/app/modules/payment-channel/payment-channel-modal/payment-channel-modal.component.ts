import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentChannel } from '../../../shared/models/payment-channel';
import { PaymentChannelService } from '../../../shared/services/payment-chennel.service';

@Component({
  selector: 'app-payment-channel-modal',
  templateUrl: './payment-channel-modal.component.html',
  styleUrls: ['./payment-channel-modal.component.css']
})
export class PaymentChannelModalComponent implements OnInit {
  modalTitle: string
  submitButtonText: string
  isVisible = false

  paymentChannelForm: FormGroup
  paymentChannels: PaymentChannel[]
  paymentChannel: PaymentChannel

  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }

  constructor(private formBuilder: FormBuilder, 
    private paymentChannelService: PaymentChannelService
  ) {}

  ngOnInit() {
    this.paymentChannelForm = this.formBuilder.group({
      id: [0],
      name: [null, [Validators.required]],
      recordpointFieldName: [null, [Validators.required]],
      sumFieldName: [null, [Validators.required]],
      dateFieldName: [null, [Validators.required]],
      textDateFormat: [null, [Validators.required]],
      personFieldName: [null, [Validators.required]],
      totalRecord: [null, [Validators.required]],
      type: [null, [Validators.required]]
    })

    this.paymentChannelForm.valueChanges.subscribe(() => {
      if(JSON.stringify(this.paymentChannelForm.value) !== JSON.stringify(this.paymentChannel))
        this.paymentChannelForm.markAsTouched()
      else this.paymentChannelForm.markAsUntouched()
    })
  }

  openAddDialog(paymentChannels: PaymentChannel[]) {
    this.modalTitle = 'Додати канал оплати'
    this.submitButtonText = 'Додати'
    this.paymentChannelForm.reset()
    this.paymentChannelForm.markAsUntouched();

    this.paymentChannels = paymentChannels
    this.isVisible = true
  }

  openEditDialog(paymentChannels: PaymentChannel[], paymentChannel: PaymentChannel) {
    this.modalTitle = `Редагування каналу оплати - ${paymentChannel.name}`
    this.submitButtonText = 'Зберегти'
    this.paymentChannelForm.reset()
    this.paymentChannelForm.patchValue(paymentChannel)
    this.paymentChannelForm.markAsUntouched();
    
    this.paymentChannel = paymentChannel
    this.paymentChannels = paymentChannels
    this.isVisible = true
  }

  submitForm() {
    if(this.paymentChannelForm.value.id) {
      this.paymentChannelService.update(this.paymentChannelForm.value).subscribe(() => {
        const index = this.paymentChannels.findIndex(x => x.id == this.paymentChannelForm.value.id)
        this.paymentChannels[index] = this.paymentChannelForm.value
        this.isVisible = false
      })
    } else {
      delete this.paymentChannelForm.value.id
      this.paymentChannelService.add(this.paymentChannelForm.value).subscribe(pc => {
        this.paymentChannels.push(pc)
        this.isVisible = false
      })
    }
  }
}
