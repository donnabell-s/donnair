from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from .models import User,City,Flight,Seat,UserTicket
from .serializers import UserSerializer,CitySerializer,FlightSerializer,SeatSerializer,UserTicketSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes, action
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class Home(APIView):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class CityViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = City.objects.all()
    serializer_class = CitySerializer

class FlightViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    # @action(detail=False, methods=['POST'], permission_classes=[permissions.AllowAny])
    # def new(self, requests):
    #     serializer = self.get_serializer(request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class BookingViewSet(viewsets.ModelViewSet):
#     permission_classes = [AllowAny]
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer

class SeatViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer

class UserTicketViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = UserTicket.objects.all()
    serializer_class = UserTicketSerializer