import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AccountingPointService } from 'src/app/shared/services/accounting-point.service';

@Component({
  selector: 'app-close-exemption',
  templateUrl: './close-exemption.component.html',
  styleUrls: ['./close-exemption.component.scss']
})
export class CloseExemptionComponent implements OnInit {
  @Input() accountingPointId: number;
  date: Date;
  note: string;
  isProcessing = false;

  constructor(private modal: NzModalRef, private accountingPointsService: AccountingPointService) { }

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm() {
    this.isProcessing = true;
    this.accountingPointsService.closeExemption(this.accountingPointId, this.date, this.note)
      .subscribe(() => {
        this.isProcessing = false;
        this.modal.destroy(true);
      });
  }

  ngOnInit(): void {
  }

}
