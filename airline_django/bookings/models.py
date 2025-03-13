from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    UserID = models.AutoField(primary_key=True)
    Role = models.CharField(max_length=10, choices=[('customer', 'Customer'), ('admin', 'Admin')], default='customer')

    def __str__(self):
        return self.email

class City(models.Model):
    CityID = models.AutoField(primary_key=True)
    City = models.CharField(max_length=100)
    Country = models.CharField(max_length=100)

    def __str__(self):
        return self.City

class Flight(models.Model):
    FlightID = models.AutoField(primary_key=True)
    FlightNumber = models.CharField(max_length=10)
    DepartureCity = models.ForeignKey(City, on_delete=models.CASCADE, related_name='departures', null=True)
    ArrivalCity = models.ForeignKey(City, on_delete=models.CASCADE, related_name='arrivals', null=True)
    DepartureDateTime = models.DateTimeField()
    ArrivalDateTime = models.DateTimeField()
    AvailableSeats = models.IntegerField(default=128)
    Price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.FlightNumber} ({self.DepartureCity} to {self.ArrivalCity})"

# class Booking(models.Model):
#     BookingID = models.AutoField(primary_key=True)
#     User = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     Flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
#     BookingDateTime = models.DateTimeField()
#     NumberOfPassengers = models.IntegerField()
#     TotalPrice = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"Booking {self.BookingID} by {self.User.Name}"

class Seat(models.Model):
    SeatID = models.AutoField(primary_key=True)
    Flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    SeatNumber = models.CharField(max_length=10)
    IsBooked = models.BooleanField(default=False)
    # Booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Seat {self.SeatNumber} on Flight {self.Flight.FlightNumber}"

class UserTicket(models.Model):
    UserTicketID = models.AutoField(primary_key=True)
    User = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tickets')
    Flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='tickets')
    Seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name='tickets')
    # Booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='tickets', null=True, blank=True)

    def __str__(self):
        return f"Ticket {self.UserTicketID} for {self.User.email} on Flight {self.Flight.FlightNumber} (Seat {self.Seat.SeatNumber})"