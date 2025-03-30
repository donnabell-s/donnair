import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeatService } from '../../services/seat.service';
import { FlightService } from '../../services/flight.service';
import { AuthService } from '../../services/auth.service';
import { Flight } from '../../model/flight';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-flight-book',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.css']
})

export class FlightBookComponent implements OnInit {
  UserID!:number;
  selectedFlightId!: number;
  flight!: Flight;
  seats: any[] = []; 
  filteredSeats: any[] = [];
  selectedSeats: any[] = []; 
  columns: string[] = ['A', 'B', 'C', 'D', 'E', 'F']; 
  rows: number[] = Array.from({ length: 21 }, (_, i) => i + 1); 
  count!:number;

  constructor(private seatService: SeatService, private router: Router, private authService: AuthService, private flightService: FlightService) {}
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (user)=>{
        this.UserID = user.UserID;
        console.log('Current User:', this.UserID);
        const flightId = localStorage.getItem('selectedFlightId');
        if (flightId){
          this.selectedFlightId = parseInt(flightId, 10);
          console.log('Selected Flight:', this.selectedFlightId);
          this.flightService.getFlight(this.selectedFlightId).subscribe(
            (data) => {
              this.flight = data;
              console.log('Flight Details:', this.flight);
              this.seatService.getSeatsFlight(this.UserID, this.selectedFlightId).subscribe(
                (seats) => {
                  this.seats = seats;
                  this.filteredSeats = this.seats.filter(seat => seat.Flight === this.selectedFlightId);
                  console.log('Filtered Seats:', this.filteredSeats);
                  this.count = this.filteredSeats.length > 0 ? this.filteredSeats[0].SeatID : null;
                  console.log('Count:', this.count);
                },
                (error) => {
                  console.error('Error fetching seats:', error);
                }
              );
            },
            (error) => {
              console.error('Error fetching flights:', error);
            }
          );
        }
      },
      (error)=>{
        console.error('Error fetching current user:', error);
      }
    )
  }


  getRows(): number[] {
    return this.rows;
  }

  getSeatClass(seatId: number): string {
    if (this.isSeatSelected(seatId)) {
      return 'seat selected';
    }
    return this.isSeatBooked(seatId) ? 'seat booked' : 'seat available';
  }

  isSeatBooked(seatId: number): boolean {
    return this.filteredSeats.some(seat => seat.SeatID === seatId && seat.User !== null);
  }

  isSeatSelected(seatId: number): boolean {
    return this.selectedSeats.some(seat => seat.SeatID === seatId);
  }

  selectSeat(seatId: number): void {
    const seatDetails = this.filteredSeats.find(seat => seat.SeatID === seatId);
    
    if (seatDetails) {
      if (!this.isSeatBooked(seatId)) {
        const index = this.selectedSeats.indexOf(seatDetails);
        if (index === -1) {
          this.selectedSeats.push(seatDetails); 
          console.log(`Seat selected: ${seatDetails.SeatNumber}`);
        } else {
          this.selectedSeats.splice(index, 1); 
          console.log(`Seat deselected: ${seatDetails.SeatNumber}`);
        }
      } else {
        console.log(`Seat ID: ${seatId} is booked and cannot be selected.`);
      }
    } else {
      console.error(`Seat details not found for Seat ID: ${seatId}`);
    }
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + parseFloat(seat.Price), 0);
  }

  bookSeats(): void {
    const bookingRequests = this.selectedSeats.map(seat => {
      return this.seatService.bookSeat(seat.SeatID, this.UserID);
    });
  
    // Use forkJoin to wait for all booking requests to complete
    forkJoin(bookingRequests).subscribe(
      responses => {
        console.log('All seats booked successfully:', responses);
        this.router.navigate(['/flight-booked']);
      },
      error => {
        console.error('Error booking seats:', error);
      }
    );
  }

}
