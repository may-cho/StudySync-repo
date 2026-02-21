from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Major,Course,TimetableSlot,StudyGroup,Interest



@admin.register(Major)
class SubjectAdmin(ImportExportModelAdmin):
    list_display = ('name','code')


@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin) :
    list_display = ('semester',)
    list_filter=('semester',)
    search_fields = ('major',)

@admin.register(TimetableSlot)
class TimetableSlot(ImportExportModelAdmin) :
    list_display = ('custom_name','course')


@admin.register(Interest)
class InterestAdmin(ImportExportModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)


@admin.register(StudyGroup)
class StudyGroupAdmin(ImportExportModelAdmin):
    # Only shows relevant info to help Admin decide on approval
    list_display = ('name', 'group_type', 'course', 'interest', 'is_approved', 'creator')
    list_filter = ('is_approved', 'group_type', 'created_at')
    search_fields = ('name', 'description')

    # Allows superuser to approve multiple groups quickly from the list view
    actions = ['approve_study_groups']

    def approve_study_groups(self, request, queryset):
        queryset.update(is_approved=True)

    approve_study_groups.short_description = "Approve selected groups (Verify Education focus)"

    def get_readonly_fields(self, request, obj=None):
        """Optional: Make details read-only for anyone who isn't a superuser"""
        if not request.user.is_superuser:
            return [f.name for f in self.model._meta.fields if f.name != 'is_approved']
        return super().get_readonly_fields(request, obj)
    