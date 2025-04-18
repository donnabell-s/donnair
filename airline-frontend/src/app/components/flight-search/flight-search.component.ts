import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
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

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(
      (data) => {
        this.flights = data;
        this.filteredFlights = data;
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

      const flightDepartureDate = new Date(flight.DepartureDateTime);
      const searchDepartureDate = new Date(this.searchCriteria.DepartureDateTime);
      const matchesDepartureDT = !this.searchCriteria.DepartureDateTime || 
        flightDepartureDate.toDateString() === searchDepartureDate.toDateString();

      const flightArrivalDate = new Date(flight.ArrivalDateTime);
      const searchArrivalDate = new Date(this.searchCriteria.ArrivalDateTime);
      const matchesArrivalDT = !this.searchCriteria.ArrivalDateTime || 
        flightArrivalDate.toDateString() === searchArrivalDate.toDateString();

      return matchesDeparture && matchesDestination && matchesDepartureDT && matchesArrivalDT;
    });
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user ? user.Role === 'admin' : false;
  }

  deleteFlight(flight: Flight){
    this.flightService.deleteFlight(flight.FlightID).subscribe(
      (response) =>{
        console.log('Flight Deleted', response);
        this.flights = this.flights.filter(f => f.FlightID !== flight.FlightID);
        this.searchFlights();
      },
      (error) =>{
        console.error('Failed to Delete Flight', error);
      }
    );
  }

  bookFlight(flightId: number): void {
    localStorage.setItem('selectedFlightId', flightId.toString());

    this.router.navigate(['/flight-book']);
  }
}