import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(): void{
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/flight-list']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
