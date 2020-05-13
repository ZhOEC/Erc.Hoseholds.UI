import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';
  
@Injectable()
export class PersonService {
    constructor(private http: HttpClient) {}

    searchPerson(searchString: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('searchString', searchString)
        return this.http.get<Person[]>(`${environment.apiServer}people`, { params: queryParams })
    }
}