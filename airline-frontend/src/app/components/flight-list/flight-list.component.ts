import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-flight-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [FlightService]
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user ? user.Role === 'admin' : false;
  }
}