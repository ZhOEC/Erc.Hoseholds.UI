import { Component, OnInit } from '@angular/core'
import { BranchOffice } from 'src/app/shared/models/branch-office.model'
import { TaxInvoice } from 'src/app/shared/models/tax-invoices/tax-invoice'
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service'
import { TaxInvoiceService } from 'src/app/shared/services/tax-invoices.service'
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-tax-invoice-list',
  templateUrl: './tax-invoice-list.component.html',
  styleUrls: ['./tax-invoice-list.component.scss']
})
export class TaxInvoiceListComponent implements OnInit {
  dateFormat = 'dd.MM.yyyy'
   
  totalCount: number
  pageNumber = 1
  pageSize = 10
  isLoading = false

  branchOfficesList: BranchOffice[]
  selectedBranchOffice: BranchOffice
  taxInvoicesList: TaxInvoice[]

  constructor(
    private branchOfficeService: BranchOfficeService,
    private taxInvoiceService: TaxInvoiceService) { }

  ngOnInit() {
    this.getBranchOffices()
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(offices => {      
      offices.length == 1 ? this.selectedBranchOffice = offices[0] : this.branchOfficesList = offices
    })
  }

  getTaxInvoices(branchOffice: BranchOffice, pageNumber: number, pageSize: number) {
    this.isLoading = true
    this.taxInvoiceService.getPart(branchOffice.id, pageNumber, pageSize)
      .subscribe(
        response => {
          this.totalCount = Number(response.headers.get('X-Total-Count'))
          this.taxInvoicesList = <TaxInvoice[]>response.body
          this.isLoading = false
        })
  }

  onChangeBranchOffice(branchOffice: BranchOffice) {
    this.isLoading = true
    this.getTaxInvoices(branchOffice, this.pageNumber, this.pageSize)
  }

  pageIndexChange(pageIndex: number) {
    this.pageNumber = pageIndex
    this.getTaxInvoices(this.selectedBranchOffice, this.pageNumber, this.pageSize)
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.getTaxInvoices(this.selectedBranchOffice, this.pageNumber, this.pageSize)
  }

  downloadInvoice(taxInvoiceId: number) {
    this.taxInvoiceService.downloadInvoice(taxInvoiceId)
      .subscribe(
        file => {
          FileSaver(file, `${taxInvoiceId}.xml`)
      })
  }
}
