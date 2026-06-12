from rest_framework import viewsets,permissions ,status
from .models import StudentProfile

from .serializers import StudentProfileSerializer,MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken



class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    
    def create(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email
                },
                "access" : str(refresh.access_token),
                "refresh": str(refresh),
                "message": "Registeration Successfull"
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentProfileViewSet(viewsets.ModelViewSet):
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudentProfile.objects.filter(user=self.request.user)
    
    def perform_create(self,serializer) :
        serializer.save(user=self.request.user)

class MyTokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StudentProfile.objects.filter(user=self.request.user)
    
    @action(detail=False,methods=['get','patch'], url_path='me')
    def me(self,request):
        """
        Endpoint: /api/users/profile/me/
        Automatically identifies the user via their JWT token.
        """
        
        profile,created = StudentProfile.objects.get_or_create(user=self.request.user)
        
        if self.request.method == 'PATCH':
            serializer = self.get_serializer(profile,data=self.request.data, partial=True)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)