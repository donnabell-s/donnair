import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  conPass: string = '';

  constructor(private router: Router) {}

  register() {
    localStorage.setItem('userType', 'user'); // Save user type
    this.router.navigate(['/user-dashboard']);
  }
}
