import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search-.component.css'],
})
export class SearchComponent {
  searchCriteria = {
    departureCity: '',
    destinationCity: '',
    date: '',
  };

  searchResults: Flight[] = [];
  isSearched = false;

  constructor(private flightService: FlightService) {}

  searchFlights(): void {
    this.isSearched = true;

    this.searchResults = this.flightService.searchFlights(
      this.searchCriteria.departureCity,
      this.searchCriteria.destinationCity,
      this.searchCriteria.date
    );
  }
}
