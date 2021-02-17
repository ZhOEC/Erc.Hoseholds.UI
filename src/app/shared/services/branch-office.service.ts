import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BranchOffice } from '../models/branch-office.model'
import { environment } from 'src/environments/environment';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Period } from '../models/period.model';

@Injectable()
export class BranchOfficeService {

  public branchOffices$: BehaviorSubject<BranchOffice[]> = new BehaviorSubject<BranchOffice[]>(null);

  constructor(private http: HttpClient) {
    this.getBranchOfficesInternal().subscribe(res => this.branchOffices$.next(res));
  }

  openNewPeriod(id: number) {
    return this.http
      .post(`${environment.apiServer}branch-offices/${id}/periods`, {})
      .pipe(
        switchMap(() => this.getBranchOfficesInternal()),
        tap(res => this.branchOffices$.next(res))
      );
  }

  refreshBranchOffices = () => this.getBranchOfficesInternal().subscribe(res => this.branchOffices$.next(res));

  getBranchOffices = () => this.branchOffices$.pipe(
      filter(bo => bo != null)
  )

  getPeriods(id: number): Observable<Period[]> {
    return this.http.get<Period[]>(`${environment.apiServer}branch-offices/${id}/periods`)
  }

  private getBranchOfficesInternal = () =>
    this.http.get<BranchOffice[]>(environment.apiServer + "branch-offices")

  getOne(id: number): Observable<BranchOffice> {
    return this.http.get<BranchOffice>(`${environment.apiServer}branch-offices/${id}`)
  }

  update(branchOffice: BranchOffice): Observable<BranchOffice> {
    return this.http.put<BranchOffice>(`${environment.apiServer}branch-offices/${branchOffice.id}`, branchOffice)
  }
}