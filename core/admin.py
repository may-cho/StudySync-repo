from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Major,Course 



@admin.register(Major)
class SubjectAdmin(ImportExportModelAdmin):
    list_display = ('name',)


@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin) :
    list_display = ('semester',)
    list_filter=('semester',)
    search_fields = ('major',)

