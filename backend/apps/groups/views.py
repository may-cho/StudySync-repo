from rest_framework import permissions,viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response 
from .models import StudyGroup,GroupApplication,GroupMembership,Category,Tag
from apps.users.models import StudentProfile
from .serializers import StudyGroupSerializer,GroupApplicationSerializer,CategorySerializer
from django.db import transaction
from django.db.models import Q



class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    

    def get_queryset(self):
        queryset = StudyGroup.objects.prefetch_related(
            'applications',
            'memberships__student__user'
        )
        
        if self.action in ['apply','search']:
            return queryset.all()

        user = self.request.user
        return queryset.filter(memberships__student__user=user) 

        
        
        
    def perform_create(self,serializer):
        """
        When a user creates a group, we set them as the creator 
        AND automatically make them an Admin member.
        """
   

        tags_data = serializer.validated_data.pop('tags', [])
        with transaction.atomic():
            group = serializer.save(creator=self.request.user.studentprofile)
    
            if tags_data:
               tag_objs = [Tag.objects.get_or_create(name=t.strip())[0] for t in tags_data]
               group.tags.set(tag_objs)

            GroupMembership.objects.create(
                group=group,
                student=self.request.user.studentprofile,
                role='admin'
            )
    
    @action(detail=False,methods=['get'])
    def search(self,request):
        query = request.query_params.get('query','') 

        queryset = StudyGroup.objects.prefetch_related(
            'applications',
            'memberships__student__user'
        ).all()
        
        if queryset:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(tags__name__icontains=query) 
            ).distinct()

        serializer = self.get_serializer(queryset,many=True)
        return Response(serializer.data)
        
        
    @action(detail=False,methods=['get'])
    def categories(self,request,pk=None):
        """
        Endpoint: /api/groups/categories
        """
        categories = Category.objects.all(); 
        serializer = CategorySerializer(categories,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
    @action(detail=False,methods=['get'],url_path="my-groups")
    def my_groups(self,request,pk=None):
        """
        Custom endpoint: /api/groups/my-groups
        Get a complete list of groups the current authenticated user has joined.
        """
        
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
        
        
        

    @action(detail=True, methods=['post'])
    def apply(self,request,pk=None):
        """
        Custom endpoint: /api/groups/{id}/apply/
        Allows a student to request to join a group.
        """

        # Print the pk to your terminal to verify it's the right string
        print(f"DEBUG: Attempting to join group with ID: {pk}")
        
        # Try manual fetch to see the error
        try:
            group = StudyGroup.objects.get(pk=pk)
        except StudyGroup.DoesNotExist:
            return Response({"error": f"Group {pk} not found in database"}, status=404)

        group = self.get_object()
        student,created = StudentProfile.objects.get_or_create(user=request.user)

        
        serializer = GroupApplicationSerializer(
            data={'group': group.id, 'student': student.id , 'side': 'request'},
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Application sent!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def respond_to_application(self,request,pk=None):
        """
        Endpoint: /api/groups/{id}/respond_to_application/
        Body: {"application_id": "...", "action": "accept" or "reject"}
        """
        
        group = self.get_object()
        
        if group.creator != request.user.studentprofile:
            return Response({'error': "Only the admin can do this."},status=403)

        app_id = request.data.get('application_id')
        action_choice = request.data.get('action')

        
        try:
            application = GroupApplication.objects.get(id=app_id,group=group)
            if action_choice == 'accept':
                application.accept()
                return Response({"status" : "Member accepted!"})
            else: 
                application.status = 'rejected' 
                application.save()
                return Response({"status": "Application rejected."})
        except GroupApplication.DoesNotExist:
            return Response({'error': "Application not found."},status=404)
            
                