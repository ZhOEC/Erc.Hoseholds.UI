import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class PaymentService {
    private urn: string = environment.apiServer + 'payments/'
    
    constructor(private http: HttpClient) {}

    getPart(paymentsBatchId: number, pageNumber: number, pageSize: number, showProcessed: boolean) {
        let queryParams = new HttpParams()
            .append('paymentsBatchId', paymentsBatchId.toString())
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
            .append('showProcessed', showProcessed.toString())
        return this.http.get(this.urn, { params: queryParams, observe: 'response' })
    }
}