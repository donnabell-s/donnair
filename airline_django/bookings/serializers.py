from rest_framework import serializers
from .models import User,City,Flight,Seat,UserTicket
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserID', 'username', 'email', 'password', 'Role']
        extra_kwargs = {'password':{'write_only': True}}

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['CityID', 'City', 'Country']

class FlightSerializer(serializers.ModelSerializer):
    # DepartureCity = CitySerializer(read_only=True)
    # ArrivalCity = CitySerializer(read_only=True)
    # DepartureCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    # ArrivalCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    # For reading (displaying city details in the frontend)
    DepartureCityDetails = CitySerializer(source='DepartureCity', read_only=True)
    ArrivalCityDetails = CitySerializer(source='ArrivalCity', read_only=True)

    # For writing (accepting city IDs when creating/updating flights)
    DepartureCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), write_only=True)
    ArrivalCity = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), write_only=True)

    class Meta:
        model = Flight
        # fields = ['FlightID', 'FlightNumber', 'DepartureCity', 'ArrivalCity', 'DepartureDateTime', 'ArrivalDateTime', 'AvailableSeats', 'Price']
        fields = [
            'FlightID', 'FlightNumber', 'DepartureCity', 'ArrivalCity',
            'DepartureCityDetails', 'ArrivalCityDetails',  # Include the read-only fields
            'DepartureDateTime', 'ArrivalDateTime', 'AvailableSeats', 'Price'
        ]
        extra_kwargs = {
            'AvailableSeats': {'read_only': True},  # Make it read-only so it's not required in the request
        }


# class BookingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Booking
#         fields = ['BookingID', 'User', 'Flight', 'BookingDateTime', 'NumberOfPassengers', 'TotalPrice']

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['SeatID', 'Flight', 'SeatNumber', 'IsBooked']


class UserTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTicket
        fields = ['UserTicketID', 'User', 'Flight', 'Seat']
