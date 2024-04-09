from django.contrib import admin
from django.urls import path, include
from .views import CreateCourseAPIView, GetQuestionsAPIView, PostAnswerAPIView

urlpatterns = [
    path("create-course", CreateCourseAPIView.as_view()),
    path("get-question", GetQuestionsAPIView.as_view()),
    path("send-answer", PostAnswerAPIView.as_view())
]