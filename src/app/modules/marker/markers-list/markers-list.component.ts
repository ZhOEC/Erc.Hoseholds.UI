import { Component, OnInit } from '@angular/core'
import { MarkerService } from 'src/app/shared/services/marker.service'

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.scss']
})
export class MarkersListComponent implements OnInit {
  totalCount: number
  pageNumber = 1
  pageSize = 10
  isMarkersLoading = false

  constructor(private markerService: MarkerService) { }

  ngOnInit() {
    this.getMarkers(this.pageNumber, this.pageSize)
  }

  private getMarkers(pageNumber: number, pageSize: number) {
    this.markerService.getPart(pageNumber, pageSize).subscribe(
      response => {
        this.totalCount = Number(response.headers.get('X-Total-Count'))
        this.isMarkersLoading = false
        console.log(response)
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
}
