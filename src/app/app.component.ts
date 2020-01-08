import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  visibilityDrawer = false;
  placementDrawer = 'left';

  jwtHelper = new JwtHelperService();
  currentUser: Promise<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  ngOnInit() {
    this.currentUser = this.getUser();
  }

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  async getUser() {
    var tokens = JSON.parse(localStorage.tokens)
    var access_token = tokens.access_token
    var decodedToken = this.jwtHelper.decodeToken(access_token);
    
    return new Promise<string>((resolve) => resolve(decodedToken.username));
  }
}
