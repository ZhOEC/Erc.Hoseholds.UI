import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistributionSystemOperatorService } from '../../distribution-system-operator/distribution-system-operator.service';
import { DistributionSystemOperator } from '../../distribution-system-operator/distribution-system-operator';
import { TariffsService } from '../../tariffs/shared/tariffs.service';
import { Tariff } from '../../tariffs/shared/tariff';
import { BranchOfficeService } from '../../baranch-office/branch-office.service';
import { BranchOffice } from '../../baranch-office/branch-office';
import { AccountingPointsService } from '../shared/accounting-points.service'
import { IPerson } from '../shared/person';
import { ICity } from '../../address/shared/city';
import { IStreet } from '../../address/shared/street';
import { AddressService } from 'src/app/address/address.service';

@Component({
  selector: 'app-accounting-point-new',
  templateUrl: './accounting-point-new.component.html',
  styleUrls: ['./accounting-point-new.component.scss']
})

export class AccountingPointNewComponent {
  dateFormat = 'dd.MM.yyyy'
  accountingPointForm: FormGroup
  
  branchOfficesList: BranchOffice[]
  citiesList: ICity[]
  streetsList: IStreet[]
  distributionSystemOperatorsList: DistributionSystemOperator[]
  tariffsList: Tariff[]

  findPersons: IPerson[]
  isPersonInputsShown: boolean = false
  isLoadingSearch: boolean = false
  isLoadingCities: boolean = false
  isLoadingStreets: boolean = false

  constructor(private accountingPointService: AccountingPointsService,
    private distributionSystemOperatorService: DistributionSystemOperatorService,
    private branchOfficeService: BranchOfficeService,
    private addressService: AddressService,
    private tariffService: TariffsService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      branchOffice: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      distributionSystemOperator: [null, [Validators.required]],
      tariff: [null, [Validators.required]],
      city: [{value: null, disabled: true}, [Validators.required]],
      street: [{value: null, disabled: true}, [Validators.required]],
      buildingNumber: [null, [Validators.required]],
      apartmentNumber: [null],

      searchPerson: [null, [Validators.required]],
      person: this.formBuilder.group({
        taxCode: [{value: null, disabled: true}, [Validators.required]],
        idCardNumber: [{value: null}, [Validators.required]],
        idCardIssueDate: [{value: null, disabled: true}, [Validators.required]],
        idCardExpirationDate: [{value: null, disabled: true}, [Validators.required]],
        personName: [{value: null, disabled: true}, [Validators.required]],
        personSurname: [{value: null, disabled: true}, [Validators.required]],
        personPatronymic: [{value: null, disabled: true}, [Validators.required]]
      })
    });

    this.getBranchOffices();
    this.getDistributionSystemOperators();
    this.getTariffs();
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.branchOfficesList.length == 1) {
        this.accountingPointForm.get('branchOffice').setValue(this.branchOfficesList[0].id);
      }
    });
  }

  getCities(branchOfficeId: number) {
    this.accountingPointForm.controls.city.reset()
    if(branchOfficeId) {
      this.isLoadingCities = true
      this.addressService.getCities(branchOfficeId).subscribe(cities => {
        this.citiesList = cities
        this.accountingPointForm.controls.city.enable()
        this.isLoadingCities = false
      })
    }
  }

  getStreets(cityId: number) {
    this.accountingPointForm.controls.street.reset()
    if(cityId) {
      this.isLoadingStreets = true
      this.addressService.getStreets(cityId).subscribe(streets => {
        this.streetsList = streets
        this.accountingPointForm.controls.street.enable()
        this.isLoadingStreets = false
      })
    }
  }

  getDistributionSystemOperators() {
    this.distributionSystemOperatorService.getDistributionSystemOperators().subscribe(data => {
      this.distributionSystemOperatorsList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.distributionSystemOperatorsList.length == 1) {
        this.accountingPointForm.get('distributionSystemOperator').setValue(this.distributionSystemOperatorsList[0].id);
      }
    });
  }

  getTariffs() {
    this.tariffService.getTariffList().subscribe(tariffs => {
      this.tariffsList = tariffs
    });
  }

  searchPerson(searchString: string): void {
    if(searchString.length > 6) {
      this.isLoadingSearch = true
      this.accountingPointService.search(searchString).subscribe((persons:Array<IPerson>) => {
        this.findPersons = persons
        this.isLoadingSearch = false
      })
    }
  }

  setDataPerson(selectedPerson: IPerson) {
    this.isPersonInputsShown = true
    if(selectedPerson != null) {
      this.accountingPointForm.controls.person.patchValue({
        taxCode: selectedPerson.taxCode,
        idCardNumber: selectedPerson.idCardNumber,
        idCardIssueDate: selectedPerson.idCardExpDate, // Need change to right value in prod
        idCardExpirationDate: selectedPerson.idCardExpDate,
        personName: selectedPerson.firstName,
        personSurname: selectedPerson.lastName,
        personPatronymic: selectedPerson.patronymic
      })

      this.accountingPointForm.controls.person.get('taxCode').disable()
      this.accountingPointForm.controls.person.get('idCardIssueDate').disable()
      this.accountingPointForm.controls.person.get('idCardExpirationDate').disable()
      this.accountingPointForm.controls.person.get('personName').disable()
      this.accountingPointForm.controls.person.get('personSurname').disable()
      this.accountingPointForm.controls.person.get('personPatronymic').disable()
    }
  }

  personInputsTrigger() {
    this.isPersonInputsShown = true

    this.accountingPointForm.controls.person.get('taxCode').enable()
    this.accountingPointForm.controls.person.get('idCardIssueDate').enable()
    this.accountingPointForm.controls.person.get('idCardExpirationDate').enable()
    this.accountingPointForm.controls.person.get('personName').enable()
    this.accountingPointForm.controls.person.get('personSurname').enable()
    this.accountingPointForm.controls.person.get('personPatronymic').enable()

    this.accountingPointForm.controls.searchPerson.reset()
    this.accountingPointForm.controls.person.get('taxCode').reset()
    this.accountingPointForm.controls.person.get('idCardNumber').reset()
    this.accountingPointForm.controls.person.get('idCardIssueDate').reset()
    this.accountingPointForm.controls.person.get('idCardExpirationDate').reset()
    this.accountingPointForm.controls.person.get('personName').reset()
    this.accountingPointForm.controls.person.get('personSurname').reset()
    this.accountingPointForm.controls.person.get('personPatronymic').reset()
  }

  submitForm() {
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty()
      this.accountingPointForm.controls[i].updateValueAndValidity()
    }
    
    if(this.isPersonInputsShown) {
      this.accountingPointForm.get('searchPerson').setErrors(null)

      for (const p in this.accountingPointForm.controls.person['controls']) {
        this.accountingPointForm.controls.person.get(p).markAsDirty()
        this.accountingPointForm.controls.person.get(p).updateValueAndValidity()
      }
    }

    if(this.accountingPointForm.valid) {
      this.accountingPointService.add(this.accountingPointForm.getRawValue()).subscribe(res => {
        console.log(res)
      })
    }
  }

  resetForm() {
    this.accountingPointForm.reset();
    this.isPersonInputsShown = false

    this.accountingPointForm.controls.city.disable()
    this.accountingPointForm.controls.street.disable()
  }
}
