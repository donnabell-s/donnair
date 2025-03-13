// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService); // Inject AuthService
//   const router = inject(Router); // Inject Router

//   if (authService.isAuthenticated()) {
//     return true; // Allow access if the user is authenticated
//   } else {
//     // Redirect to the login page if the user is not authenticated
//     return router.createUrlTree(['/login']);
//   }
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isAuthenticated()) {
    const requiredRole = route.data['role']; // Get the required role from route data

    // If no role is required, allow access to any authenticated user
    if (!requiredRole) {
      return true;
    }

    // If a role is required, check if the user has the required role
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.Role; // Get the user's role

    if (userRole === requiredRole) {
      return true; // Allow access if the role matches
    } else {
      return router.createUrlTree(['/unauthorized']); // Redirect to unauthorized page
    }
  } else {
    return router.createUrlTree(['/login']); // Redirect to login if not authenticated
  }
};