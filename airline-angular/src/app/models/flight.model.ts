export interface Flight {
    id: number; // Unique identifier for the flight
    flightNumber: string; // Flight number (e.g., "AA123")
    departureCity: string; // Departure city (e.g., "New York")
    destinationCity: string; // Destination city (e.g., "Los Angeles")
    departureTime: string; // Departure time (e.g., "2023-10-15T10:00:00")
    arrivalTime: string; // Arrival time (e.g., "2023-10-15T13:00:00")
    price: number; // Price of the flight (e.g., 200)
}