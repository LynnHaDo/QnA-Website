from django.db import models
from django.contrib.auth.models import AbstractUser, Permission

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

class InstructorUserPermissions(Permission):
   permissions = (
         ("create_course", "Can create a course"),
         ("edit_course", "Can edit a course"),
         ("view_students", "Can view all students"),
         ("edit_students", "Can edit all users"),
         ("view_questions", "Can view all questions"),
         ("view_answers", "Can view all answers"),
         ("assign_questions", "Can assign questions to TAs"),
         ("edit_answers", "Can edit answers"),
         ("publish_assignment", "Can publish assignment"),
   )
      

class TAUserPermissions(Permission):
   permissions = (
         ("view_students", "Can view all students"),
         ("view_questions", "Can view all questions"),
         ("view_answers", "Can view all answers"),
         ("edit_answers", "Can edit answers")
    )
      

class StudentUserPermissions(Permission):
   permissions = (
         ("view_answers_student", "Can view all answers to questions asked"),
         ("view_questions_student", "Can view all questions asked before")
      )
      
