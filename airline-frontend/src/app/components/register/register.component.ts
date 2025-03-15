import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  credentials = { username: '', password: ''};
  

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(): void{
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.credentials.username = this.user.username;
        this.credentials.password = this.user.password;
        this.authService.login(this.credentials).subscribe(
          (response) => {
            console.log('Login succesfulL', response);
            localStorage.setItem('access_token', response.access);
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
            console.log('Login fauled:', error);
          }
        );
        
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
