import datetime
import random
import string
from django.shortcuts import render

from django.core.mail import send_mail

from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import Reset, User, UserToken

from .authentication import JWTAuthentication, create_access_token, create_refresh_token, decode_refresh_token

"""
Register user to database
"""
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True) # validation
        serializer.save()

        return Response(serializer.data)

"""
Generate access & refresh token when successfully logging in
"""
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email = email).first() # get user by email

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid credentials")
        
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed("Invalid credentials")
        
        # Generate access token
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        # Save a user token object (with refresh token)
        UserToken.objects.create(
            user_id = user.id,
            token = refresh_token,
            expired_at = datetime.datetime.now() + datetime.timedelta(days = 7)
        )
        
        response = Response()

        # Store the refresh token in the cookies
        response.set_cookie(key = "refresh_token", value = refresh_token, httponly = True) # allow the front end to access the cookie

        response.data = {
            "token": access_token
        }

        return response

"""
Return user data if token is valid
"""
class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

"""
Obtain a new access token using refresh token in cookies
"""
class RefreshAPIView(APIView):

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token") # access cookies
        
        id = decode_refresh_token(refresh_token)

        if not UserToken.objects.filter(user_id = id, 
                                        token=refresh_token, 
                                        expired_at__gt = datetime.datetime.now(tz=datetime.timezone.utc)).exists():
            raise exceptions.AuthenticationFailed("Unauthenticated")


        access_token = create_access_token(id) # create a new access token

        return Response({
            "token": access_token
        })

class LogoutAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token") # access cookies

        UserToken.objects.filter(token = refresh_token).delete()

        response = Response()

        response.delete_cookie(key="refresh_token")

        response.data = {
            "message": "success"
        }

        return response

class ForgotPasswordAPIView(APIView):
    def post(self, request):
        userEmail = request.data['email'] 

        # Generate a random token (10 characters)
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(10))

        Reset.objects.create(
            email = userEmail,
            token = token
        )

        # Connect with frontend
        url = "http://localhost:4200/reset/" + token

        send_mail(
            subject = "QnA: Reset your password",
            message = "Click <a href = '%s'>here</a> to reset your password" % url,
            from_email = "from@example.com",
            recipient_list = [userEmail]
        )

        return Response({
            'message': 'success'
        })

class ResetPasswordAPIView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException("Passwords do not match")
        
        reset_user = Reset.objects.filter(token = data['token']).first()

        if not reset_user:
            raise exceptions.APIException("Invalid verification link")
        
        user = User.objects.filter(email = reset_user.email).first()

        if not user:
            raise exceptions.APIException("User not found")
        
        user.set_password(data['password'])
        user.save()

        return Response({
            'message': 'success'
        })
        