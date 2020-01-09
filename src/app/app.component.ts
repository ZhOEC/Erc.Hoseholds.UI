import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: Promise<string>;
  avatarText: string;

  visibilityDrawer = false;
  placementDrawer = 'left';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }
}