# Generated by Django 5.0.3 on 2024-03-27 17:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_usertoken"),
    ]

    operations = [
        migrations.CreateModel(
            name="Reset",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("email", models.CharField(max_length=255, unique=True)),
                ("token", models.CharField(max_length=255)),
            ],
        ),
    ]
