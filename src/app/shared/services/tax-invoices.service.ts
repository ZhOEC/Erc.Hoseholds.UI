import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { TaxInvoice } from '../models/tax-invoices/tax-invoice'
import { map } from 'rxjs/operators'

@Injectable()
export class TaxInvoiceService {
    private url: string = environment.apiServer + 'taxinvoices/'
    
    constructor(private http: HttpClient) { }

    getPart(branchOfficeId: number, pageNumber: number, pageSize: number) {
        let queryParams = new HttpParams()
            .append('branchOfficeId', branchOfficeId.toString())
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
        return this.http
            .get<TaxInvoice[]>(this.url, { params: queryParams, observe: 'response' })
            .pipe(map(response => {
                response.body.forEach((taxInvoice: TaxInvoice) => {
                    taxInvoice.isExpand = false
                })
                return response
            }))
    }

    getByPeriod(branchOfficeId: number, periodId: number) {
        return this.http.get<TaxInvoice[]>(`${this.url}${branchOfficeId}/${periodId}`)
    }

    export(id: number) {
        return this.http.get(`${this.url}${id}/export`, { responseType: 'blob' })
    }

    create(taxInvoice: TaxInvoice) {
        return this.http.post(`${this.url}create`, taxInvoice)
    }

    delete(id: number){
        return this.http.delete(this.url + id)
    }
}