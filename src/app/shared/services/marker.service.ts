import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Marker } from '../models/marker'
  
@Injectable()
export class MarkerService {
    private url = `${environment.apiServer}markers`
    
    constructor(private http: HttpClient) {}

    getPart(pageNumber: number, pageSize: number) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
        return this.http.get<Marker[]>(`${this.url}`, { params: queryParams, observe: 'response' })
    }

    add(marker: Marker) {
        return this.http.post<Marker>(`${this.url}`, marker)
    }
    
    update(marker: Marker) {
        return this.http.put<Marker>(`${this.url}/${marker.id}`, marker)
    }

    delete(markerId: number) {
        return this.http.delete(`${this.url}/${markerId}`)
    }
}