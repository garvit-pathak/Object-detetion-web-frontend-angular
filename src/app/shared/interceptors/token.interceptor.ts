import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService,private route: ActivatedRoute) {


    this.urlsToNotUse = [
      'users/set-password/?token=.+',
      'users/verify-token-reset-password/.+',
      'users/reset-password/?token=.+',
      'users/Forgot-password/.+',
      'users/verify-token/.+',
      'users/create/.+',

    ];



   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessCode =  this.route.snapshot.queryParams.accessCode
    if(accessCode){
      request = this.addToken(request, accessCode);
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {

          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));

    }
    if (request.url.includes('users/set-password/?token')) {
      return next.handle(request);
    }
    if (request.url.includes('uusers/verify-token-reset-password')) {
      return next.handle(request);
    }
    if (request.url.includes('uusers/reset-password/?token')) {
      return next.handle(request);
    }
    if (request.url.includes('users/Forgot-password')) {
      return next.handle(request);
    }
    if (request.url.includes('users/verify-token')) {
      return next.handle(request);
    }
    if (request.url.includes('users/create')) {
      return next.handle(request);
    }


    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());

    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {

        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = 'api/v1/';
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination: string = requestUrl.substr(position + positionIndicator.length);

      for (const address of this.urlsToNotUse) {

        if (new RegExp(address).test(destination)) {

          return false;
        }
      }
    }

    return true;
  }





  private addToken(request: HttpRequest<any>, token: string) {

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(request.url.includes('token/refresh')){
      this.authService.logout()
    }
    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
        );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
