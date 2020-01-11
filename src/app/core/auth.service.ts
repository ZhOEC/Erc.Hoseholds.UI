import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccessToken } from './auth.token';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly tokenItemName: string = 'tokens';
  private accessTokens: AccessToken

  constructor(private router: Router, activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.accessTokens = JSON.parse(localStorage.getItem(this.tokenItemName))
    if (!this.accessTokens || new Date(this.accessTokens.refresh_expires_at) < new Date()) {
      this.router.events.subscribe(
        (event: RouterEvent) => {
          if (event instanceof NavigationEnd) {
            let code = activatedRoute.snapshot.queryParamMap.get('code');
            if (code) {
              this.GetToken(code);
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
        this.GetToken();
      }
    }
  }

  private redirectToLoginPage() {
    let redirectUri = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.location.href = `${environment.authUri}?redirect_uri=${redirectUri}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
  }

  isAuthenticated() {
    return this.accessTokens && (new Date(this.accessTokens.expires_at) > new Date());
  }

  async GetAccessToken(): Promise<string> {
    if (!this.isAuthenticated()) {
      await this.GetToken();
    }
    return this.accessTokens.access_token;
  }

  private async GetToken(code?: string) {
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

    this.httpClient
      .post(environment.tokenUri, body, options)
      .toPromise()
      .then((response: any) => {
        let expires_at: Date
        let refresh_expires_at: Date;
        expires_at = refresh_expires_at = new Date();

        expires_at = new Date(expires_at.getTime() + (1000 * response.expires_in));
        refresh_expires_at = new Date(refresh_expires_at.getTime() + (1000 * response.refresh_expires_in));

        this.accessTokens = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_at: expires_at,
          refresh_expires_at: refresh_expires_at,
        };
        localStorage.setItem(this.tokenItemName, JSON.stringify(this.accessTokens));
        if (code) {
          window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        }
      })
      .catch(() => {
        localStorage.removeItem(this.tokenItemName);
        this.redirectToLoginPage()
      });
  }

  login() {
    if (!this.accessTokens) {
      window.location.href = `${environment.authUri}?redirect_uri=${window.location.href}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
    }
  }

  async getUsername() {
    if (this.accessTokens) {
      var decodedToken = this.jwtHelper.decodeToken(this.accessTokens.access_token);

      return new Promise<string>((resolve) => resolve(decodedToken.username));
    }
    else
      return new Promise<string>((resolve) => resolve(null));
  }

  logout() {
    localStorage.clear();
    window.location.href = `${environment.logoutUri}?redirect_uri=${window.location.href}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
  }

  getAccessToken() {
    return this.accessTokens ? this.accessTokens.access_token : null;
  }
}
