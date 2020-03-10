import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchOffice } from '../../baranch-office/branch-office';
import { TariffsService } from '../../tariffs/shared/tariffs.service';
import { Tariff } from '../../tariffs/shared/tariff';
import { BranchOfficeService } from 'src/app/baranch-office/branch-office.service';
import { AccountingPoint } from './shared/accounting-point'

@Component({
  selector: 'app-accounting-point-new',
  templateUrl: './accounting-point-new.component.html',
  styleUrls: ['./accounting-point-new.component.scss']
})
export class AccountingPointNewComponent {
  accountingPointForm: FormGroup;
  accountingPoint: AccountingPoint;
  
  distributionSystemOperatorsList: BranchOffice[];
  tariffsList: Tariff[];

  //selectedDistributionSystemOperator: string;
  //selectedTariff: string;
  //city: string;

  constructor(private apiBranchOffice: BranchOfficeService,
    private apiTariffsService: TariffsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      /*name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      selectedDistributionSystemOperator: [null, [Validators.required]],
      selectedTariff: [null, [Validators.required]]*/
    });

    this.getDistributionSystemOperators();
    this.getTariffs();
  }

  getDistributionSystemOperators() {
    this.apiBranchOffice.getBranchOffices().subscribe(operators => {
      this.distributionSystemOperatorsList = operators
    });
  }

  getTariffs() {
    this.apiTariffsService.getTariffList().subscribe(tariffs => {
      this.tariffsList = tariffs;
    });
  }

  submitForm() {
    console.log(this.accountingPoint)
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty();
      this.accountingPointForm.controls[i].updateValueAndValidity();
    }
  }
}
