import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DistributionSystemOperatorService } from '../../../shared/services/distribution-system-operator.service';
import { DistributionSystemOperator } from '../../../shared/models/distribution-system-operator.model';
import { TariffService } from '../../../shared/services/tariff.service';
import { Tariff } from '../../../shared/models/tariff';
import { BranchOfficeService } from '../../../shared/services/branch-office.service';
import { BranchOffice } from '../../../shared/models/branch-office.model';
import { AccountingPointService } from '../../../shared/services/accounting-point.service'
import { Person } from '../../../shared/models/person.model';
import { City } from '../../../shared/models/address/city.model';
import { Street } from '../../../shared/models/address/street.model';
import { AddressService } from '../../../shared/services/address.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting-point-new',
  templateUrl: './accounting-point-new.component.html',
  styleUrls: ['./accounting-point-new.component.scss']
})

export class AccountingPointNewComponent {
  
  dateFormat = 'dd.MM.yyyy'
  datesMoreToday = (date: number): boolean => { return date > Date.now() }
  datesLessToday = (date: number): boolean => { return date < Date.now() }
  
  accountingPointForm: FormGroup
  branchOfficesList: BranchOffice[]
  citiesList: City[]
  streetsList: Street[]
  distributionSystemOperatorsList: DistributionSystemOperator[]
  tariffsList: Tariff[]

  findPersons: Person[]
  isPersonInputsShown: boolean = false
  isLoadingSearch: boolean = false
  isLoadingCities: boolean = false
  isLoadingStreets: boolean = false

  constructor(private accountingPointService: AccountingPointService, 
    private personService: PersonService,
    private distributionSystemOperatorService: DistributionSystemOperatorService,
    private branchOfficeService: BranchOfficeService,
    private addressService: AddressService,
    private tariffService: TariffService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationComponent
  ) {}

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      branchOfficeId: [null, [Validators.required]],
      eic: [null, [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9a-zA-Z-]*')]],
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dsoId: [null, [Validators.required]],
      tariffId: [null, [Validators.required]],
      city: [{value: null, disabled: true}, [Validators.required]],
      address: this.formBuilder.group({
        streetId: [{value: null, disabled: true}, [Validators.required]],
        building: [null, [Validators.required]],
        apt: [null],
        zip: [null, [Validators.required]],
      }),
      contractStartDate: [null, [Validators.required]],

      searchPerson: [null, [Validators.required]],
      owner: this.formBuilder.group({
        id: [{value: null}],
        taxCode: [{value: null, disabled: true}, [Validators.required]],
        idCardNumber: [{value: null}, [Validators.required]],
        idCardIssuanceDate: [{value: null}, [Validators.required]],
        idCardExpirationDate: [{value: null, disabled: true}, [Validators.required]],
        firstName: [{value: null, disabled: true}, [Validators.required]],
        lastName: [{value: null, disabled: true}, [Validators.required]],
        patronymic: [{value: null, disabled: true}, [Validators.required]],
        mobilePhones: [{value: null, disabled: true}, [Validators.required]]
      })
    });

    this.getBranchOffices();
    this.getDistributionSystemOperators();
    this.getTariffs();
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.branchOfficesList.length === 1) {
        this.accountingPointForm.get('branchOfficeId').setValue(this.branchOfficesList[0].id);
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
    this.accountingPointForm.controls.address.get('streetId').reset()
    if(cityId) {
      this.isLoadingStreets = true
      this.addressService.getStreets(cityId).subscribe(streets => {
        this.streetsList = streets
        this.accountingPointForm.controls.address.get('streetId').enable()
        this.isLoadingStreets = false
      })
    }
  }

  getDistributionSystemOperators() {
    this.distributionSystemOperatorService.getDistributionSystemOperators().subscribe(data => {
      this.distributionSystemOperatorsList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.distributionSystemOperatorsList.length == 1) {
        this.accountingPointForm.get('dsoId').setValue(this.distributionSystemOperatorsList[0].id);
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
      this.personService.searchPerson(searchString).subscribe((persons: Array<Person>) => {
        this.findPersons = persons
        this.isLoadingSearch = false
      })
    }
  }

  setDataPerson(selectedPerson: Person) {
    this.isPersonInputsShown = true
    if(selectedPerson != null) {
      this.accountingPointForm.controls.owner.patchValue({
        id: selectedPerson.id,
        taxCode: selectedPerson.taxCode,
        idCardNumber: selectedPerson.idCardNumber,
        idCardIssuanceDate: selectedPerson.idCardIssuanceDate,
        idCardExpirationDate: selectedPerson.idCardExpDate,
        firstName: selectedPerson.firstName,
        lastName: selectedPerson.lastName,
        patronymic: selectedPerson.patronymic,
        mobilePhones: selectedPerson.mobilePhones
      })

      this.accountingPointForm.controls.owner.get('taxCode').disable()
      this.accountingPointForm.controls.owner.get('idCardExpirationDate').disable()
      this.accountingPointForm.controls.owner.get('firstName').disable()
      this.accountingPointForm.controls.owner.get('lastName').disable()
      this.accountingPointForm.controls.owner.get('patronymic').disable()
      this.accountingPointForm.controls.owner.get('mobilePhones').disable()
    }
  }

  personInputsTrigger() {
    this.isPersonInputsShown = true

    this.accountingPointForm.controls.owner.get('taxCode').enable()
    this.accountingPointForm.controls.owner.get('idCardExpirationDate').enable()
    this.accountingPointForm.controls.owner.get('firstName').enable()
    this.accountingPointForm.controls.owner.get('lastName').enable()
    this.accountingPointForm.controls.owner.get('patronymic').enable()
    this.accountingPointForm.controls.owner.get('mobilePhones').enable()

    this.accountingPointForm.controls.searchPerson.reset()
    this.accountingPointForm.controls.owner.get('taxCode').reset()
    this.accountingPointForm.controls.owner.get('idCardNumber').reset()
    this.accountingPointForm.controls.owner.get('idCardIssuanceDate').reset()
    this.accountingPointForm.controls.owner.get('idCardExpirationDate').reset()
    this.accountingPointForm.controls.owner.get('firstName').reset()
    this.accountingPointForm.controls.owner.get('lastName').reset()
    this.accountingPointForm.controls.owner.get('patronymic').reset()
    this.accountingPointForm.controls.owner.get('mobilePhones').reset()
  }

  submitForm() {
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty()
      this.accountingPointForm.controls[i].updateValueAndValidity()
    }

    if(this.isPersonInputsShown) {
      this.accountingPointForm.get('searchPerson').setErrors(null)

      for (const p in this.accountingPointForm.controls.owner['controls']) {
        this.accountingPointForm.controls.owner.get(p).markAsDirty()
        this.accountingPointForm.controls.owner.get(p).updateValueAndValidity()
      }
    }

    if(this.accountingPointForm.valid) {
      this.accountingPointService.add(this.accountingPointForm.getRawValue()).subscribe(res => {
        this.notification.show('success', 'Успіх', `Точку обліку, успішно створено`);
        this.router.navigate(['accounting-points', res.id])
      })
    }
  }

  resetForm() {
    this.accountingPointForm.reset();
    this.isPersonInputsShown = false

    this.accountingPointForm.controls.city.disable()
    this.accountingPointForm.controls.address.get('streetId').disable()
  }
}
