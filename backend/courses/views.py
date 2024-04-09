import datetime
import random
import string
from django.shortcuts import render

from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response

from users.models import InstructorUserPermissions

from .serializers import AnswerSerializer, CourseSerializer, QuestionSerializer
from .models import Course

"""
Register course to database
"""
class CreateCourseAPIView(APIView):
    def post(self, request):
        permission_classes = (InstructorUserPermissions,)
        serializer = CourseSerializer(data = request.data)
        serializer.is_valid(raise_exception=True) # validation
        serializer.save()
        return Response(serializer.data)

"""
Get questions data 
"""
class GetQuestionsAPIView(APIView):
    def get(self, request):
        return Response(QuestionSerializer(request.question).data)

"""
Post answer to question
"""
class PostAnswerAPIView(APIView):
    def post(self, request):
        serializer = AnswerSerializer(data = request.data)
        serializer.is_valid(raise_exception=True) # validation
        serializer.save()
        return Response(serializer.data)