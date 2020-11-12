import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AccountingPointDetailService } from '../accounting-point-detail.service';

@Component({
  selector: 'app-accounting-point-payments',
  templateUrl: './accounting-point-payments.component.html',
  styleUrls: ['./accounting-point-payments.component.scss']
})
export class AccountingPointPaymentsComponent implements OnChanges {
  @Input() accountingPointId: number

  invoices = [];
  payments = [];
  loading = true;
  total = 30;
  pageIndex = 1;
  pageSize = 6

  constructor(private accountingPointDetailService: AccountingPointDetailService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.accountingPointId = changes['accountingPointId'].currentValue;
    if (!changes['accountingPointId'].isFirstChange())
    {
      this.LoadPayments();
    }
  }

  LoadPayments() {
    this.accountingPointDetailService.getPayments(this.accountingPointId, this.pageIndex, this.pageSize)
    .subscribe(data => {
      this.payments = data.items;
      this.loading = false;
      this.total = data.totalCount;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
    this.LoadPayments();
  }
}