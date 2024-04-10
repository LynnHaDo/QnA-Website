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
  let isAuthenticated = false;
  RegisterService.isAuthenticated.subscribe((val) => (isAuthenticated = val));
  return isAuthenticated ? true : inject(Router).createUrlTree(['/log-in']);
};
