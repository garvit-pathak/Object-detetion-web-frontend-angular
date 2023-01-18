import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Tokens } from '../models';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN;
  private readonly REFRESH_TOKEN;
  private loggedUser: string;
  isUserLoggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService
    ) {}


  UserLoggedIn(success: boolean) {
    if (localStorage.getItem('JWT_TOKEN')) {
    this.isUserLoggedIn.next(success);
    }
  }

  login(user: any): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/users/token/`, user)
      .pipe(
        tap(tokens => {
          this.doLoginUser(user.email, tokens);
        }),
        mapTo(true)
        );
  }

  logout() {
    this.removeTokens();
    this.userService.removeUser()
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/'])
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLoggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/token/refresh/`, {
      refresh: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access);
    }), catchError((error: HttpErrorResponse) => {
      this.router.navigate(['/auth/login']);
      return throwError(error);
    }));
  }

  getJwtToken() {
    return localStorage.getItem('JWT_TOKEN');
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;

    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem('JWT_TOKEN', jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem('JWT_TOKEN', tokens.access);
    localStorage.setItem('REFRESH_TOKEN', tokens.refresh);
    this.isUserLoggedIn.next(true);
  }

  private removeTokens() {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
  }


  register(user: any) {
    console.log("hghfd", user);
    return this.http.post(`${environment.apiUrl}/users/create/`, user);
  }


  ValidSetPasswordToken(token){
    console.log('ValidSetPasswordToken',token);
    
    return this.http.post(`${environment.apiUrl}/users/verify-token/`, token);
  }
  setPassword(token,password){

    console.log('token',token);
    console.log('password',password);
    
    
    return this.http.post(`${environment.apiUrl}/users/set-password/?token=${token}`, password);
  }


  requestReset(body): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/forgot-password/`, body);
  }
  ValidResetPasswordToken(token){
    return this.http.post(`${environment.apiUrl}/users/verify-token-reset-password/`, token);
    return of(true)
  }
  resetPassword(token,password){


    return this.http.post(`${environment.apiUrl}/users/reset-password/?token=${token}`, password);
  }


}
