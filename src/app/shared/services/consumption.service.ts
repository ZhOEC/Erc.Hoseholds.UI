import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ConsumptionRecord } from '../models/consumption-record'

@Injectable()
export class ConsumptionService {
    private url: string = environment.apiServer + 'consumption'
    
    constructor(private http: HttpClient) {}

    uploadFile(formData: FormData): Observable<ConsumptionRecord[]> {
        return this.http.post<ConsumptionRecord[]>(this.url, formData)
    }
}