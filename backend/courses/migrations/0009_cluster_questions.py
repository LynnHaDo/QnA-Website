# Generated by Django 5.0.3 on 2024-04-24 06:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0008_remove_cluster_questions"),
    ]

    operations = [
        migrations.AddField(
            model_name="cluster",
            name="questions",
            field=models.ManyToManyField(
                related_name="questions", to="courses.question"
            ),
        ),
    ]