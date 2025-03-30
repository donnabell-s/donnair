from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import transaction
from django.db.models import F

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
    # Price = models.DecimalField(max_digits=10, decimal_places=2)

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
                    seat_price = 80000
                elif row <= 14:
                    seat_class = 'Business Class'
                    seat_price = 50000
                else:
                    seat_class = 'Economy Class'
                    seat_price = 20000

                Seat.objects.create(
                    Flight=self,
                    SeatNumber=seat_number,
                    Class=seat_class,
                    User=None,
                    Price =seat_price
                )

class Seat(models.Model):
    SeatID = models.AutoField(primary_key=True)
    Flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    SeatNumber = models.CharField(max_length=10)
    Class = models.CharField(max_length=15, null=True)
    Price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Seat {self.SeatNumber} on Flight {self.Flight.FlightNumber}"

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        is_booking = self.User is not None

        if is_booking and not is_new:
            with transaction.atomic():
                flight = Flight.objects.select_for_update().get(pk=self.Flight_id)
                print(f"Current AvailableSeats: {flight.AvailableSeats}")
                flight.AvailableSeats -= 1
                print(f"New AvailableSeats: {flight.AvailableSeats}")
                flight.save()

        super().save(*args, **kwargs)

        if not is_booking and self.User is None and not is_new:
            with transaction.atomic():
                flight = Flight.objects.select_for_update().get(pk=self.Flight_id)
                flight.AvailableSeats += 1
                print(f"Seat unbooked: {self.SeatID}, New AvailableSeats: {flight.AvailableSeats}")
                flight.save()



    # def save(self, *args, **kwargs):
    #     is_new = self._state.adding
    #     is_booking = self.User is not None


    #     if is_booking and not is_new:
    #         print(f"Current AvailableSeats: {self.Flight.AvailableSeats}")
    #         self.Flight.AvailableSeats -= 1
    #         print(f"New AvailableSeats: {self.Flight.AvailableSeats}")
    #         self.Flight.save()

    #     super().save(*args, **kwargs)

    #     if not is_booking and self.User is None and not is_new:
    #         self.Flight.AvailableSeats += 1
    #         self.Flight.save()

