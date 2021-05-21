import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Report } from 'src/app/modules/common-references/reports/report'
  
@Injectable()
export class ReportService {  
    constructor(private http: HttpClient) {}

    getReport(reportParams: Report): Observable<Blob> {
        var queryParams = new HttpParams()
            .append('branch_office_id', reportParams.branchOfficeId.toString())
            .append('period_id', reportParams.periodId.toString())
            .appendAll({ ['dso_ids']: reportParams.dsoIds })

        return this.http
            .get(`${environment.apiServer}reports/` + reportParams.slug, { params: queryParams, responseType: 'blob' })
    }
}