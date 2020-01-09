import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var accessToken = this.authService.accessTokens.access_token;

        const authReq = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + accessToken)
        });
        return next.handle(authReq);
    }
}