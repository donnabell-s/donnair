# Generated by Django 5.1.6 on 2025-03-15 20:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0008_remove_seat_isbooked_seat_class_seat_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seat',
            old_name='User',
            new_name='UserID',
        ),
    ]
