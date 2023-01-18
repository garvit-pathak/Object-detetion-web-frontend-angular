import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  redirectUrl: string;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;

    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          if ((url !== '/login' && url !== '/' && url !== '/register')) {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            return false;
          }
        } else {
        if (url === '/login' || url === '/' || url === '/register') {
          return true;
        }
      }
        this.router.navigate(['/']);
      })
    );
  }
}


