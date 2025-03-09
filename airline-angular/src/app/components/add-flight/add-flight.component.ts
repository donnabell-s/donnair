import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-add-flight',
  imports: [RouterModule, FormsModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {
  newFlight: Flight = {
    id: 0,
    flightNumber: '',
    departureCity: '',
    destinationCity: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
  };



  constructor(private flightService: FlightService, private router: Router) {}

  addFlight(): void{
    this.flightService.addFlight(this.newFlight);
    this.router.navigate(['/home']);
  }
}
