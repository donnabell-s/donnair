from rest_framework import serializers
from .models import User,City,Flight,Seat
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserID', 'username', 'email', 'password', 'Role']
        extra_kwargs = {
            'password':{'write_only': True},
            'Role':{'read_only': True},
        }
        
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['CityID', 'City', 'Country']

class FlightSerializer(serializers.ModelSerializer):
    DepartureCityDetails = CitySerializer(source='DepartureCity', read_only=True)
    ArrivalCityDetails = CitySerializer(source='ArrivalCity', read_only=True)
    DepartureCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), write_only=True)
    ArrivalCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), write_only=True)

    class Meta:
        model = Flight
        fields = [
            'FlightID', 'FlightNumber', 'DepartureCity', 'ArrivalCity',
            'DepartureCityDetails', 'ArrivalCityDetails',  # Include the read-only fields
            'DepartureDateTime', 'ArrivalDateTime', 'AvailableSeats', 'Price'
        ]
        extra_kwargs = {
            'AvailableSeats': {'read_only': True},
        }

    def create(self, validated_data):
        flight = Flight.objects.create(**validated_data)
        self._generate_seats(flight)
        return flight

    def _generate_seats(self, flight):
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
                    Flight=flight,
                    SeatNumber=seat_number,
                    Class=seat_class,
                    User=None
                )


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['SeatID', 'Flight', 'User', 'SeatNumber', 'Class']
        extra_kwargs = {
            'Flight':{'read_only': True},
            'SeatNumber':{'read_only': True},
            'Class':{'read_only': True},
        }


# class UserTicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserTicket
#         fields = ['UserTicketID', 'User', 'Flight', 'Seat']
