import { Component } from '@angular/core';
import { AccountingPointsService } from '../shared/accounting-points.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting-points-search',
  templateUrl: './accounting-points-search.component.html',
  styleUrls: ['./accounting-points-search.component.css']
})
export class AccountingPointsSearchComponent {
  selectedValue = null;
  searchResults: Array<{ id: number; text: string }> = [];
  nzFilterOption = () => true;

  constructor(private accountingPointsService: AccountingPointsService, private router: Router) { }

  search(value: string): void {
    if (value.length >= 8 || value.endsWith(' ')) {
      this.searchResults = [];
      this.accountingPointsService.search(value).subscribe((data: any[]) => {
        data.forEach(element => {
          this.searchResults.push({ id: element.id, text: `${element.name}, ${element.owner}, ${element.streetAddress}, ${element.cityName}` })
        });
      });
    }
  }

  select() {
    this.router.navigate(['accounting-point', this.selectedValue]);
  }

}
