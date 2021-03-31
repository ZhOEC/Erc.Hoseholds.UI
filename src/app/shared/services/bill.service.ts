import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PrintBillsRequest } from '../models/print-bills-request'

@Injectable()
export class BillService {  
    constructor(private http: HttpClient) {}

    getBillById(commodity: number, id: number): Observable<Blob> {
        return this.http.get(`${environment.apiServer}bills/${commodity}/${id}`, { responseType: 'blob' })
    }

    getBillsByPeriod(printBillsRequest: PrintBillsRequest): Observable<Blob> {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('file_type', printBillsRequest.fileType.toString())
        queryParams = queryParams.append('branch_office_id', printBillsRequest.branchOfficeId.toString())
        queryParams = queryParams.append('commodity', printBillsRequest.commodity.toString())
        queryParams = queryParams.append('period_id', printBillsRequest.periodId.toString())
        return this.http.get(`${environment.apiServer}bills`, { params: queryParams, responseType: 'blob' })
    }
}