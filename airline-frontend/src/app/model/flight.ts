export interface City{
    CityID: number
    City: string;
    Country: string;
}

export interface Flight{
    FlightID: number;
    FlightNumber: string;
    DepartureCityDetails: City;
    ArrivalCityDetails: City;
    DepartureDateTime: Date;
    ArrivalDateTime: Date;
    AvailableSeats: number;
    Price: number;
}