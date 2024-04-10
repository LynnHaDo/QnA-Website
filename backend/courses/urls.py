from django.contrib import admin
from django.urls import path, include
from .views import CreateCourseAPIView, GetAssignmentsAPIView, GetCoursesAPIView, GetQuestionsAPIView, GetStudentsAPIView, PostAnswerAPIView, GetCourseAPIView

urlpatterns = [
    path("create-course", CreateCourseAPIView.as_view()),
    path("get-courses/<int:id>/", GetCourseAPIView.as_view()),
    path("get-courses/<str:email>/", GetCoursesAPIView.as_view()),
    path("get-assignments/<int:id>/", GetAssignmentsAPIView.as_view()),
    path("get-students/<int:id>/", GetStudentsAPIView.as_view()),
    path("get-question", GetQuestionsAPIView.as_view()),
    path("send-answer", PostAnswerAPIView.as_view())
]