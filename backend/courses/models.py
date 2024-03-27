from django.db import models
from users.models import User

# Create your models here.
class Course(models.Model):
   code = models.CharField(max_length = 120)
   name = models.TextField(default = "")
   semester = models.CharField(max_length = 120)


class Assignment(models.Model):
   name = models.TextField(default = "")
   publishedStatus = models.BooleanField()
   courseId = models.ForeignKey(Course, on_delete = models.CASCADE, related_name="course")


class Question(models.Model):
   content = models.TextField(default = "")
   assignmentId = models.ForeignKey(Assignment, on_delete = models.CASCADE, related_name="assignment")
   # studentId = models.ForeignKey()


class Answer(models.Model):
   content = models.TextField(default = "")
   answeredStatus = models.BooleanField(default = False)
   # student id?
   # ta id?
   questionId = models.ForeignKey(Question, on_delete = models.CASCADE, related_name="question")
