from rest_framework.serializers import ModelSerializer
from .models import User 

"""
Serialize user response 
"""
class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'name', 'email', 'password'] # only return these values

        extra_kwargs = {
            "password": {"write_only": True} # hash password 
        }
    
    # Will be called when a user is created
    def create(self, validated_data):
        password = validated_data.pop('password', None) # extract the password field (return None if not exists)
        instance = self.Meta.model(**validated_data) # create user with data (other than password)

        if password is not None:
            instance.set_password(password)
        
        instance.save()
        return instance
