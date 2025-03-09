import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isUser = false; // Default to false
  isLoggedIn = false; // Default to false

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = !!localStorage.getItem('userType');

    // Check if the user is a normal user (not admin)
    this.isUser = localStorage.getItem('userType') === 'user';
  }

  logout(): void {
    // Clear user-related data from localStorage
    localStorage.removeItem('userType');

    // Update the logged-in status
    this.isLoggedIn = false;

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
