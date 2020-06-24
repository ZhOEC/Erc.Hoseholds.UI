import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExemptionCategory } from '../models/exemption-category';

@Injectable({
  providedIn: 'root'
})
export class ExemptionCategoryService {

  private apiUri = `${environment.apiServer}exemptioncategories/`;

  constructor(private http: HttpClient) { }

  getList() {
    return this.http
      .get<ExemptionCategory[]>(this.apiUri);
  }

  update(exemptionCategory: ExemptionCategory) {
    return this.http
      .put<ExemptionCategory>(`${this.apiUri}/${exemptionCategory.id}`, exemptionCategory);
  }

  addNew(exemptionCategory: ExemptionCategory) {
    return this.http
      .post<ExemptionCategory>(this.apiUri, exemptionCategory);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}
