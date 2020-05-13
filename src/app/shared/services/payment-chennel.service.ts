import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentChannel } from '../models/payment-channel';

@Injectable()
export class PaymentChannelService {
    private uri: string = environment.apiServer + 'paymentchannels/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<PaymentChannel[]> {
        return this.http.get<PaymentChannel[]>(this.uri)
    }

    add(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.post<PaymentChannel>(this.uri, paymentChannel)
    }

    update(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.put<PaymentChannel>(this.uri + paymentChannel.id, paymentChannel)
    }

    delete(id: number): Observable<PaymentChannel> {
        return this.http.delete<PaymentChannel>(this.uri + id)
    }
}