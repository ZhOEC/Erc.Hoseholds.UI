import { AccountingPointDetailService } from '../accounting-point-detail.service'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NotificationService } from 'src/app/shared/components/notification/notification.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MarkerTypeData, markerTypesMap } from 'src/app/shared/models/markers/marker-type'
import { Marker } from '../marker'
import { MarkerService } from 'src/app/shared/services/marker.service'
import { MarkerBasic } from 'src/app/shared/models/markers/marker-basic'

@Component({
  selector: 'accounting-point-marker-add',
  templateUrl: './accounting-point-marker-add.component.html',
  styleUrls: ['./accounting-point-marker-add.component.scss']
})
export class AccountingPointMarkerAdd implements OnInit {
  @Input() accountingPointId: number
  @Output() successSubmitEvent = new EventEmitter<Marker>()

  form: FormGroup
  isVisible = false
  isSubmit = false
  maxCharacterMarkerValue = 150
  isMarkersLoading = false
  markersGroups: { markerType: MarkerTypeData, markers: MarkerBasic[] }[] = []

  constructor(
    private formBuilder: FormBuilder,
    private accountingPointDetailService: AccountingPointDetailService,
    private markerService: MarkerService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      markerId: [null, [ Validators.required ]],
      note: [null]
    })

    // TODO: hack?!. Maybe need to implement a sample get of all markers from the backend
    this.getMarkers(1, 10000)
  }

  private getMarkers(pageNumber: number, pageSize: number) {
    this.isMarkersLoading = true
    this.markerService.getPart(pageNumber, pageSize).subscribe(
      response => {
        response.body.forEach(resp => {
            var i = this.markersGroups.find(s => s.markerType.value == resp.type)
            if (!i) {
              this.markersGroups.push({ markerType: markerTypesMap[resp.type], markers: response.body.filter(r => r.type == resp.type) }) 
            } 
        })
        this.isMarkersLoading = false
      },
      _ => {
        this.isMarkersLoading = false
      }
    )
  }

  showModal() {
    this.isVisible = true
  }

  cancel() {
    this.form.reset()
    this.isVisible = false
  }

  submit() {
    const marker = {
      accountingPointId: this.accountingPointId,
      markerId: this.form.controls.markerId.value,
      note: this.form.controls.note.value
    } as Marker
    
    this.accountingPointDetailService.addMarker(marker).subscribe(
      _ => {
        this.notification.show('success', 'Успіх', 'Маркер успішно додано!')
        this.successSubmitEvent.emit(marker)
        this.isSubmit = false
        this.cancel()
      },
      _ => {
        this.notification.show('success', 'Помилка', 'Не вдалося додати маркер!')
        this.isSubmit = false
      }
    )
  }
}
