import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [
    {
      id: 1,
      flightNumber: 'AA123',
      departureCity: 'Cebu',
      destinationCity: 'Manila',
      departureTime: '2025-02-03T10:00:00',
      arrivalTime: '2025-02-03T13:00:00',
      price: 2000,
    },
    {
      id: 2,
      flightNumber: 'BB456',
      departureCity: 'Manila',
      destinationCity: 'Cebu',
      departureTime: '2025-02-03T09:00:00',
      arrivalTime: '2023-03-03T12:00:00',
      price: 3500,
    },
  ];

    getFlights(): Flight[] {
      return this.flights;
    }

    searchFlights(departureCity: string, destinationCity: string, date: string): Flight[] {
      return this.flights.filter((flight) => {
        const matchesDeparture = departureCity
          ? flight.departureCity.toLowerCase().includes(departureCity.toLowerCase())
          : true;
        const matchesDestination = destinationCity
          ? flight.destinationCity.toLowerCase().includes(destinationCity.toLowerCase())
          : true;
        const matchesDate = date ? flight.departureTime.startsWith(date) : true;
        return matchesDeparture && matchesDestination && matchesDate;
      });
    }

    // addFlight(newFlight: Flight[]): void{
    //   this.flights.push();
    // }
    addFlight(newFlight: Flight): void {
      newFlight.id = this.flights.length + 1;
      this.flights.push(newFlight);
    }

    deleteFlight(id: number): void {
      this.flights = this.flights.filter((flight) => flight.id !== id);
    }
}
