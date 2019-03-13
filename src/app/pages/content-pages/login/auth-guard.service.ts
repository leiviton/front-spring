import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/pages/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  /**
     * check for expiration and if token is still existing or not
     * @return {boolean}
     */
  private isAuthenticated(): boolean {
      return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
      return false;
  }
}