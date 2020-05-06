import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentBatchPost } from '../models/payments/payment-batch-post.model';
import { PaymentBatchView } from '../models/payments/payment-batch-view.model';

@Injectable()
export class PaymentBatchService {
    private urn: string = environment.apiServer + 'paymentbatch/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaymentBatchView[]> {
        return this.http.get<PaymentBatchView[]>(this.urn)
    }

    add(paymentBatch: FormData): Observable<PaymentBatchPost> {
        return this.http.post<PaymentBatchPost>(this.urn, paymentBatch)
    }
}