import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SeatService } from '../../services/seat.service';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-booked',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './flight-booked.component.html',
  styleUrls: ['./flight-booked.component.css']
})
export class FlightBookedComponent implements OnInit {
  seats: any[] = [];
  filteredSeats: any[] = [];
  userId!: number;
  flights: { [key: number]: any } = {};
  selectedDateFilter: string = 'nearest';
  selectedPriceFilter: string = 'low';

  constructor(private authService: AuthService, private seatService: SeatService, private flightService: FlightService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser ().subscribe(
      (user) => {
        this.userId = user.UserID;
        this.seatService.getSeats(this.userId).subscribe(
          (seats) => {
            this.seats = seats.filter(seat => seat.User === this.userId);
            this.filteredSeats = [...this.seats];
            this.loadFlightDetails();
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

  loadFlightDetails() {
    const flightIds = [...new Set(this.seats.map(seat => seat.Flight))];
    flightIds.forEach(flightId => {
      this.flightService.getFlight(flightId).subscribe(
        (flight) => {
          this.flights[flightId] = flight;
        },
        (error) => {
          console.error(`Error fetching flight ${flightId}:`, error);
        }
      );
    });
  }

  onDateFilterChange() {
    this.filterAndSortSeats();
  }

  onPriceFilterChange() {
    this.filterAndSortSeats();
  }

  filterAndSortSeats() {
    this.filteredSeats = [...this.seats];

    if (this.selectedDateFilter === 'nearest') {
      this.filteredSeats.sort((a, b) => new Date(this.flights[a.Flight]?.DepartureDateTime).getTime() - new Date(this.flights[b.Flight]?.DepartureDateTime).getTime());
    } else {
      this.filteredSeats.sort((a, b) => new Date(this.flights[b.Flight]?.DepartureDateTime).getTime() - new Date(this.flights[a.Flight]?.DepartureDateTime).getTime());
    }

    if (this.selectedPriceFilter === 'high') {
      this.filteredSeats.sort((a, b) => b.Price - a.Price);
    } else {
      this.filteredSeats.sort((a, b) => a.Price - b.Price);
    }
  }
}