import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { NotificationService } from "src/app/shared/components/notification/notification.service"
import { Marker } from "src/app/shared/models/marker"
import { MarkerService } from "src/app/shared/services/marker.service"

@Component({
  selector: 'marker-modal-component',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.scss']
})
export class MarkerModalComponent {
  @Output() submitEvent = new EventEmitter<boolean>()
  
  inputMarker: Marker
  isVisible = false
  formMarker: FormGroup
  maxCharacterMarkerValue = 100
  isSubmit = false

  constructor(
    private formBuilder: FormBuilder,
    private markerService: MarkerService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.formMarker = this.formBuilder.group({
      value: [null, [ Validators.maxLength(this.maxCharacterMarkerValue) ]]
    })
  }

  add(marker: Marker) {
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

  update(marker: Marker) {
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

  showModal(marker?: Marker) {
    this.inputMarker = marker

    if (this.inputMarker) {
      this.formMarker.patchValue(marker)
    }

    this.isVisible = true
  }

  submit() {
    if (this.inputMarker) {
      const marker = { id: this.inputMarker.id, value: this.formMarker.value.value }
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