
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { HeaderComponent } from './components/header/header.component';
import { authGuard } from './guard/auth.guard';
import { FlightAddComponent } from './components/flight-add/flight-add.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flight-list', component: FlightListComponent, canActivate: [authGuard] },
  { path: 'flight-search', component: FlightSearchComponent, canActivate: [authGuard] },
  { path: 'flight-add', component: FlightAddComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: 'header', component: HeaderComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];



  // Admin-only routes
  // { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'admin' } },

  // Customer-only routes
  // { path: 'bookings', component: BookingsComponent, canActivate: [authGuard], data: { role: 'customer' } },