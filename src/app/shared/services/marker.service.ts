import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { MarkerBasic } from '../models/markers/marker-basic'
  
@Injectable()
export class MarkerService {
    private url = `${environment.apiServer}markers`
    
    constructor(private http: HttpClient) {}

    getPart(pageNumber: number, pageSize: number) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
        return this.http.get<MarkerBasic[]>(`${this.url}`, { params: queryParams, observe: 'response' })
    }

    add(marker: MarkerBasic) {
        return this.http.post<MarkerBasic>(`${this.url}`, marker)
    }
    
    update(marker: MarkerBasic) {
        return this.http.put<MarkerBasic>(`${this.url}/${marker.id}`, marker)
    }

    delete(markerId: number) {
        return this.http.delete(`${this.url}/${markerId}`)
    }
}