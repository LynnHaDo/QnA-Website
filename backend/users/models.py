from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
   INSTRUCTOR = 1
   TA = 2
   STUDENT = 3

   ROLE_CHOICES = (
      (INSTRUCTOR, "Instructor"),
      (TA, "TA"),
      (STUDENT, "Student")
   )
   
   role = models.PositiveBigIntegerField(choices = ROLE_CHOICES, blank = True, null = True)

   name = models.CharField(max_length = 255)
   email = models.CharField(max_length = 255, unique = True)
   password = models.CharField(max_length = 255)
   username = None # stop the default
  
   USERNAME_FIELD = "email" # sign in using email
   REQUIRED_FIELDS = []


class Course(models.Model):
   code = models.CharField(max_length = 120)
   name = models.TextField(default = "")
   semester = models.CharField(max_length = 120)


class Assignment(models.Model):
   name = models.TextField(default = "")
   publishedStatus = models.BooleanField()
   courseId = models.ForeignKey(Course, on_delete = models.CASCADE, related_name="course")


class Question(models.Model):
   assignmentId = models.ForeignKey(Assignment, on_delete = models.CASCADE, related_name="assignment")
   # student id?


class Answer(models.Model):
   answeredStatus = models.BooleanField(default = False)
   # student id?
   # ta id?
   questionId = models.ForeignKey(Question, on_delete = models.CASCADE, related_name="question")
