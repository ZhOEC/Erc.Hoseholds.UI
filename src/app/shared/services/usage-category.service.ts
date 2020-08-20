import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { UsageCategory } from '../models/usage-category'

@Injectable()
export class UsageCategoryService {
  private apiUrn = `${environment.apiServer}usagecategories/`

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UsageCategory[]>(this.apiUrn)
  }
}
