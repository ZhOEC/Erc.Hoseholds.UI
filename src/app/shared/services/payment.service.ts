import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { PaymentView } from '../models/payments/payment-view.model'
import { PaymentPost } from '../models/payments/payment-post.model'

@Injectable()
export class PaymentService {
    private urn = environment.apiServer + 'payments/'
    
    constructor(private http: HttpClient) {}

    getPart(paymentsBatchId: number, pageNumber: number, pageSize: number, showProcessed: boolean) {
        let queryParams = new HttpParams()
            .append('paymentsBatchId', paymentsBatchId.toString())
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
            .append('showProcessed', showProcessed.toString())
        return this.http.get(this.urn, { params: queryParams, observe: 'response' })
    }

    add(payment: PaymentPost): Observable<PaymentView> {
        return this.http.post<PaymentView>(this.urn, payment)
    }

    update(payment: PaymentPost): Observable<PaymentView> {
        return this.http.put<PaymentView>(this.urn + payment.id, payment)
    }

    delete(id: number): Observable<PaymentView> {
        return this.http.delete<PaymentView>(this.urn + id)
    }
}