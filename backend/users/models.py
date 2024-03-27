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

class UserToken(models.Model):
   user_id = models.IntegerField()
   token = models.CharField(max_length = 255)
   created_at = models.DateTimeField(auto_now_add = True)
   expired_at = models.DateTimeField()

# For resetting password
class Reset(models.Model):
   email = models.CharField(max_length = 255, unique = True)
   token = models.CharField(max_length = 255)