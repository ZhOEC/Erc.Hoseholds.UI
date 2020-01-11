import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOffice } from './branch-office';
import { environment } from 'src/environments/environment';
  
@Injectable()
export class BranchOfficeService {  

    constructor(private http: HttpClient) {}
  
    getBranchOffices(): Observable<BranchOffice[]> {
      return this.http
        .get<BranchOffice[]>(environment.apiServer + "branch-offices");
    }
}