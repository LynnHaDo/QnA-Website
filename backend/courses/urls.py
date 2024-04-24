from django.contrib import admin
from django.urls import path, include
from .views import CreateCourseAPIView, GetAnswerAPIView, GetAssignmentAPIView, GetAssignmentsAPIView, GetClustersAPIView, GetCoursesAPIView, GetQuestionAPIView, GetQuestionsAPIView, GetStudentAPIView, GetStudentsAPIView, PostAnswerAPIView, GetCourseAPIView, RemoveQuestionAPIView, RemoveStudentAPIView

urlpatterns = [
    path("create-course", CreateCourseAPIView.as_view()),
    path("get-question/<int:q_id>/", GetQuestionAPIView.as_view()),
    path("get-questions/<int:assignment_id>/", GetQuestionsAPIView.as_view()),
    path("remove-question", RemoveQuestionAPIView.as_view()),
    path("get-courses/<int:id>/", GetCourseAPIView.as_view()),
    path("get-courses/<str:email>/", GetCoursesAPIView.as_view()),
    path("get-assignment/<int:id>/", GetAssignmentAPIView.as_view()),
    path("get-assignments/<int:id>/", GetAssignmentsAPIView.as_view()),
    path("get-student/<int:id>/", GetStudentAPIView.as_view()),
    path("get-students/<int:id>/", GetStudentsAPIView.as_view()),
    path("remove-student", RemoveStudentAPIView.as_view()),
    path("get-answer/<int:question_id>", GetAnswerAPIView.as_view()),
    path("send-answer", PostAnswerAPIView.as_view()),
    path("get-clusters/<int:assignment_id>", GetClustersAPIView.as_view())
]