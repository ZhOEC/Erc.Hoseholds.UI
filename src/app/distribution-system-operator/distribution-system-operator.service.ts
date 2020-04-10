import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DistributionSystemOperator } from './distribution-system-operator';
import { environment } from '../../environments/environment';
  
@Injectable()
export class DistributionSystemOperatorService {  

    constructor(private http: HttpClient) {}
  
    getDistributionSystemOperators(): Observable<DistributionSystemOperator[]> {
      return this.http
        .get<DistributionSystemOperator[]>(environment.apiServer + "distribution-system-operators");
    }
}