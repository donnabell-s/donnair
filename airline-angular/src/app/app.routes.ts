import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root path to login
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'add-flight', component: AddFlightComponent },
    { path: 'book-flight', component: BookFlightComponent },
];
