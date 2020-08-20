import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { AccountingPointDetail } from '../accounting-point-detail.model'
import { Observable } from 'rxjs'
import { AccountingPointDetailService } from '../accounting-point-detail.service'
import { NzModalService } from 'ng-zorro-antd/modal'
import { CloseExemptionComponent } from '../../accounting-point/close-exemption/close-exemption.component'
import { AccountingPointInvoicesComponent } from '../accounting-point-invoices/accounting-point-invoices.component'

@Component({
  selector: 'app-accounting-point-detail',
  templateUrl: './accounting-point-detail.component.html',
  styleUrls: ['./accounting-point-detail.component.scss']
})
export class AccountingPointDetailComponent implements OnInit {
  @ViewChild(AccountingPointInvoicesComponent, { static: false }) invoicesComponent: AccountingPointInvoicesComponent;
  accountingPointDetail: AccountingPointDetail = null;
  accountingPoint$: Observable<AccountingPointDetail>
  accountingPointId: number

  constructor(private accountingPointDetailService: AccountingPointDetailService, private route: ActivatedRoute, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>this.accountingPointDetailService.getOne(+params.get('id')))
      ).subscribe(a => this.accountingPointDetail = a);
  }

  private reloadAccountingPointDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountingPointDetailService.getOne(id).subscribe(a => this.accountingPointDetail = a);
  }

  showCloseExemptionDialog(name: string) {
    const closeExemptionDialog = this.modalService.create({
      nzTitle: `Закриття пільги ${name}`,
      nzContent: CloseExemptionComponent,
      nzComponentParams: {
        accountingPointId: this.accountingPointDetail.id
      }
    });

    closeExemptionDialog.afterClose
      .subscribe((result: boolean) => {
        if (result) {
          this.reloadAccountingPointDetail();
          this.invoicesComponent.LoadInvoices();
        }
      });
  }
}
