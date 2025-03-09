import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email.toLowerCase() === 'admin') {
      localStorage.setItem('userType', 'admin'); // Save user type
      this.router.navigate(['/admin-dashboard']);
    } else if (this.email.toLowerCase() === 'user'){
      localStorage.setItem('userType', 'user'); // Save user type
      this.router.navigate(['/user-dashboard']);
    } else {
      alert(`Invalid Login`);
    }
  }
}
