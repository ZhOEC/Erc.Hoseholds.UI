import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentChannel } from '../../../shared/models/payments/payment-channel.model';
import { PaymentChannelService } from '../../../shared/services/payment-channel.service';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

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

  totalRecordList = [
    { id: 0, name: 'Відсутній' },
    { id: 1, name: 'Перший' },
    { id: 2, name: 'Останній' }
  ]

  typeList = [
    { id: 0, name: 'Платіж абонента' },
    { id: 1, name: 'Пільга або субсидія' },
    { id: 2, name: 'Компенсація ОСР' }
  ]

  constructor(private formBuilder: FormBuilder, 
    private paymentChannelService: PaymentChannelService,
    private notification: NotificationComponent
  ) {}

  ngOnInit() {
    this.paymentChannelForm = this.formBuilder.group({
      id: [0],
      name: [null, [Validators.required]],
      recordpointFieldName: [null],
      sumFieldName: [null],
      dateFieldName: [null],
      textDateFormat: [null],
      personFieldName: [null],
      totalRecord: [null],
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
    this.paymentChannelForm.reset({totalRecord: 0})
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
        this.notification.show('success', 'Успіх', `Канал оплати ${this.paymentChannelForm.value.name} успішно оновлено!`);
        this.isVisible = false
      })
    } else {
      delete this.paymentChannelForm.value.id
      this.paymentChannelService.add(this.paymentChannelForm.value).subscribe(pc => {
        this.paymentChannels.push(pc)
        this.notification.show('success', 'Успіх', `Канал оплати ${this.paymentChannelForm.value.name} успішно додано!`);
        this.isVisible = false
      })
    }
  }
}
