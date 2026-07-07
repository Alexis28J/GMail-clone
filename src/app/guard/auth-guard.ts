import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser()();

  //console.log('GUARD USER:', user);

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);

};


