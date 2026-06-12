from rest_framework import serializers
from .models import Post,Comment


class PostSerializer(serializers.ModelSerializer):
    
    group_name = serializers.CharField(source='group')
    
    class Meta:
        model = Post
        fields = ['id','group','group_name','author','author_username','content','image','tags','status','is_approved',
                  'total_likes','has_liked','is_author','created_at']
        read_only_fields= ['author','status','is_approved']