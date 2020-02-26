import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountingPointsService } from '../shared/accounting-points.service';

@Component({
  selector: 'app-accounting-points-search',
  templateUrl: './accounting-points-search.component.html',
  styleUrls: ['./accounting-points-search.component.css']
})
export class AccountingPointsSearchComponent {
  selectedValue = null;
  searchResults: Array<{ id: number; text: string }> = [];
  nzFilterOption = () => true;

  constructor(private accountingPointsService: AccountingPointsService) { }

  search(value: string): void {
    if ((value.length >= 8 && Number(value.substr(0, 2)) && value[2] == '-') || (value.length >= 2 && !Number(value.substr(0, 2) || value.length >= 5))) {
      this.searchResults = [];
      this.accountingPointsService.search(value).subscribe((data: Array<any>) => {
        data.forEach(element => {
          this.searchResults.push({ id: element.id, text: `${element.name}, ${element.address}, ${element.owner}` })
        });
      });
    }
  }
}
