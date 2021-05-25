import { Component, EventEmitter, Output } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { NotificationService } from "src/app/shared/components/notification/notification.service"
import { MarkerBasic } from "src/app/shared/models/markers/marker-basic"
import { MarkerService } from "src/app/shared/services/marker.service"
import { markerTypesMap } from './../../../shared/models/markers/marker-type'

@Component({
  selector: 'marker-modal-component',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss']
})
export class MarkerModalComponent {
  @Output() submitEvent = new EventEmitter<boolean>()
  
  inputMarker: MarkerBasic
  isVisible = false
  isSubmit = false

  markerTypes = markerTypesMap

  formMarker: FormGroup
  maxCharacterMarkerValue = 50

  constructor(
    private formBuilder: FormBuilder,
    private markerService: MarkerService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.formMarker = this.formBuilder.group({
      type: [null, [ Validators.required ]],
      value: [null, [ Validators.maxLength(this.maxCharacterMarkerValue) ]]
    })
  }

  add(marker: MarkerBasic) {
    this.markerService.add(marker).subscribe(
      _ => {
        this.submitEvent.emit(true)
        this.notification.show('success', 'Успіх', `Маркер успішно додано!`)
        this.isSubmit = false
        this.cancel()
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося додати маркер`)
        this.isSubmit = false
      })
  }

  update(marker: MarkerBasic) {
    this.markerService.update(marker).subscribe(
      _ => {
        this.notification.show('success', 'Успіх', `Маркер успішно оновлено!`)
        this.submitEvent.emit(true)
        this.isSubmit = false
        this.cancel()
      },
      _ => {
        this.notification.show('error', 'Фіаско', `Не вдалося оновити маркер`)
        this.isSubmit = false
      })
  }

  showModal(marker?: MarkerBasic) {
    this.inputMarker = marker

    if (this.inputMarker) {
      this.formMarker.patchValue(marker)
    }

    this.isVisible = true
  }

  submit() {
    if (this.inputMarker) {
      const marker = { id: this.inputMarker.id, type: this.formMarker.value.type, value: this.formMarker.value.value }
      this.update(marker)
    } else {
      this.add(this.formMarker.value)
    }
  }

  cancel() {
    delete this.inputMarker
    this.formMarker.reset()
    this.isVisible = false
  }
}