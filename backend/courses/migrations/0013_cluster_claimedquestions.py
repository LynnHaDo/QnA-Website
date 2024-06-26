# Generated by Django 5.0.3 on 2024-04-29 14:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0012_remove_assignment_percentanswered_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="cluster",
            name="claimedQuestions",
            field=models.ManyToManyField(
                related_name="claimed_questions", to="courses.question"
            ),
        ),
    ]
