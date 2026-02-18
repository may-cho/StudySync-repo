from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Major,Course,TimetableSlot



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
    