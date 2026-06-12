from rest_framework import serializers
from .models import Category,GroupApplication,GroupMembership,StudyGroup



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','icon','color']

        
        
class GroupMembershipSerializer(serializers.ModelSerializer):
    
    student_name = serializers.ReadOnlyField(source='student.user.username')
    profile_id = serializers.ReadOnlyField(source='student.id')
    
    class Meta:
        model = GroupMembership
        fields = ['id','profile_id','student_name','role','joined_at']

class StudyGroupSerializer(serializers.ModelSerializer):
    
    creator_name = serializers.ReadOnlyField(source="creator.user.username")
    
    #custom fields for frontend
    current_member_count = serializers.IntegerField(source='member_count',read_only=True)
    user_role = serializers.SerializerMethodField()
    is_full = serializers.BooleanField(read_only=True)
    application_status = serializers.SerializerMethodField()

    
    tags = serializers.ListField(
        child=serializers.CharField(), 
        required=False,
        write_only=True 
    )
    
    display_tags = serializers.SlugRelatedField(
        source='tags',
        many=True,
        read_only=True,
        slug_field='name'
    )

    is_joined = serializers.SerializerMethodField()
    
    class Meta:
        model = StudyGroup 
        fields = [
            'id','room_id','name','description','creator','creator_name','category','tags','visibility','display_tags',
            'current_member_count','user_role','is_full','is_joined','max_members','is_chat_enabled','is_video_enabled','application_status'            
        ]
        read_only_fields=['creator']
        
    def get_application_status(self,obj) :
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None

        user_apps = [
            app for app in obj.applications.all()
            if app.student.user == request.user and app.status == 'pending'
        ]
        
        return "pending" if user_apps else None
            
            
    def get_is_joined(self,obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.memberships.filter(student__user=request.user).exists()

    def get_user_role(self,obj):
        """
        Determines the role of the person currently viewing the group.
        This helps the mobile app decide if it should show the 'Start Video' button.
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            membership = obj.memberships.filter(student__user=request.user).first()
            return membership.role if membership else None
        return None


class GroupApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.user.username')
    
    class Meta:
        model = GroupApplication
        fields = [
            'id', 'group', 'student', 'student_name', 'side', 'status', 'message', 'created_at'
        ]
        read_only_fields = ['status', 'side']

    def validate(self,data):
        """Check if the user is already a member or has an active application."""
        user = self.context['request'].user
        group = data['group']
        
        if GroupMembership.objects.filter(group=group,student__user=user).exists():
            raise serializers.ValidationError('You are already a member of this group.')
        
        if GroupApplication.objects.filter(group=group,student__user=user,status='pending').exists():
            raise serializers.ValidationError("You have a pending application for this group.")

        return data
    