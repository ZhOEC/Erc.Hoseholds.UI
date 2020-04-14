import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(req, next));
    }

    private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        if (!req.url.includes(environment.tokenUri)) {
            const accessToken = await this.authService.getAccessTokenAsync();
            if (accessToken) {
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
                });
                return next.handle(authReq).toPromise();
            }
        }
        return next.handle(req).toPromise();
    }
}