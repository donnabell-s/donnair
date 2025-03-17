import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SeatService } from '../../services/seat.service';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-booked',
  imports: [RouterModule, CommonModule],
  templateUrl: './flight-booked.component.html',
  styleUrls: ['./flight-booked.component.css']
})
export class FlightBookedComponent implements OnInit {
  seats: any[] = [];
  userId!: number;
  flights: { [key: number]: any } = {};

  constructor(private authService: AuthService, private seatService: SeatService, private flightService: FlightService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser ().subscribe(
      (user) => {
        this.userId = user.UserID; // Get the UserID from the response
        this.seatService.getSeats(this.userId).subscribe(
          (seats) => {
            // Filter seats to only include those that belong to the current user
            this.seats = seats.filter(seat => seat.User === this.userId);
            const flightIds = [...new Set(this.seats.map(seat => seat.Flight))]; // Get unique Flight IDs
            flightIds.forEach(flightId => {
              this.flightService.getFlight(flightId).subscribe(
                (flight) => {
                  this.flights[flightId] = flight; // Store flight details indexed by Flight ID
                },
                (error) => {
                  console.error(`Error fetching flight ${flightId}:`, error);
                }
              );
            });
          },
          (error) => {
            console.error('Error fetching seats:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }
}