import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BranchOffice } from '../models/branch-office.model';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class BranchOfficeService {

  public branchOffices$: BehaviorSubject<BranchOffice[]> = new BehaviorSubject<BranchOffice[]>(null);

  constructor(private http: HttpClient) {
    this.http
      .get<BranchOffice[]>(environment.apiServer + "branch-offices").subscribe(res => this.branchOffices$.next(res));
  }

  openNewPeriod(id: number) {
    return this.http
      .post(`${environment.apiServer}branch-offices/${id}/periods`, {})
      .pipe(
        switchMap(res => this.http
          .get<BranchOffice[]>(environment.apiServer + "branch-offices")),
        tap(res => this.branchOffices$.next(res))
      )
  }

  refreshBranchOffices = () => this.http
    .get<BranchOffice[]>(environment.apiServer + "branch-offices").subscribe(res => this.branchOffices$.next(res));

  getBranchOffices() {
    return this.branchOffices$;
  }
}