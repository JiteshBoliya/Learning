import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.hasRole('admin')) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return router.parseUrl('/unauthorized');
  }

  return router.parseUrl('/');
};

export const schoolGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated() && authService.hasRole('school')) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return router.parseUrl('/unauthorized');
  }

  return router.parseUrl('/');
};
