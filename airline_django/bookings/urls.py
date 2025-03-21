from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bookings.views import UserViewSet, CityViewSet, FlightViewSet, SeatViewSet ,Home
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cities', CityViewSet)
router.register(r'flights', FlightViewSet)
# router.register(r'bookings', BookingViewSet)
router.register(r'seats', SeatViewSet)
# router.register(r'usertix', UserTicketViewSet)

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('', Home.as_view()),
]
