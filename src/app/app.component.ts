import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { BranchOfficeService } from './baranch-office/branch-office.service';
import { BranchOffice } from './baranch-office/branch-office';
import { SelectedBranchOffice } from './baranch-office/selected-branch-office';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currentUser: string;
  branchOfficesList: BranchOffice[];

  visibilityDrawer = false;
  placementDrawer = 'left';

  constructor(private authService: AuthService, private apiService: BranchOfficeService, public selectedBranchOffice: SelectedBranchOffice) { }

  ngOnInit() {
    this.getBranchOffices();
    this.currentUser = this.authService.getUserName();
  }

  getBranchOffices() {
    this.apiService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name));
      if (this.branchOfficesList.length == 1) {
        this.selectedBranchOffice.id = this.branchOfficesList[0].id;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}