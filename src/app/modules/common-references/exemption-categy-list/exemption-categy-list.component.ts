import { Component, OnInit } from '@angular/core';
import { ExemptionCategoryService } from 'src/app/shared/services/exemption-category.service';
import { ExemptionCategory } from 'src/app/shared/models/exemption-category';

@Component({
  selector: 'app-exemption-categy-list',
  templateUrl: './exemption-categy-list.component.html',
  styleUrls: ['./exemption-categy-list.component.scss']
})
export class ExemptionCategyListComponent implements OnInit {

  exemptionCategories: ExemptionCategory[] = [];

  constructor(private exemptionCategoryService: ExemptionCategoryService) { }

  ngOnInit(): void {
    this.exemptionCategoryService.getList()
      .subscribe(data => {
        this.exemptionCategories = data;
      });
  }

}
