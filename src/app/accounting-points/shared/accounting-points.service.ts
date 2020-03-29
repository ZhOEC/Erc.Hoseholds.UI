import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from './person';
import { AccountingPoint } from './accounting-point';

@Injectable({
  providedIn: 'root'
})
export class AccountingPointsService {
  private apiUriPeople = `${environment.apiServer}people`;
  private apiUriAccountingPoint = `${environment.apiServer}add-accounting-point`;

  constructor(private http: HttpClient) { }

  search(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('searchString', searchString)
    return this.http.get<Person[]>(this.apiUriPeople, { params: queryParams })
  }

  add(accountingPoint: AccountingPoint) {
    return this.http.post<AccountingPoint>(this.apiUriAccountingPoint, { params: accountingPoint })
  }
}
