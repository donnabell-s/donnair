import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: ''};

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.access);
        // this.router.navigate(['/flight-list']);

        this.authService.getCurrentUser().subscribe(
          (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/flight-list']);
          },
          (error) => {
            console.error('Failed to fetch user details:', error);
          }
        );
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
