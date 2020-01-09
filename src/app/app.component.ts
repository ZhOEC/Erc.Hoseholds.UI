import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { ApiService } from './core/api.service';
import { BranchOffice } from './core/api.branchoffice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Promise<string>;
  branchOfficesList: BranchOffice[];
  selectedBranchOffice: string;

  visibilityDrawer = false;
  placementDrawer = 'left';

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.getBranchOffices();
    this.currentUser = this.authService.getUsername();
  }

  getBranchOffices() {
    this.apiService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data
    });
  }

  logout() {
    this.authService.logout();
  }
}