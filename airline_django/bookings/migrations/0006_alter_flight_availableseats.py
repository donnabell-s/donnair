# Generated by Django 5.1.6 on 2025-03-13 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0005_remove_seat_booking_userticket_delete_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='AvailableSeats',
            field=models.IntegerField(default=128),
        ),
    ]
