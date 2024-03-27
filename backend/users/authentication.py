import jwt, datetime
from json import dumps

from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication, get_authorization_header

from .serializers import UserSerializer
from .models import User

class JWTAuthentication(BaseAuthentication):
    """
    Authenticate login request. 
    Return user object if success; throw an exception otherwise
    """
    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        # If a token is passed in the header
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')

            id = decode_access_token(token)

            user = User.objects.get(pk = id)

            return (user, None) # avoid the "cannot unpack non-iterable User object" error

        raise exceptions.AuthenticationFailed("Unauthenticated")

"""
Serialize datetime object to JSON
"""
def json_serializer(obj):
    if (isinstance(obj, (datetime.datetime, datetime.date))):
        return obj.isoformat()

"""
Create an access token for user

params:
* id: user id
"""
def create_access_token(id):
    return jwt.encode({
        'user_id': id,
        'exp_time': dumps(datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(seconds = 30), default = json_serializer), # valid within 30 seconds
        'created_at': dumps(datetime.datetime.now(tz=datetime.timezone.utc), default = json_serializer)
    }, "access_secret", algorithm = "HS256")

"""
Decode access token

params:
* token: access token

Return: user id
"""
def decode_access_token(token):
    try:
        payload = jwt.decode(token, "access_secret", algorithms = "HS256")
        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed("Unauthenticated")
    
"""
Create an refresh token for user
(long-lived token used to obtain a renewed access token)

params:
* id: user id
"""
def create_refresh_token(id):
    return jwt.encode({
        'user_id': id,
        'exp_time': dumps(datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(days = 7), default = json_serializer), # valid within 7 days
        'created_at': dumps(datetime.datetime.now(tz=datetime.timezone.utc), default = json_serializer)
    }, "refresh_secret", algorithm = "HS256")

"""
Decode refresh token

params:
* token: refresh token

Return: user id
"""
def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, "refresh_secret", algorithms = "HS256")
        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed("Unauthenticated")