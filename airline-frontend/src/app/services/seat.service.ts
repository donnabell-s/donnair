// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, ObservableNotification } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class SeatService {
//   private seatUrl = 'http://127.0.0.1:8000/bookings/api/seats/';
  
//   constructor(private http: HttpClient) { }

//   getSeats(userId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.seatUrl}?userId=${userId}`); // Assuming your API supports filtering by userId
//   }

//   bookSeat(userId: number): Observable<any>{
//     return this.http.post(this.seatUrl, userId);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seatUrl = 'http://127.0.0.1:8000/bookings/api/seats/';

  constructor(private http: HttpClient) { }

  getSeats(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.seatUrl}?userId=${userId}`); // Assuming your API supports filtering by userId
  }

  // New method to book a specific seat
  bookSeat(seatId: number, User: number): Observable<any> {
    const bookingData = {
      User: User
    };
    return this.http.patch(`${this.seatUrl}${seatId}/`, bookingData); // URL includes the seat ID
  }

  getSeatsFlight(userId: number, flightId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.seatUrl}?userId=${userId}&flightId=${flightId}`); // Assuming your API supports filtering by userId and flightId
  }

}