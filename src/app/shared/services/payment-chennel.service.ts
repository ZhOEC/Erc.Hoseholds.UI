import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentChannel } from '../models/payment-channel';
  
@Injectable()
export class PaymentChannelService {
    constructor(private http: HttpClient) {}
  
    getAll(): Observable<PaymentChannel[]> {
        return this.http.get<PaymentChannel[]>(`${environment.apiServer}paymentchannel`)
    }

    add(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.post<PaymentChannel>(`${environment.apiServer}paymentchannel`, paymentChannel)
    }

    update(paymentChannel: PaymentChannel): Observable<PaymentChannel> {
        return this.http.put<PaymentChannel>(`${environment.apiServer}paymentchannel/${paymentChannel.id}`, paymentChannel)
    }

    delete(id: number): Observable<PaymentChannel> {
        return this.http.delete<PaymentChannel>(`${environment.apiServer}paymentchannel/${id}`)
    }
}