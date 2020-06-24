import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { BranchOfficeService } from './shared/services/branch-office.service';
import { BranchOffice } from './shared/models/branch-office.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: string;

  visibilityDrawer = false;
  placementDrawer = 'left';

  branchOfficesList$: Observable<BranchOffice[]>

  constructor(private authService: AuthService,
    private branchOfficeService: BranchOfficeService) { }

  ngOnInit() {
    this.branchOfficesList$ = this.branchOfficeService.getBranchOffices();;
    this.currentUser = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }

  /* getBranchOffices() {
    this.branchOfficeService.getBranchOffices().subscribe(data => {
      this.branchOfficesList = data.sort((a, b) => a.name.localeCompare(b.name))
    })
  } */
}