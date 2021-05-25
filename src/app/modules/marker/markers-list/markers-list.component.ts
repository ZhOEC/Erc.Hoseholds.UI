import { MarkerModalComponent } from './../marker-modal/marker-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core'
import { MarkerBasic } from 'src/app/shared/models/markers/marker-basic'
import { MarkerService } from 'src/app/shared/services/marker.service'
import { NotificationService } from '../../../shared/components/notification/notification.service'
import { markerTypesMap } from './../../../shared/models/markers/marker-type'

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.scss']
})
export class MarkersListComponent implements OnInit {
  @ViewChild(MarkerModalComponent)
  private markerModalComponent: MarkerModalComponent

  markers: MarkerBasic[] = []
  totalCount: number
  pageNumber = 1
  pageSize = 10
  isMarkersLoading = false
  markerTypesMap = markerTypesMap

  constructor(
    private markerService: MarkerService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.getMarkers(this.pageNumber, this.pageSize)
  }

  private getMarkers(pageNumber: number, pageSize: number) {
    this.isMarkersLoading = true
    this.markerService.getPart(pageNumber, pageSize).subscribe(
      response => {
        this.markers = response.body
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.isMarkersLoading = false
      },
      _ => {
        this.isMarkersLoading = false
      }
    )
  }

  pageIndexChange(pageIndex: number) {
    this.pageNumber = pageIndex
    this.getMarkers(this.pageNumber, this.pageSize)
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.getMarkers(this.pageNumber, this.pageSize)
  }

  remove(id: number) {
    this.markerService.delete(id).subscribe(
      _ => {
        this.getMarkers(this.pageNumber, this.pageSize)
        this.notification.show('success', 'Успіх', 'Маркер успішно видалено!')
      },
      error => {
        console.error(error)
        this.notification.show('success', 'Помилка', 'Не вдалося видалити маркер!')
      })
  }

  showMarkerModal(marker?: MarkerBasic) {
    this.markerModalComponent.showModal(marker)
  }

  updateData() {
    this.getMarkers(this.pageNumber, this.pageSize)
  }
}