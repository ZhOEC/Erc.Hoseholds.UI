import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Marker } from '../marker'
import { AccountingPointMarkerAdd } from '../accounting-point-marker-add/accounting-point-marker-add.component'
import { AccountingPointDetailService } from './../accounting-point-detail.service'
import { NotificationService } from 'src/app/shared/components/notification/notification.service'
import { markerTypesMap } from 'src/app/shared/models/markers/marker-type'

@Component({
  selector: 'app-accounting-point-markers',
  templateUrl: './accounting-point-markers.component.html',
  styleUrls: ['./accounting-point-markers.component.scss']
})
export class AccountingPointMarkersComponent implements OnInit {
  @Input() accountingPointId: number
  @Input() markers: Marker[] = []
  @Output() eventAddedMarker = new EventEmitter()

  @ViewChild(AccountingPointMarkerAdd)
  private addMarkerModalComponent: AccountingPointMarkerAdd

  isRemoveMarker = []
  markerTypesMap = markerTypesMap

  constructor(
    private accountingPointDetailService: AccountingPointDetailService,
    private notification: NotificationService
  ) {}

  ngOnInit() {}

  removeMarker(markerId: number) {
    this.isRemoveMarker[markerId] = { markerId: markerId, removeEvent: true }
    this.accountingPointDetailService.removeMarker(this.accountingPointId, markerId).subscribe(
      _ => {
        this.notification.show('success', 'Успіх', 'Маркер успішно видалено!')
        this.isRemoveMarker.length = 0
        this.markers = this.markers.filter(x => x.id != markerId)
      },
      _ => {
        this.notification.show('error', 'Помилка', 'Не вдалося видалити маркер!')
        this.isRemoveMarker.length = 0
      }
    )
  }

  showAddMarkerModal() {
    this.addMarkerModalComponent.showModal()
  }

  addMarkerEvent() {
    this.eventAddedMarker.emit()
  }
}
