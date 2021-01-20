import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
  
@Injectable()
export class InformationExchangeService {  
    constructor(private http: HttpClient) {}
  
    exportConsumptionSocialService(periodStartDate: Date): Observable<Blob> {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('date', periodStartDate.toString())
        return this.http.get(`${environment.apiServer}exports/recordpoints/`, { params: queryParams, responseType: 'blob' })
    }
}