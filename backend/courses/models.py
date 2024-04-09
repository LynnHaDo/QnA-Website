from django.db import models
from users.models import User
from django.utils.timezone import now

# Create your models here.
class Course(models.Model):
   code = models.CharField(max_length = 120)
   name = models.TextField(default = "")
   semester = models.CharField(max_length = 120)
   students = models.ManyToManyField(User, related_name = "students")
   tas = models.ManyToManyField(User, related_name = "tas")
   instructors = models.ManyToManyField(User, related_name = "instructors")
   # Course.students.all(), .students.filter(...) and all of the other methods available to querysets.

class CustomDateTimeField(models.DateTimeField):
   def value_to_string(self, obj):
      val = self.value_from_object(obj)
      if val:
         val.replace(microsecond = 0)
         return val.isoformat()
      return ''

class Assignment(models.Model):
   name = models.TextField(default = "")
   publishedStatus = models.BooleanField()
   dueDate = CustomDateTimeField(auto_now_add=True, blank=True)
   courseId = models.ForeignKey(Course, on_delete = models.CASCADE, related_name="course")


class Question(models.Model):
   content = models.TextField(default = "")
   assignmentId = models.ForeignKey(Assignment, on_delete = models.CASCADE, related_name="assignment")
   studentId = models.ForeignKey(User, on_delete = models.CASCADE, related_name="student", null = True)

class Answer(models.Model):
   content = models.TextField(default = "")
   answeredStatus = models.BooleanField(default = False)
   dateSubmitted = CustomDateTimeField(default = now, blank=True)
   taId = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "ta", null = True)
   questionId = models.ForeignKey(Question, on_delete = models.CASCADE, related_name="question")
