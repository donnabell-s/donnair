import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css',
  providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  isSearched = false;

  searchCriteria = {
    DepartureCityDetails: '',
    ArrivalCityDetails: '',
    DepartureDateTime: '',
    ArrivalDateTime: '',
  };

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(
      (data) => {
        this.flights = data;
        this.filteredFlights = [];
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  searchFlights(): void {
      this.isSearched = true;
      this.filteredFlights = this.flights.filter(flight => {
        const matchesDeparture = !this.searchCriteria.DepartureCityDetails || 
          flight.DepartureCityDetails.City.toLowerCase().includes(this.searchCriteria.DepartureCityDetails.toLowerCase());
        const matchesDestination = !this.searchCriteria.ArrivalCityDetails || 
          flight.ArrivalCityDetails.City.toLowerCase().includes(this.searchCriteria.ArrivalCityDetails.toLowerCase());
        const matchesDepartureDT = !this.searchCriteria.DepartureDateTime || 
          new Date(flight.DepartureDateTime).toDateString() === new Date(this.searchCriteria.DepartureDateTime).toDateString();
        const matchesArrivalDT = !this.searchCriteria.ArrivalDateTime || 
          new Date(flight.ArrivalDateTime).toDateString() === new Date(this.searchCriteria.ArrivalDateTime).toDateString();
        return matchesDeparture && matchesDestination && matchesDepartureDT && matchesArrivalDT;
    });
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user ? user.Role === 'admin' : false;
  }
}
