// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';  // Add this line
// import { AppComponent } from './app/app.component';
// import { provideRouter, Routes} from '@angular/router';
// import { FlightListComponent } from './app/components/flight-list/flight-list.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/flight-list', pathMatch: 'full' },
//   { path: 'flight-list', component: FlightListComponent },
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//   ]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
