import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://127.0.0.1:8000/bookings/api/flights/';
  private cityUrl = 'http://127.0.0.1:8000/bookings/api/cities/';

  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFlight(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  deleteFlight(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  addFlight(newFlight: {FlightNumber: string, DepartureCity: number, ArrivalCity: number, DepartureDateTime: string, ArrivalDateTime: string, Price: number}): Observable<any> {
    return this.http.post(this.apiUrl, newFlight);
  }

  getCities(): Observable<any>{
    return this.http.get(this.cityUrl);
  }
}