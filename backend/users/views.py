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

from google.oauth2 import id_token 
from google.auth.transport.requests import Request as GoogleRequest

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

        user = Reset.objects.filter(email = userEmail).first()

        if user:
            setattr(user, 'token', token)
            user.save()
        else:
            Reset.objects.create(
                email = userEmail,
                token = token
            )

        # Connect with frontend
        url = "http://localhost:4200/reset-password/" + token

        send_mail(
            subject = "QnA: Reset your password",
            message = "Click <a href = \"%s\">here</a> to reset your password" % url,
            from_email = "from@example.com",
            recipient_list = [userEmail]
        )

        return Response({
            'message': 'success'
        })

class ResetPasswordAPIView(APIView):
    def post(self, request):
        data = request.data
        
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

class GoogleAuthAPIView(APIView):
    def post(self, request):
        token = request.data['token'] # token sent from frontend

        googleUser = id_token.verify_token(token, GoogleRequest())

        if not googleUser:
            raise exceptions.AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(email=googleUser['email']).first()

        # First time signing in
        if not user: 
            user = User.objects.create(
                first_name = googleUser['first_name'],
                last_name = googleUser['family_name'],
                email = googleUser['email']
            )

            user.set_password(token) # set the password for signing to Google
            user.save() 

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



        