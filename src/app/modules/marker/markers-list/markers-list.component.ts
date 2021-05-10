import { MarkerModalComponent } from './../marker-modal/marker-modal.component';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core'
import { Marker } from 'src/app/shared/models/marker'
import { MarkerService } from 'src/app/shared/services/marker.service'
import { NotificationService } from '../../../shared/components/notification/notification.service'

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.scss']
})
export class MarkersListComponent implements OnInit {
  @ViewChild(MarkerModalComponent)
  private markerModalComponent: MarkerModalComponent

  markers: Marker[] = []
  totalCount: number
  pageNumber = 1
  pageSize = 10
  isMarkersLoading = false

  constructor(
    private markerService: MarkerService
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
      },
      error => {
        console.error(error)
      })
  }

  showMarkerModal(marker?: Marker) {
    this.markerModalComponent.showModal(marker)
  }

  updateData() {
    this.getMarkers(this.pageNumber, this.pageSize)
  }
}