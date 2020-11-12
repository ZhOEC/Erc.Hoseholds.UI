import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PaymentBatchView } from '../models/payments/payment-batch-view.model'

@Injectable()
export class PaymentBatchService {
    private url: string = environment.apiServer + 'paymentbatches/'

    constructor(private http: HttpClient) { }

    getPart(pageNumber: number, pageSize: number, showClosed: boolean) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
            .append('showClosed', showClosed.toString())
        return this.http.get(this.url, { params: queryParams, observe: 'response' })
    }

    getOne(id: number): Observable<PaymentBatchView> {
        return this.http.get<PaymentBatchView>(this.url + id)
    }

    add(paymentBatch: FormData): Observable<PaymentBatchView> {
        return this.http.post<PaymentBatchView>(this.url, paymentBatch)
    }

    update(paymentBatch: PaymentBatchView): Observable<PaymentBatchView> {
        return this.http.put<PaymentBatchView>(this.url + paymentBatch.id, paymentBatch)
    }

    delete(id: number): Observable<PaymentBatchView> {
        return this.http.delete<PaymentBatchView>(this.url + id)
    }

    process(id: number)  {
        console.log(`service process ${this.url}${id}/processing`);
        return this.http.post(this.url + id + '/processing', null);
    }
}