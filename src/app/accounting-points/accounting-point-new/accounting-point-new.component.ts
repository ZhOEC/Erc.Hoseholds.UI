import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistributionSystemOperatorService } from '../../distribution-system-operator/distribution-system-operator.service';
import { DistributionSystemOperator } from '../../distribution-system-operator/distribution-system-operator';
import { TariffsService } from '../../tariffs/shared/tariffs.service';
import { Tariff } from '../../tariffs/shared/tariff';
import { BranchOfficeService } from '../../baranch-office/branch-office.service';
import { BranchOffice } from '../../baranch-office/branch-office';
import { AccountingPoint } from './shared/accounting-point'

@Component({
  selector: 'app-accounting-point-new',
  templateUrl: './accounting-point-new.component.html',
  styleUrls: ['./accounting-point-new.component.scss']
})

export class AccountingPointNewComponent {
  accountingPointForm: FormGroup;
  accountingPoint: AccountingPoint;
  
  branchOfficesList: BranchOffice[];
  distributionSystemOperatorsList: DistributionSystemOperator[];
  tariffsList: Tariff[];

  constructor(private apiDistributionSystemOperator: DistributionSystemOperatorService,
    private apiBranchOffice: BranchOfficeService,
    private apiTariffsService: TariffsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      branchOffice: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      distributionSystemOperator: [null, [Validators.required]],
      tariff: [null, [Validators.required]],
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      buildingNumber: [null, [Validators.required]],
      apartmentNumber: [null]
    });

    this.getBranchOffices();
    this.getDistributionSystemOperators();
    this.getTariffs();
  }

  getBranchOffices() {
    this.apiBranchOffice.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.branchOfficesList.length == 1) {
        this.accountingPointForm.get('branchOffice').setValue(this.branchOfficesList[0].id);
      }
    });
  }

  getDistributionSystemOperators() {
    this.apiDistributionSystemOperator.getDistributionSystemOperators().subscribe(data => {
      this.distributionSystemOperatorsList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.distributionSystemOperatorsList.length == 1) {
        this.accountingPointForm.get('distributionSystemOperator').setValue(this.distributionSystemOperatorsList[0].id);
      }
    });
  }

  getTariffs() {
    this.apiTariffsService.getTariffList().subscribe(tariffs => {
      this.tariffsList = tariffs;
    });
  }

  submitForm() {
    console.log(this.accountingPointForm)
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty();
      this.accountingPointForm.controls[i].updateValueAndValidity();
    }
  }
}
