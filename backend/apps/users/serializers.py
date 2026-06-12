from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StudentProfile,Major 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User 
        fields = ['id','username','email','first_name','last_name']

class RegisterSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True,min_length=8)
    confirmed_password =  serializers.CharField(write_only=True)

    class Meta: 
        model = User
        fields = ['username','fullname','email','password','confirmed_password']

    def validate(self,data):
        if data['password'] != data['confirmed_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self,validated_data):
        
        validated_data.pop('confirmed_password')
        fullname = validated_data.pop('fullname')

        name_parts = fullname.split(' ',1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""

        user = User.objects.create_user(
            username= validated_data['username'],
            first_name = first_name,
            last_name = last_name,
            email = validated_data['email'],
            password = validated_data['password']
        )

        StudentProfile.objects.create(user=user)

        return user

        
        

        
class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    major_name = serializers.ReadOnlyField(source="major.name")
    major_details = serializers.SerializerMethodField()
    class Meta:
        model = StudentProfile 
        fields = ['id','user','major','major_name','major_details','year','bio','profile_picture','last_seen']
        read_only_fields = ['last_seen']
        
        
    def get_major_details(self,obj):
        if obj.major:
            return {"id": obj.major , "name": obj.major.name}
        return None
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (these are encoded INSIDE the token)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra data to the JSON response (not encoded in token)
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        
        # Pull the profile ID so the frontend can navigate to /profile/{id} immediately
        if hasattr(self.user, 'studentprofile'):
            data['profile_id'] = self.user.studentprofile.id
        
        return data