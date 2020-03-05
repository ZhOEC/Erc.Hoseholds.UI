import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddRecordpointService } from 'src/app/add-recordpoint/add-recordpoint.service';
import { DistributionSystemOperator } from 'src/app/add-recordpoint/distribution-system-operator';
import { TariffsService } from '../tariffs/tariffs.service';
import { Tariff } from '../tariffs/tariff';

@Component({
  selector: 'app-add-recordpoint',
  templateUrl: './add-recordpoint.component.html',
  styleUrls: ['./add-recordpoint.component.scss']
})
export class AddRecordpointComponent {
  recordpointForm: FormGroup;
  
  distributionSystemOperatorsList: DistributionSystemOperator[];
  selectedDistributionSystemOperator: string;
  tariffsList: Tariff[];
  selectedTariff: string;

  constructor(private apiRecordServiceService: AddRecordpointService, 
    private apiTariffsService: TariffsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.recordpointForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      selectedDistributionSystemOperator: [null, [Validators.required]],
      selectedTariff: [null, [Validators.required]]
    });

    this.getDistributionSystemOperators();
    this.getTariffs();
  }

  getDistributionSystemOperators() {
    this.apiRecordServiceService.getDistributionSystemOperators().subscribe(operators => {
      this.distributionSystemOperatorsList = operators
    });
  }

  getTariffs() {
    this.apiTariffsService.getTariffs().subscribe(tariffs => {
      this.tariffsList = tariffs;
    });
  }

  submitForm() {
    for (const i in this.recordpointForm.controls) {
      this.recordpointForm.controls[i].markAsDirty();
      this.recordpointForm.controls[i].updateValueAndValidity();
    }
  }
}
