import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Person } from '../models/person.model'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
  
@Injectable()
export class PersonService {
    private url = `${environment.apiServer}people/`
    
    constructor(private http: HttpClient) {}

    searchPerson(searchString: string) {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('searchString', searchString)
        return this.http.get<Person[]>(`${environment.apiServer}people`, { params: queryParams })
    }

    getOne(id: number): Observable<Person> {
        return this.http.get<Person>(this.url + id)
            .pipe(map((data) => {
                data.idCardExpDate = new Date(data.idCardExpDate)
                data.idCardIssuanceDate = new Date(data.idCardIssuanceDate)
                return data
            }))
    }

    update(person: Person): Observable<Person> {
        return this.http.put<Person>(this.url + person.id, person)
    }
}