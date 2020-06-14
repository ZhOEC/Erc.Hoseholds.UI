import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AccountingPointDetail } from '../accounting-point-detail.model';
import { Observable } from 'rxjs';
import { AccountingPointDetailService } from '../accounting-point-detail.service';

@Component({
  selector: 'app-accounting-point-detail',
  templateUrl: './accounting-point-detail.component.html',
  styleUrls: ['./accounting-point-detail.component.scss']
})
export class AccountingPointDetailComponent implements OnInit {

  accountingPoint$: Observable<AccountingPointDetail>

  constructor(private accointinPointdetailService: AccountingPointDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountingPoint$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.accointinPointdetailService.getOne(+params.get('id')))
    );
  }
}
