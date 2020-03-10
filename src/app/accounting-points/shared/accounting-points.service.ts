import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SelectedBranchOffice } from 'src/app/baranch-office/selected-branch-office';

@Injectable({
  providedIn: 'root'
})
export class AccountingPointsService {
  private apiUri = `${environment.apiServer}accountingpoints`;

  constructor(private http: HttpClient, private selectedBranchOffice: SelectedBranchOffice) { }

  search(searchString: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', searchString);
    if (this.selectedBranchOffice.id) {
      queryParams = queryParams.append('branchOfficeId', this.selectedBranchOffice.id.toString());
    }
    return this.http.get(this.apiUri, { params: queryParams })
  }
}
