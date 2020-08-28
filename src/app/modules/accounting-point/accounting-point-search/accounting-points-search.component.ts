import { Component } from '@angular/core';
import { AccountingPointService } from '../../../shared/services/accounting-point.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-accounting-points-search',
  templateUrl: './accounting-points-search.component.html',
  styleUrls: ['./accounting-points-search.component.scss']
})
export class AccountingPointsSearchComponent {
  selectedValue = null;
  searchResults$: Observable<Array<{ id: number; text: string }>>;
  nzFilterOption = () => true;

  constructor(private accountingPointsService: AccountingPointService, private router: Router) { }

  search(value: string): void {
    if (value.length >= 8 || value.endsWith(' ')) {
      this.searchResults$ = this.accountingPointsService.search(value)
        .pipe(
          map((res: any[]) => { 
            let ap: Array<{ id: number, text: string }> =[];
            res.forEach(element => {
              ap.push( { id: element.id, text: `${element.name}, ${element.owner}, ${element.streetAddress}, ${element.cityName}` });
            });
            console.log(ap);
            
            return ap; 
          })
        );

      /* .subscribe((data: any[]) => {
        data.forEach(element => {
          console.log(`${element.name}, ${element.owner}, ${element.streetAddress}, ${element.cityName}`);
          
          this.searchResults.push({ id: element.id, text: `${element.name}, ${element.owner}, ${element.streetAddress}, ${element.cityName}` })
        });
      });
 */    }
  }

  select() {
    this.router.navigate(['accounting-points', this.selectedValue]);
  }

}
