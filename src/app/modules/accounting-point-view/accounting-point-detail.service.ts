import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InvoiceList } from './invoice-list';
import { map, catchError } from 'rxjs/operators';
import { Invoice } from './invoice';
import { AccountingPointDetail } from './accounting-point-detail.model';
import { Observable, of } from 'rxjs';
import { privateEncrypt } from 'crypto';

@Injectable({
  providedIn: 'root'
})

export class AccountingPointDetailService {
  private invoicesUri = `${environment.apiServer}invoices/`
  private paymentsUri = `${environment.apiServer}payments/`
  private accountingpointsUri = `${environment.apiServer}accountingpoints/`

  constructor(private http: HttpClient) { }

  getOne(id: string) {
    return this.http.get<AccountingPointDetail>(this.accountingpointsUri + id)
      .pipe(
        catchError(this.handleError<AccountingPointDetail>('getOne'))
      );
  }

  getPayments(accountingPointId: number, pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .append('accountingPointId', accountingPointId.toString())
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return this.http
      .get<Invoice[]>(this.paymentsUri, { params: params, observe: 'response' })
      .pipe(map(response => <InvoiceList>{
          items: response.body,
          totalCount: Number(response.headers.get('X-Total-Count'))
      }));
  }

  getInvoices(accountingPointId: number, pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .append('accountingPointId', accountingPointId.toString())
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return this.http
      .get<Invoice[]>(this.invoicesUri, { params: params, observe: 'response' })
      .pipe(map(response => {
        response.body.forEach((inv: any) => {
          inv.zoneUsages = [];
          inv.zoneUsages.push(inv.usageT1);
          if (inv.usageT2) {
            inv.zoneUsages.push(inv.usageT2);
            if (!inv.usageT3) {
              inv.zoneUsages[0].name = 'Ніч';
              inv.zoneUsages[1].name = 'День';
            }
          }
          if (inv.usageT3) {
            inv.zoneUsages.push(inv.usageT3);
            inv.zoneUsages[0].name = 'Ніч';
            inv.zoneUsages[1].name = 'Напівпік';
            inv.zoneUsages[2].name = 'Пік';
          }
          inv.isExpand = false;
          inv.zoneUsages.forEach((element: { priceValue: any; calculations: { priceValue: any; }[]; }) => {
            element.priceValue = element.calculations[0].priceValue;
          });
          inv.billUri = `${environment.apiServer}bills/${inv.id}`;
        });
        return {
          items: response.body,
          totalCount: Number(response.headers.get('X-Total-Count'))
        } as InvoiceList
      }));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
