# Generated by Django 5.1.6 on 2025-03-11 15:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0004_user_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seat',
            name='Booking',
        ),
        migrations.CreateModel(
            name='UserTicket',
            fields=[
                ('UserTicketID', models.AutoField(primary_key=True, serialize=False)),
                ('Flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='bookings.flight')),
                ('Seat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='bookings.seat')),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Booking',
        ),
    ]
