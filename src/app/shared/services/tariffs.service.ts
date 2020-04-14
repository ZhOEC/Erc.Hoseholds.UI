import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tariff } from '../models/tariff';
import { TariffRate } from '../models/tariff-rate';

@Injectable({
  providedIn: 'root'
})
export class TariffsService {

  private apiUri = `${environment.apiServer}tariffs`;

  constructor(private http: HttpClient) { }

  getTariffList() {
    return this.http
      .get<Tariff[]>(this.apiUri).pipe(map((data) => {
        data.forEach(t => {
          t.rates.forEach(r => {
            r.startDate = new Date(r.startDate);
            if (r.heatingEndDay) {
              r.heatingEndDay = new Date(r.heatingEndDay);
            }
            if (r.heatingStartDay) {
              r.heatingStartDay = new Date(r.heatingStartDay);
            }

          })
        });
        return data;
      }));
  }

  updateTariff(tariff: Tariff) {
    return this.http
      .put<Tariff>(`${this.apiUri}/${tariff.id}`, tariff);
  }

  addTariff(tariff: Tariff) {
    return this.http
      .post<Tariff>(this.apiUri, tariff);
  }

  addTariffRate(tariffId, tariffRate: TariffRate) {
    tariffRate.tariffId = tariffId;
    return this.http
      .post<TariffRate>(`${this.apiUri}/${tariffId}/rates`, tariffRate);
  }

  updateTariffRate(tariffId, tariffRate: TariffRate) {
    tariffRate.tariffId = tariffId;
    return this.http
      .put<TariffRate>(`${this.apiUri}/${tariffId}/rates/${tariffRate.id}`, tariffRate);
  }

  deleteTariffRate(tariffId: number, rateId: number) {
    return this.http
      .delete(`${this.apiUri}/${tariffId}/rates/${rateId}`);
  }

}
