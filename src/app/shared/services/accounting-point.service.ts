import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountingPoint } from '../models/accounting-point.model';
import { of, Observable } from 'rxjs';
import { NewContract } from '../models/new-contract.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingPointService {
  private apiUri = `${environment.apiServer}accountingpoints/`;

  constructor(private http: HttpClient) { }

  search(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', searchString);
    return this.http.get(this.apiUri + '_search', { params: queryParams })
  }

  add(accountingPoint: AccountingPoint) {
    return this.http.post<AccountingPoint>(this.apiUri, accountingPoint)
  }

  update(accountingPoint: AccountingPoint): Observable<AccountingPoint> {
    return this.http.put<AccountingPoint>(this.apiUri + accountingPoint.id, accountingPoint)
  }

  openNewContract(accountingPointId: number, newContract: NewContract) {
    return this.http.post(`${this.apiUri}${accountingPointId}/open-new-contract`, { id: accountingPointId, contractStartDate: newContract.contractStartDate, 
      sendPaperBill: newContract.sendPaperBill, owner: newContract.owner })
  }

  closeExemption(accountingPointId: number, date: Date, note: string) {
    return this.http.post(`${this.apiUri}${accountingPointId}/closing-current-exemption`, { date: date, note: note });
  }
}
