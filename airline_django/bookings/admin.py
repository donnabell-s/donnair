from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, City, Flight, Seat

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'Role', 'is_staff', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('email', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
        ('Role', {'fields': ('Role',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'Role'),  # Add Role here
        }),
    )

admin.site.register(User, CustomUserAdmin)

admin.site.register(City)
admin.site.register(Flight)
admin.site.register(Seat)
# admin.site.register(UserTicket)