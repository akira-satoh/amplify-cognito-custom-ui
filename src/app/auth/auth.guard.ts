import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { routes } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate', this.authService.signedIn);
    if (!this.authService.signedIn) {
      this.router.navigate(['/auth/signin'], { fragment: state.url })
    }
    return this.authService.signedIn;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivateChild', this.authService.signedIn);
    if (!this.authService.signedIn) {
      this.router.navigate(['/auth/signin'], { fragment: state.url })
    }
    return this.authService.signedIn;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad', this.authService.signedIn);
    if (!this.authService.signedIn) {
      this.router.navigate(['/auth/signin'], { fragment: `/${route.path}` })
    }
    return this.authService.signedIn;
  }
}
