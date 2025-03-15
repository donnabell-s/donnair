import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-flight-book',
  imports: [CommonModule],
  templateUrl: './flight-book.component.html',
  styleUrl: './flight-book.component.css'
})
export class FlightBookComponent {
  rows: number = 21;
  columns: number = 6;
  seats: any[] = [];
  colLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor() {
    this.generateSeats();
  }

  generateSeats(): void {
    for (let row = 1; row <= this.rows; row++) {
      const rowSeats = [];
      for (let col = 1; col <= this.columns; col++) {
        const colLabel = this.colLabels[col - 1];
        rowSeats.push({
          id: `${colLabel}${row}`,
          row: row,
          column: colLabel,
          booked: false
        });
      }
      this.seats.push(rowSeats);
    }
  }

  bookSeat(seat: any): void {
    seat.booked = !seat.booked;
    console.log('Seat Booked:', seat);
  }
}
