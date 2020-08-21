import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).TokenID._text : '';
    if (token) {
      // logged in so return false
      this.router.navigate(['/sites/map']);
      return false;
    } else {
      // not logged in so redirect to login page without the return url
      return true;
    }
  }

  checkLogin(url: string): boolean {
    console.log('url  :: check here=> ', url);
    return true;
  }

}
