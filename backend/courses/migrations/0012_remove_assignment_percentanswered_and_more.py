# Generated by Django 5.0.3 on 2024-04-29 02:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0011_assignment_numsubmissions_assignment_percentanswered"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="assignment",
            name="percentAnswered",
        ),
        migrations.AddField(
            model_name="assignment",
            name="numAnswered",
            field=models.IntegerField(default=0),
        ),
    ]
