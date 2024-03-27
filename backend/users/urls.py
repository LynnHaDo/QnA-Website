from django.contrib import admin
from django.urls import path, include
from .views import ForgotPasswordAPIView, RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView, ResetPasswordAPIView

urlpatterns = [
    path("register", RegisterAPIView.as_view()),
    path("login", LoginAPIView.as_view()),
    path("user", UserAPIView.as_view()),
    path("refresh", RefreshAPIView.as_view()),
    path("logout", LogoutAPIView.as_view()),
    path("forgot", ForgotPasswordAPIView.as_view()),
    path("reset", ResetPasswordAPIView.as_view())
]