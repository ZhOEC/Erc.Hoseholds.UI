import { Component, OnInit } from '@angular/core';
import { BranchOfficeService } from 'src/app/shared/services/branch-office.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BranchOffice } from 'src/app/shared/models/branch-office';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { of } from 'rxjs/internal/observable/of';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-branch-office-periods',
  templateUrl: './branch-office-periods.component.html',
  styleUrls: ['./branch-office-periods.component.scss']
})
export class BranchOfficePeriodsComponent implements OnInit {

  branchOffices$: BehaviorSubject<BranchOffice[]>
  openPeriodDlg?: NzModalRef;

  constructor(private modalService: NzModalService, private branchOfficeService: BranchOfficeService,
    private notification: NotificationComponent) { }

  ngOnInit(): void {
    this.branchOffices$ = this.branchOfficeService.branchOffices$
  }

  newPeriodConfirm(branchOfficeId: number): void {
    const branchOffice = this.branchOffices$.value.find(b => b.id == branchOfficeId);
    this.openPeriodDlg = this.modalService.confirm({
      nzTitle: `${branchOffice.name}. Перехід на наступний період`,
      nzContent: `Ви впевнені, що хочете закрити ${branchOffice.currentPeriodName} та перейти на наступний період?`,
      nzOkText: 'Так, звісно!',
      nzCancelText: 'Ні, я ще почекаю.',
      nzOnOk: () => this.branchOfficeService.openNewPeriod(branchOfficeId).pipe(
        catchError(err => {
          this.notification.show('error', 'Помилка', `Не вдалося перевести ${branchOffice.name} на новий період!\n ${err.message}`, 15000)
          return throwError(err);
        }),
        tap(() => this.notification.show('success', 'Успіх', `${branchOffice.name} успішно переведено на новий період!`, 5000)),
      ).toPromise()
    });
  }
}
