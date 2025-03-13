import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/bookings/api/token/'
  private userUrl = 'http://127.0.0.1:8000/bookings/api/users/me'
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }
 
  register( user: { username: string, email: string, password:string }): Observable<any>{
    return this.http.post(this.url, user)
  }

  login(credentials: { username: string, password: string }): Observable<any>{
    return this.http.post(this.url, credentials)
  }

  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Include the token
    });
    return this.http.get(this.userUrl, { headers });
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }
}
