import datetime
from django.shortcuts import render
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import User, UserToken

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