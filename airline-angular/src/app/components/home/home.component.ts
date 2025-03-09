import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  flights: Flight[] = [];
  isUser = false; 

  constructor(private flightService: FlightService, private router: Router) {}
  

  ngOnInit(): void {
    this.isUser = localStorage.getItem('userType') === 'user';
    this.flights = this.flightService.getFlights();
  }

  bookFlight(): void {
  }

  deleteFlight(id: number): void {
    this.flightService.deleteFlight(id);
    this.flights = this.flightService.getFlights(); // Refresh the list
  }
}
