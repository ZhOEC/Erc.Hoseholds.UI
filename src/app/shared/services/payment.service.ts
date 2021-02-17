import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { PaymentView } from '../models/payments/payment-view.model'
import { PaymentPost } from '../models/payments/payment-post.model'
import { map } from 'rxjs/internal/operators/map'

@Injectable()
export class PaymentService {
    private url = environment.apiServer + 'payments/'
    
    constructor(private http: HttpClient) {}

    getPart(paymentsBatchId: number, pageNumber: number, pageSize: number, showProcessed: boolean) {
        let queryParams = new HttpParams()
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
            .append('showProcessed', showProcessed.toString())
        return this.http.get<PaymentView[]>(`${environment.apiServer}PaymentBatches/${paymentsBatchId}/payments`, { params: queryParams, observe: 'response' })
            .pipe(map((data) => {
                data.body.forEach(element => {
                    element.payDate = new Date(element.payDate)
                })
                return data
            }))
    }

    add(payment: PaymentPost): Observable<PaymentView> {
        return this.http.post<PaymentView>(this.url, payment)
    }

    update(payment: PaymentPost): Observable<PaymentView> {
        return this.http.put<PaymentView>(this.url + payment.id, payment)
    }

    delete(id: number): Observable<PaymentView> {
        return this.http.delete<PaymentView>(this.url + id)
    }
}