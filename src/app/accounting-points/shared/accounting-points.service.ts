import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPerson } from './person';
import { IAccountingPoint } from './accounting-point';

@Injectable({
  providedIn: 'root'
})
export class AccountingPointsService {
  private apiUriPeople = `${environment.apiServer}people`;
  private apiUri = `${environment.apiServer}accountingpoints`;

  constructor(private http: HttpClient) { }

  searchPerson(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('searchString', searchString)
    return this.http.get<IPerson[]>(this.apiUriPeople, { params: queryParams })
  }

  search(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', searchString);
    return this.http.get(this.apiUri+'/_search', { params: queryParams })
  }

  add(accountingPoint: IAccountingPoint) {
    return this.http.post<IAccountingPoint>(this.apiUri, accountingPoint)
  }
}
