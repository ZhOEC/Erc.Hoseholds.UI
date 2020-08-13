import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { map, filter, take, switchMap, mapTo } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AccessTokensPair } from './access-tokens-pair';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly tokenItemName: string = 'tokens';
  private accessTokens: AccessTokensPair
  private isObtainingTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<AccessTokensPair> = new BehaviorSubject<AccessTokensPair>(null);

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    //let code = this.activatedRoute.snapshot.queryParamMap.get('code');
    //console.log('start', code);

    this.accessTokens = JSON.parse(localStorage.getItem(this.tokenItemName))
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      //let code = this.activatedRoute.snapshot.queryParamMap.get('code');
      //console.log('NavigationEnd', code);

      if (!this.accessTokens || new Date(this.accessTokens.refresh_expires_at) < new Date()) {
        let code = this.activatedRoute.snapshot.queryParamMap.get('code');
        if (code) {
          this.retriveAccessTokens(code).subscribe(() => {
            localStorage.removeItem('redirect_uri');
            this.router.navigate([], { queryParams: { code: null, session_state: null }, queryParamsHandling: 'merge' });
          }, () => localStorage.removeItem('redirect_uri'));
        }
        else {
          this.redirectToLoginPage();
        }
      }
    });
  }

  private redirectToLoginPage() {
    localStorage.setItem('redirect_uri', window.location.href);
    window.location.href = `${environment.authUri}?redirect_uri=${window.location.href}&client_id=${environment.clientId}&response_type=${environment.responseType}`;
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
    if (this.accessTokens && new Date(this.accessTokens.refresh_expires_at) < new Date()) {
      localStorage.removeItem(this.tokenItemName);
      this.redirectToLoginPage();
    }
    else {
      if (!this.accessTokens || new Date(this.accessTokens.expires_at) < new Date()) {
        await this.retriveAccessTokens().toPromise();
      }
    }
    return this.accessTokens.access_token;
  }

  private retriveAccessTokens(code?: string) {
    if (this.isObtainingTokenInProgress || (!code && !this.accessTokens)) {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        mapTo(true));
    }
    this.isObtainingTokenInProgress = true;
    this.refreshTokenSubject.next(null);

    let body = new HttpParams()
      .set('client_id', environment.clientId)
      .set('client_secret', environment.client_secret)
      .set('grant_type', code ? 'authorization_code' : 'refresh_token');

    if (code) {
      let redirect_uri = localStorage.getItem('redirect_uri');
      body = body
        .append('code', code)
        .append('redirect_uri', redirect_uri)
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

        let accessTokensPair: AccessTokensPair = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_at: expires_at,
          refresh_expires_at: refresh_expires_at,
        };

        this.accessTokens = accessTokensPair
        localStorage.setItem(this.tokenItemName, JSON.stringify(this.accessTokens));
        this.refreshTokenSubject.next(accessTokensPair);
        this.isObtainingTokenInProgress = false;

        return true;
      }));
  }
}
