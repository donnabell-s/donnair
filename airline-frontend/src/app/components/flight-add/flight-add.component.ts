import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../../model/flight';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './flight-add.component.html',
  styleUrl: './flight-add.component.css',
  providers: [FlightService]
})
export class FlightAddComponent implements OnInit {
cities: City[] = [];

newFlight = {
  FlightNumber: '',
  DepartureCity: 0,
  ArrivalCity: 0,
  DepartureDateTime: '',
  ArrivalDateTime: '',
  // Price: 0,
}

constructor(private flightService: FlightService, private router: Router){}

// selectChange($event: any) {
//   this.newFlight.DepartureCity = this.cities[$event];
// }

  // ngOnInit(): void {
  //   this.flightService.getFlights().subscribe(
  //     (data) => {
  //       this.cities = data.City;
  //     },
  //     (error) => {
  //       console.error('Error fetching flights:', error);
  //     }
  //   );
  // }


  ngOnInit(): void {
  this.flightService.getCities().subscribe(
    (data) => {
      // Ensure data.City is an array of cities
      if (data && Array.isArray(data)) {
        this.cities = data;
        // console.log(this.cities);
      } else {
        console.error('Invalid data structure:', data);
      }
    },
    (error) => {
      console.error('Error fetching flights:', error);
    }
  );
}

  addFlight(): void{
    console.log(this.newFlight)
    this.flightService.addFlight(this.newFlight).subscribe(
      (response) => {
        console.log('Flight Added', response);
        this.newFlight = {
          FlightNumber: '',
          DepartureCity: 0,
          ArrivalCity: 0,
          DepartureDateTime: '',
          ArrivalDateTime: '',
          // Price: 0,
      };
      this.router.navigate(['/flight-search']);
      },
      (error) => {
        console.error('Failed to add flight', error);
      }
    );
  }
}
