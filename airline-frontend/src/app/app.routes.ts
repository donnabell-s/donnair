
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { HeaderComponent } from './components/header/header.component';
import { authGuard } from './guard/auth.guard';
import { FlightAddComponent } from './components/flight-add/flight-add.component';
import { FlightBookComponent } from './components/flight-book/flight-book.component';
import { FlightBookedComponent } from './components/flight-booked/flight-booked.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'flight-list', component: FlightListComponent, canActivate: [authGuard] },
  { path: 'flight-search', component: FlightSearchComponent, canActivate: [authGuard] },
  { path: 'flight-add', component: FlightAddComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: 'flight-book', component: FlightBookComponent, canActivate: [authGuard], data: { role: 'customer' } },
  { path: 'flight-booked', component: FlightBookedComponent, canActivate: [authGuard], data: { role: 'customer' } },
  { path: 'header', component: HeaderComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
