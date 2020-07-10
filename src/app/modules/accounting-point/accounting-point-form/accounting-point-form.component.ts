import { Component, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { DistributionSystemOperatorService } from '../../../shared/services/distribution-system-operator.service'
import { DistributionSystemOperator } from '../../../shared/models/distribution-system-operator.model'
import { TariffService } from '../../../shared/services/tariff.service'
import { Tariff } from '../../../shared/models/tariff'
import { BranchOfficeService } from '../../../shared/services/branch-office.service'
import { BranchOffice } from '../../../shared/models/branch-office.model'
import { AccountingPointService } from '../../../shared/services/accounting-point.service'
import { City } from '../../../shared/models/address/city.model'
import { Street } from '../../../shared/models/address/street.model'
import { AddressService } from '../../../shared/services/address.service'
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component'
import { PersonFormComponent } from '../../person/form/form.component'
import { UsageCategoryService } from 'src/app/shared/services/usage-category.service'
import { UsageCategory } from 'src/app/shared/models/usage-category'
import { BuildingTypeService } from 'src/app/shared/services/building-type.service'
import { BuildingType } from 'src/app/shared/models/building-type'
import { Person } from 'src/app/shared/models/person.model'
import { AccountingPointDetailService } from '../../accounting-point-view/accounting-point-detail.service'

@Component({
  selector: 'app-accounting-point-form',
  templateUrl: './accounting-point-form.component.html',
  styleUrls: ['./accounting-point-form.component.scss']
})

export class AccountingPointFormComponent {
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

  person: Person

  isLoadingCities = false
  isLoadingStreets = false
  isLoadingSubmit = false
  isLoadingSearch = false

  @ViewChild(PersonFormComponent)
  private personFormComponent: PersonFormComponent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountingPointService: AccountingPointService,
    private accountingPointDetailService: AccountingPointDetailService,
    private distributionSystemOperatorService: DistributionSystemOperatorService,
    private branchOfficeService: BranchOfficeService,
    private addressService: AddressService,
    private tariffService: TariffService,
    private buildingTypeService: BuildingTypeService,
    private usageCategoryService: UsageCategoryService,
    private notification: NotificationComponent
  ) { }

  ngOnInit() {
    this.accountingPointForm = this.formBuilder.group({
      id: [null],
      branchOfficeId: [null, [Validators.required]],
      eic: [null, [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9a-zA-Z-]*')]],
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      distributionSystemOperatorId: [null, [Validators.required]],
      tariffId: [null, [Validators.required]],
      address: this.formBuilder.group({
        id: [0],
        cityId: [{ value: null, disabled: true }, [Validators.required]],
        streetId: [{ value: null, disabled: true }, [Validators.required]],
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

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => params.getAll('id'))
    ).subscribe(id => {
      if (id) {
        this.accountingPointForm.get('tariffId').disable()

        this.accountingPointDetailService.getOne(+id).subscribe(acd =>
          this.accountingPointForm.patchValue(acd))
      }
    })
  }

  getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(offices => {
      this.branchOfficesList = offices.sort((a, b) => a.name.localeCompare(b.name))
      if (this.branchOfficesList.length === 1) {
        this.accountingPointForm.get('branchOfficeId').setValue(this.branchOfficesList[0].id)
      }
    })
  }

  getCities(branchOfficeId: number) {
    this.accountingPointForm.controls.address.get('cityId').reset()
    if (branchOfficeId) {
      this.isLoadingCities = true
      this.addressService.getCities(branchOfficeId).subscribe(cities => {
        this.citiesList = cities
        this.accountingPointForm.controls.address.get('cityId').enable()
        this.isLoadingCities = false
      })
    }
  }

  getStreets(cityId: number) {
    this.accountingPointForm.controls.address.get('streetId').reset()
    if (cityId) {
      this.isLoadingStreets = true
      this.addressService.getStreets(cityId).subscribe(streets => {
        this.streetsList = streets
        this.accountingPointForm.controls.address.get('streetId').enable()
        this.isLoadingStreets = false
      })
    }
  }

  getDistributionSystemOperators() {
    this.distributionSystemOperatorService.getDistributionSystemOperators().subscribe(operators => {
      this.distributionSystemOperatorsList = operators.sort((a, b) => a.name.localeCompare(b.name))
      if (this.distributionSystemOperatorsList.length == 1) {
        this.accountingPointForm.get('dsoId').setValue(this.distributionSystemOperatorsList[0].id)
      }
    })
  }

  getTariffs() { this.tariffService.getTariffList().subscribe(tariffs => this.tariffsList = tariffs) }
  getUsageCategories() { this.usageCategoryService.getAll().subscribe(categories => this.usageCategories = categories) }
  getBuildingTypes() { this.buildingTypeService.getAll().subscribe(types => this.buildingTypes = types) }

  cancelEdit() {
    this.router.navigate(['accounting-points/', this.accountingPointForm.get('id').value])
  }

  resetForm() {
    this.accountingPointForm.reset()
    this.accountingPointForm.markAsPristine()

    this.personFormComponent.resetForm()
  }

  validateForms() {
    // Validate AccountingPointForm
    for (const i in this.accountingPointForm.controls) {
      this.accountingPointForm.controls[i].markAsDirty()
      this.accountingPointForm.controls[i].updateValueAndValidity()
    }

    // Validate PersonForm
    this.personFormComponent.validateForm()
  }

  submitForm() {
    if (this.accountingPointForm.get('id').value) {
      // Validate AccountingPointForm
      for (const i in this.accountingPointForm.controls) {
        this.accountingPointForm.controls[i].markAsDirty()
        this.accountingPointForm.controls[i].updateValueAndValidity()
      }

      if (this.accountingPointForm.valid) {
        this.isLoadingSubmit = true
        this.accountingPointService.update(this.accountingPointForm.value)
          .subscribe(
            () => {
              this.notification.show('success', 'Успіх', `Точка обліку - ${this.accountingPointForm.value.name}, успішно оновлена`)
              this.isLoadingSubmit = false
              this.router.navigate(['accounting-points/', this.accountingPointForm.get('id').value])
            },
            () => {
              this.notification.show('error', 'Фіаско', `Не вдалося оновлено точку обліку`)
              this.isLoadingSubmit = false
            })
      }
    } else {
      this.validateForms()

      if (this.accountingPointForm.valid && this.personFormComponent.form.valid) {
        this.accountingPointForm.get('owner').setValue(this.person)
        this.accountingPointService.add(this.accountingPointForm.value)
          .subscribe(
            ap => {
              this.notification.show('success', 'Успіх', `Точку обліку - ${this.accountingPointForm.value.name}, успішно додано`)
              this.isLoadingSubmit = false
              this.router.navigate(['accounting-points/', ap.id])
            },
            () => {
              this.notification.show('error', 'Фіаско', `Не вдалося додати точку обліку`)
              this.isLoadingSubmit = false
            })
      }
    }
  }
}
