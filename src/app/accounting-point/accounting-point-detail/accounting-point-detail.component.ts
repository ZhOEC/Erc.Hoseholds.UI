import { Component, OnInit } from '@angular/core';
import { AccountingPointsService } from '../../shared/services/accounting-points.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AccountingPointDetail } from '../../shared/models/accounting-point-detail.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accounting-point-detail',
  templateUrl: './accounting-point-detail.component.html',
  styleUrls: ['./accounting-point-detail.component.scss']
})
export class AccountingPointDetailComponent implements OnInit {

  accountingPoint$: Observable<AccountingPointDetail>

  constructor(private accointinPointService: AccountingPointsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('AccountingPointDetailComponent oninit');
    
    this.accountingPoint$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.accointinPointService.getOne(+params.get('id')))
    );
  }
}
