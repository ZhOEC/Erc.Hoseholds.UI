import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICity } from '../models/city.model';
import { IStreet } from '../models/street.model';
  
@Injectable()
export class AddressService {  

    constructor(private http: HttpClient) {}
  
    getCities(branchOfficeId: number): Observable<ICity[]> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('branchOfficeId', branchOfficeId.toString())
        return this.http
            .get<ICity[]>(environment.apiServer + "addresses/cities", { params: queryParams })
    }

    getStreets(cityId: number): Observable<IStreet[]> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('cityId', cityId.toString())
        return this.http
            .get<IStreet[]>(environment.apiServer + "addresses/streets", { params: queryParams })
    }
}