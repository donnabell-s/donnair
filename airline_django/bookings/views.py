from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from .models import User,City,Flight,Seat
from .serializers import UserSerializer,CitySerializer,FlightSerializer,SeatSerializer
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

class SeatViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    

# class UserTicketViewSet(viewsets.ModelViewSet):
#     permission_classes = [AllowAny]
#     queryset = UserTicket.objects.all()
#     serializer_class = UserTicketSerializer