from django.contrib import admin
from .models import Category,StudyGroup, GroupMembership, GroupApplication

admin.site.register(StudyGroup)
admin.site.register(GroupMembership)
admin.site.register(GroupApplication)
admin.site.register(Category)