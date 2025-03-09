import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  showHeader = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in on initial load
    this.showHeader = !!localStorage.getItem('userType');

    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Filter for NavigationEnd events
      .subscribe(() => {
        // Update the header visibility based on the user's login status
        this.showHeader = !!localStorage.getItem('userType');
      });
  }
}
