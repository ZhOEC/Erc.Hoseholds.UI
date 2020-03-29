import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistributionSystemOperatorService } from '../../distribution-system-operator/distribution-system-operator.service';
import { DistributionSystemOperator } from '../../distribution-system-operator/distribution-system-operator';
import { TariffsService } from '../../tariffs/shared/tariffs.service';
import { Tariff } from '../../tariffs/shared/tariff';
import { BranchOfficeService } from '../../baranch-office/branch-office.service';
import { BranchOffice } from '../../baranch-office/branch-office';
import { AccountingPointsService } from '../shared/accounting-points.service'
import { Person } from '../shared/person';
import { AccountingPoint } from '../shared/accounting-point';

@Component({
  selector: 'app-accounting-point-new',
  templateUrl: './accounting-point-new.component.html',
  styleUrls: ['./accounting-point-new.component.scss']
})

export class AccountingPointNewComponent {
  dateFormat = 'dd.MM.yyyy'
  accountingPointForm: FormGroup
  
  accountingPoint: AccountingPoint
  branchOfficesList: BranchOffice[]
  distributionSystemOperatorsList: DistributionSystemOperator[]
  tariffsList: Tariff[]

  findPersons: Person[]
  personInputsShown: boolean

  constructor(private apiAccountingPoint: AccountingPointsService,
    private apiDistributionSystemOperator: DistributionSystemOperatorService,
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
      apartmentNumber: [null],

      searchPerson: [null, [Validators.required]],
      taxCode: [{value: null, disabled: true}, [Validators.required]],
      idCardNumber: [{value: null}, [Validators.required]],
      idCardIssueDate: [{value: null, disabled: true}, [Validators.required]],
      idCardExpirationDate: [{value: null, disabled: true}, [Validators.required]],
      personName: [{value: null, disabled: true}, [Validators.required]],
      personSurname: [{value: null, disabled: true}, [Validators.required]],
      personPatronymic: [{value: null, disabled: true}, [Validators.required]],
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
      this.tariffsList = tariffs
    });
  }

  search(searchString: string): void {
    if(searchString.length > 6) {
      this.apiAccountingPoint.search(searchString).subscribe(person => {
        this.findPersons = person
      })
    }
  }

  setDataPerson(selectedPerson: Person) {
    this.personInputsShown = true
    if(selectedPerson != null) {
      this.accountingPointForm.get('taxCode').setValue(selectedPerson.taxCode)
      this.accountingPointForm.get('idCardNumber').setValue(selectedPerson.idCardNumber)
      this.accountingPointForm.get('idCardIssueDate').setValue(selectedPerson.idCardExpDate) // Need change to right value in prod
      this.accountingPointForm.get('idCardExpirationDate').setValue(selectedPerson.idCardExpDate)
      this.accountingPointForm.get('personName').setValue(selectedPerson.firstName)
      this.accountingPointForm.get('personSurname').setValue(selectedPerson.lastName)
      this.accountingPointForm.get('personPatronymic').setValue(selectedPerson.patronymic)

      this.accountingPointForm.get('taxCode').disable()
      this.accountingPointForm.get('idCardIssueDate').disable()
      this.accountingPointForm.get('idCardExpirationDate').disable()
      this.accountingPointForm.get('personName').disable()
      this.accountingPointForm.get('personSurname').disable()
      this.accountingPointForm.get('personPatronymic').disable()
    }
  }

  personInputsTrigger() {
    this.personInputsShown = true

    this.accountingPointForm.enable()
    this.accountingPointForm.get('searchPerson').reset()
    this.accountingPointForm.get('taxCode').reset()
    this.accountingPointForm.get('idCardNumber').reset()
    this.accountingPointForm.get('idCardIssueDate').reset()
    this.accountingPointForm.get('idCardExpirationDate').reset()
    this.accountingPointForm.get('personName').reset()
    this.accountingPointForm.get('personSurname').reset()
    this.accountingPointForm.get('personPatronymic').reset()
  }

  submitForm() {
    for (const i in this.accountingPointForm.controls) {
      if(this.personInputsShown) {
        this.accountingPointForm.get('searchPerson').clearValidators()
      }
      this.accountingPointForm.controls[i].markAsDirty()
      this.accountingPointForm.controls[i].updateValueAndValidity()
    }

    console.log(this.accountingPoint)
    if(this.accountingPointForm.valid) {
      /* let controls = this.accountingPointForm.controls
      
      accountingPoint.branchOfficeId = controls.branchOfficeId.value
      accountingPoint.name = controls.name.value
      accountingPoint.distributionSystemOperatorId = controls.distributionSystemOperatorId.value
      accountingPoint.tarrifId = controls.tarrifId.value
      accountingPoint.city = controls.city.value
      accountingPoint.street = controls.street.value
      accountingPoint.building = controls.building.value
      accountingPoint.appartament = controls.appartament.value
      accountingPoint.person.firstName = controls. */

      this.apiAccountingPoint.add(this.accountingPoint)
    }
  }

  resetForm() {
    this.accountingPointForm.reset();
    this.personInputsShown = false
  }
}
