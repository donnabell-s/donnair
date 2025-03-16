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
    AvailableSeats = models.IntegerField(default=126)
    Price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.FlightNumber} ({self.DepartureCity} to {self.ArrivalCity})"

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)

        if is_new:
            self._generate_seats()

    def _generate_seats(self):
        columns = ['A', 'B', 'C', 'D', 'E', 'F']
        rows = range(1, 22)

        for row in rows:
            for column in columns:
                seat_number = f"{column}{row}"
                if row <= 7:
                    seat_class = 'First Class'
                elif row <= 14:
                    seat_class = 'Business'
                else:
                    seat_class = 'Economy'

                Seat.objects.create(
                    Flight=self,
                    SeatNumber=seat_number,
                    Class=seat_class,
                    User=None
                )

class Seat(models.Model):
    SeatID = models.AutoField(primary_key=True)
    Flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    SeatNumber = models.CharField(max_length=10)
    Class = models.CharField(max_length=15, null=True)

    def __str__(self):
        return f"Seat {self.SeatNumber} on Flight {self.Flight.FlightNumber}"

    def save(self, *args, **kwargs):
        # Check if the seat is being created (is a new instance)
        is_new = self._state.adding

        # Check if the seat is being booked (User  is being set)
        is_booking = self.User is not None

        # If the seat is being booked and it's not a new instance, decrement the available seats
        if is_booking and not is_new:
            self.Flight.AvailableSeats -= 1
            self.Flight.save()

        # Call the original save method
        super().save(*args, **kwargs)

        # If the seat is being unbooked (User  is being set to None), increment the available seats
        if not is_booking and self.User is None and not is_new:
            self.Flight.AvailableSeats += 1
            self.Flight.save()

