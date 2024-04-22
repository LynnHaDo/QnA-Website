import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RegisterService } from '../services/register.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
/* 
  let loggedInStatus = sessionStorage.getItem('userLoggedIn');
  if (loggedInStatus == null) {
    return inject(Router).createUrlTree(['/log-in']);
  } */
  let isAuthenticated = false;
  RegisterService.isAuthenticated.subscribe((val) => (isAuthenticated = val));
  return isAuthenticated ? true : inject(Router).createUrlTree(['/log-in']);
};
