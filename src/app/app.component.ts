import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { BranchOffice } from './baranch-office/branch-office';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: string;

  visibilityDrawer = false;
  placementDrawer = 'left';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }
}