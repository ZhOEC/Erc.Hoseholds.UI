import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAccountingPoint } from '../models/accounting-point.model';
import { AccountingPointDetail } from '../models/accounting-point-detail.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingPointsService {
  private apiUri = `${environment.apiServer}accountingpoints/`;

  constructor(private http: HttpClient) { }

  search(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', searchString);
    return this.http.get(this.apiUri+'_search', { params: queryParams })
  }

  add(accountingPoint: IAccountingPoint) {
    return this.http.post<IAccountingPoint>(this.apiUri, accountingPoint)
  }

  getOne(id: number){
    return this.http.get<AccountingPointDetail>(this.apiUri+id);
  }

}
