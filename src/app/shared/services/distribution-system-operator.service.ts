import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DistributionSystemOperator } from '../models/distribution-system-operator.model';
import { environment } from '../../../environments/environment';
import { Commodity } from '../models/commodity';
  
@Injectable()
export class DistributionSystemOperatorService {  

    constructor(private http: HttpClient) {}
  
    getDistributionSystemOperators(commodity: Commodity): Observable<DistributionSystemOperator[]> {
      return this.http
        .get<DistributionSystemOperator[]>(environment.apiServer + "distribution-system-operators", {params:{commodity: commodity.toString()}});
    }
}