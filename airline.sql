create database airport;
use airport;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each user
    Name VARCHAR(100) NOT NULL,            -- Full name of the user
    Email VARCHAR(100) NOT NULL UNIQUE,    -- Email address (unique for each user)
    Password VARCHAR(255) NOT NULL,        -- Hashed password for authentication
    Role ENUM('Customer', 'Admin') NOT NULL -- Role of the user (Customer or Admin)
);

CREATE TABLE Airport (
    AirportCode CHAR(3) PRIMARY KEY,      -- IATA airport code (e.g., "JFK")
    AirportName VARCHAR(100) NOT NULL,    -- Name of the airport
    City VARCHAR(100) NOT NULL,           -- City where the airport is located
    Country VARCHAR(100) NOT NULL         -- Country where the airport is located
);

CREATE TABLE Flight (
    FlightID INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each flight
    FlightNumber VARCHAR(10) NOT NULL,       -- Flight number (e.g., "AA123")
    DepartureAirport CHAR(3) NOT NULL,       -- Departure airport code
    ArrivalAirport CHAR(3) NOT NULL,         -- Arrival airport code
    DepartureDateTime DATETIME NOT NULL,     -- Scheduled departure date and time
    ArrivalDateTime DATETIME NOT NULL,       -- Scheduled arrival date and time
    AvailableSeats INT NOT NULL,             -- Number of available seats
    Price DECIMAL(10, 2) NOT NULL,           -- Price of the flight
    FOREIGN KEY (DepartureAirport) REFERENCES Airport(AirportCode) ON DELETE CASCADE,
    FOREIGN KEY (ArrivalAirport) REFERENCES Airport(AirportCode) ON DELETE CASCADE
);

CREATE TABLE Booking (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each booking
    UserID INT NOT NULL,                       -- User who made the booking
    FlightID INT NOT NULL,                     -- Flight for which the booking is made
    BookingDateTime DATETIME NOT NULL,         -- Date and time of the booking
    NumberOfPassengers INT NOT NULL,           -- Number of passengers in the booking
    TotalPrice DECIMAL(10, 2) NOT NULL,        -- Total price of the booking
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FlightID) REFERENCES Flight(FlightID) ON DELETE CASCADE
);

CREATE TABLE Seat (
    SeatID INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each seat
    FlightID INT NOT NULL,                  -- Flight to which the seat belongs
    SeatNumber VARCHAR(10) NOT NULL,        -- Seat number (e.g., "A1", "B2")
    IsBooked BOOLEAN DEFAULT FALSE,         -- Indicates if the seat is booked
    BookingID INT DEFAULT NULL,             -- Booking to which the seat is assigned (if booked)
    FOREIGN KEY (FlightID) REFERENCES Flight(FlightID) ON DELETE CASCADE,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID) ON DELETE SET NULL
);

drop schema airport;