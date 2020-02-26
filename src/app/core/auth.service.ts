import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccessToken } from './auth.token';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { map, filter, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly tokenItemName: string = 'tokens';
  private accessTokens: AccessToken
  private isObtainingTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<AccessToken> = new BehaviorSubject<AccessToken>(null);

  constructor(private router: Router, activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.accessTokens = JSON.parse(localStorage.getItem(this.tokenItemName))
    if (!this.accessTokens || new Date(this.accessTokens.refresh_expires_at) < new Date()) {
      this.router.events.subscribe(
        (event: RouterEvent) => {
          if (event instanceof NavigationEnd) {
            let code = activatedRoute.snapshot.queryParamMap.get('code');
            if (code) {
              this.getAccessTokens(code);
            }
            else {
              this.redirectToLoginPage();
            }
          }
        }
      );
    }
    else {
      if (new Date(this.accessTokens.expires_at) < new Date() && new Date(this.accessTokens.refresh_expires_at) > new Date()) {
        this.getAccessTokens();
      }
    }
  }

  private redirectToLoginPage() {
    let redirectUri = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.location.href = `${environment.authUri}?redirect_uri=${redirectUri}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
  }

  getUserName() {
    if (this.accessTokens) {
      var decodedToken = this.jwtHelper.decodeToken(this.accessTokens.access_token);
      return decodedToken.username;
    }
    else
      return null;
  }

  logout() {
    localStorage.clear();
    window.location.href = `${environment.logoutUri}?redirect_uri=${window.location.href}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
  }

  async getAccessTokenAsync() {
    if (!this.accessTokens || (new Date(this.accessTokens.expires_at) <= new Date())) {
      this.accessTokens = await this.obtainAccessTokens().toPromise();
      localStorage.setItem(this.tokenItemName, JSON.stringify(this.accessTokens));
    }
    return this.accessTokens.access_token;
  }

  private getAccessTokens(code?: string) {
    this.obtainAccessTokens(code).subscribe(tokens => {
      this.accessTokens = tokens;
      localStorage.setItem(this.tokenItemName, JSON.stringify(this.accessTokens));
      if (code) {
        window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      }
    }, () => { 
      localStorage.removeItem(this.tokenItemName);
      this.redirectToLoginPage(); 
    });
  }

  private obtainAccessTokens(code?: string) {
    if (this.isObtainingTokenInProgress || (!code && !this.accessTokens)) {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1));
    } else {
      this.isObtainingTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      let body = new HttpParams()
        .set('client_id', environment.clientId)
        .set('client_secret', environment.client_secret)
        .set('grant_type', code ? 'authorization_code' : 'refresh_token');

      if (code) {
        body = body
          .append('code', code)
          .append('redirect_uri', `${window.location.protocol}//${window.location.host}${window.location.pathname}`)
      }
      else {
        body = body.append('refresh_token', this.accessTokens.refresh_token)
      }
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };

      return this.httpClient
        .post(environment.tokenUri, body, options)
        .pipe(map((response: any) => {
          let expires_at: Date
          let refresh_expires_at: Date;
          expires_at = refresh_expires_at = new Date();

          expires_at = new Date(expires_at.getTime() + (1000 * response.expires_in));
          refresh_expires_at = new Date(refresh_expires_at.getTime() + (1000 * response.refresh_expires_in));

          let accessToken: AccessToken = {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_at: expires_at,
            refresh_expires_at: refresh_expires_at,
          };

          this.refreshTokenSubject.next(accessToken);
          this.isObtainingTokenInProgress = false;

          return accessToken;
        }));
    }
  }
}
