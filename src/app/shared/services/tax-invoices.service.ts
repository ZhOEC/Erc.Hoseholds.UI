import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class TaxInvoiceService {
    private url: string = environment.apiServer + 'taxinvoices/';
    
    constructor(private http: HttpClient) { }

    getPart(branchOfficeId: number, pageNumber: number, pageSize: number) {
        let queryParams = new HttpParams()
            .append('branchOfficeId', branchOfficeId.toString())
            .append('pageNumber', pageNumber.toString())
            .append('pageSize', pageSize.toString())
        return this.http.get(this.url, { params: queryParams, observe: 'response' })
    }

    downloadInvoice(id: number) {
        return this.http.get(`${this.url}${id}/download`, { responseType: 'blob' })
    }
}