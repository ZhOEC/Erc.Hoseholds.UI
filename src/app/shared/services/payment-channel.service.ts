import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentChannel } from '../models/payments/payment-channel.model';

@Injectable()
export class PaymentChannelService {
    private url: string = environment.apiServer + 'paymentchannels/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaymentChannel[]> {
        return this.http.get<PaymentChannel[]>(this.url)
    }

    add(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.post<PaymentChannel>(this.url, paymentChannel)
    }

    update(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.put<PaymentChannel>(this.url + paymentChannel.id, paymentChannel)
    }

    delete(id: number): Observable<PaymentChannel> {
        return this.http.delete<PaymentChannel>(this.url + id)
    }
}