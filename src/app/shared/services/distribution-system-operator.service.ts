import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DistributionSystemOperator } from '../models/distribution-system-operator.model';
import { environment } from '../../../environments/environment';
  
@Injectable()
export class DistributionSystemOperatorService {  

    constructor(private http: HttpClient) {}
  
    getDistributionSystemOperators(): Observable<DistributionSystemOperator[]> {
      return this.http
        .get<DistributionSystemOperator[]>(environment.apiServer + "distribution-system-operators");
    }
}