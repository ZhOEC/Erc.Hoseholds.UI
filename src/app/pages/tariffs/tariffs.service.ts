import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tariff } from './tariff';

@Injectable({
  providedIn: 'root'
})
export class TariffsService {

  private api = {
    get: `${environment.apiServer}tariffs`,
    update: `${environment.apiServer}tariffs/`,
    add: `${environment.apiServer}tariffs`,
  };

  constructor(private http: HttpClient) { }

  getTariffs() {
    return this.http
      .get<Tariff[]>(this.api.get);
  }

  updateTariff(tariff: Tariff) {
    return this.http
      .put<Tariff>(this.api.update + tariff.id, tariff);
  }
}
