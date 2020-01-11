import { Component } from '@angular/core';
import { DistributionSystemOperator } from 'src/app/add-recordpoint/distribution-system-operator';
import { AddRecordpointService } from 'src/app/add-recordpoint/add-recordpoint.service';

@Component({
  selector: 'app-add-recordpoint',
  templateUrl: './add-recordpoint.component.html',
  styleUrls: ['./add-recordpoint.component.scss']
})
export class AddRecordpointComponent {
  distributionSystemOperatorsList: DistributionSystemOperator[];
  selectedDistributionSystemOperator: string;
  selectedTariff: string;

  constructor(private apiService: AddRecordpointService) {}

  ngOnInit() {
    this.getDistributionSystemOperators();
  }

  getDistributionSystemOperators() {
    this.apiService.getDistributionSystemOperators().subscribe(data => {
      this.distributionSystemOperatorsList = data
    });
  }
}
