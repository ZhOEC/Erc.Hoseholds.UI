import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Company } from '../models/company.moldel'
import { Observable } from 'rxjs'

@Injectable()
export class CompanyService {
  private url = `${environment.apiServer}company/`
    
    constructor(private http: HttpClient) {}

    getOne(id: number): Observable<Company> {
        return this.http.get<Company>(this.url + id)
    }

    update(company: Company): Observable<Company> {
        return this.http.put<Company>(this.url + company.id, company)
    }
}