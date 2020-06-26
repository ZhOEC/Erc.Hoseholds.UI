import { Component, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DistributionSystemOperatorService } from '../../../shared/services/distribution-system-operator.service'
import { DistributionSystemOperator } from '../../../shared/models/distribution-system-operator.model'
import { TariffService } from '../../../shared/services/tariff.service'
import { Tariff } from '../../../shared/models/tariff'
import { BranchOfficeService } from '../../../shared/services/branch-office.service'
import { BranchOffice } from '../../../shared/models/branch-office.model'
import { AccountingPointService } from '../../../shared/services/accounting-point.service'
import { Person } from '../../../shared/models/person.model'
import { City } from '../../../shared/models/address/city.model'
import { Street } from '../../../shared/models/address/street.model'
import { AddressService } from '../../../shared/services/address.service'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { PersonComponent } from '../../customers/person/person.component'
import { UsageCategoryService } from 'src/app/shared/services/usage-category.service'
import { UsageCategory } from 'src/app/shared/models/usage-category'
import { BuildingTypeService } from 'src/app/shared/services/building-type.service'
import { BuildingType } from 'src/app/shared/models/building-type'
import { PersonService } from 'src/app/shared/services/person.service'

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
  buildingTypes: BuildingType[]
  usageCategories: UsageCategory[]
  foundPersons: Person[]

  isVisiblePersonComponent = false
  isLoadingSearch = false
  isLoadingCities = false
  isLoadingStreets = false
  isLoadingSubmit = false

  @ViewChild(PersonComponent) 
  private personComponent: PersonComponent

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private distributionSystemOperatorService: DistributionSystemOperatorService,
    private branchOfficeService: BranchOfficeService,
    private addressService: AddressService,
    private tariffService: TariffService,
    private buildingTypeService: BuildingTypeService,
    private usageCategoryService: UsageCategoryService,
    private personService: PersonService,
    private notification: NotificationComponent
  ) {}

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      searchPerson: [null, [Validators.required]],
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
      usageCategoryId: [null, [Validators.required]],
      buildingTypeId: [null, [Validators.required]],
      contractStartDate: [null, [Validators.required]],
      sendPaperBill: [true],
      owner: [null]
    })

    this.getBranchOffices()
    this.getDistributionSystemOperators()
    this.getTariffs()
    this.getBuildingTypes()
    this.getUsageCategories()
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(
      offices => {
        this.branchOfficesList = offices.sort((a, b) => a.name.localeCompare(b.name))
        if (this.branchOfficesList.length === 1) {
          this.accountingPointForm.get('branchOfficeId').setValue(this.branchOfficesList[0].id)
        }
      })
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
    this.distributionSystemOperatorService.getDistributionSystemOperators().subscribe(
      operators => {
        this.distributionSystemOperatorsList = operators.sort((a, b) => a.name.localeCompare(b.name))
        if (this.distributionSystemOperatorsList.length == 1) {
          this.accountingPointForm.get('dsoId').setValue(this.distributionSystemOperatorsList[0].id)
        }
      })
  }

  getTariffs() { this.tariffService.getTariffList().subscribe(tariffs => this.tariffsList = tariffs) }
  getUsageCategories() { this.usageCategoryService.getAll().subscribe(categories => this.usageCategories = categories) }
  getBuildingTypes() { this.buildingTypeService.getAll().subscribe(types => this.buildingTypes = types) }
  
  personComponentTrigger() {
    this.isVisiblePersonComponent = true

    this.personComponent.personForm.get('taxCode').enable()
    this.personComponent.personForm.get('firstName').enable()
    this.personComponent.personForm.get('lastName').enable()
    this.personComponent.personForm.get('patronymic').enable()

    this.personComponent.resetForm()
    this.accountingPointForm.get('searchPerson').reset()
  }

  searchPerson(searchString: string) {
    if(searchString.length > 6) {
      this.isLoadingSearch = true
      this.personService.searchPerson(searchString).subscribe(
        persons => {
          this.foundPersons = persons
          this.isLoadingSearch = false
        })
    }
  }

  setPerson(person: Person) {
    this.isVisiblePersonComponent = true
    this.personComponent.personForm.patchValue(person)

    if(person != null) {
      this.personComponent.personForm.get('taxCode').disable()
      this.personComponent.personForm.get('firstName').disable()
      this.personComponent.personForm.get('lastName').disable()
      this.personComponent.personForm.get('patronymic').disable()
    }
  }

  resetForm() {
    this.accountingPointForm.reset()
    this.personComponent.resetForm()

    this.accountingPointForm.get('city').disable()
    this.accountingPointForm.controls.address.get('streetId').disable()
  }

  validateForms() {
    // Validate AccountingPoint Form
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty()
      this.accountingPointForm.controls[i].updateValueAndValidity()
    }

    if (this.isVisiblePersonComponent) {
      // Validate PersonAdd Form
      this.personComponent.validateForm()
    } else {
      this.accountingPointForm.get('searchPerson').markAsDirty()
      this.accountingPointForm.get('searchPerson').updateValueAndValidity()
    }
  }

  submitForm() {
    this.validateForms() // Validate forms

    if (this.accountingPointForm.valid && this.personComponent.personForm.valid) {
      this.isLoadingSubmit = true

      this.accountingPointForm.value.owner = this.personComponent.personForm.getRawValue()
      this.accountingPointService.add(this.accountingPointForm.value)
        .subscribe(
          ap => {
            this.notification.show('success', 'Успіх', `Точку обліку - ${this.accountingPointForm.value.name}, успішно додано`)
            this.isLoadingSubmit = false
            this.router.navigate(['accounting-points/', ap.id])
          },
          _ => {
            this.notification.show('error', 'Фіаско', `Не вдалося додати точку обліку`)
            this.isLoadingSubmit = false
          }
        )
    }
  }
}
