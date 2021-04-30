import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Person } from '../models/person.model'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Marker } from '../models/marker'
  
@Injectable()
export class MarkerService {
    private url = `${environment.apiServer}markers/`
    
    constructor(private http: HttpClient) {}

    getPart(pageNumber: number, pageSize: number) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
        return this.http.get<Marker[]>(`${this.url}`, { params: queryParams, observe: 'response' })
    }
}