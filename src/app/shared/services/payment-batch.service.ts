import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PaymentBatchView } from '../models/payments/payment-batch-view.model'

@Injectable()
export class PaymentBatchService {
    private urn: string = environment.apiServer + 'paymentbatches/'
    
    constructor(private http: HttpClient) {}

    getPart(pageNumber: number, pageSize: number, showClosed: boolean) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
            .append('showClosed', showClosed.toString())
        return this.http.get(this.urn, { params: queryParams, observe: 'response' })
    }

    getOne(id: number): Observable<PaymentBatchView> {
        return this.http.get<PaymentBatchView>(this.urn + id)
    }

    add(paymentBatch: FormData): Observable<PaymentBatchView> {
        return this.http.post<PaymentBatchView>(this.urn, paymentBatch)
    }

    update(paymentBatch: PaymentBatchView): Observable<PaymentBatchView> {
        return this.http.put<PaymentBatchView>(this.urn + paymentBatch.id, paymentBatch)
    }

    delete(id: number): Observable<PaymentBatchView> {
        return this.http.delete<PaymentBatchView>(this.urn + id)
    }
}