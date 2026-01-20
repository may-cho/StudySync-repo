from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # Home & Authentication
    path('', views.home, name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='core/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),

    # Dashboard & Profile
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile/', views.profile_view, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),

    # Timetable
    path('timetable/', views.timetable_view, name='timetable_view'),
    path('timetable/save-timeslot', views.save_timetable_slot,name="save_timetable_slot"),
    path('timetable/add/', views.add_timetable_slot, name='add_timetable_slot'),
    path('timetable/edit/<uuid:slot_id>/', views.edit_timetable_slot, name='edit_timetable_slot'),
    path('timetable/delete/<uuid:slot_id>/', views.delete_timetable_slot, name='delete_timetable_slot'),
    path('timetable/api/save/', views.api_save_timetable, name='api_save_timetable'),

    # Courses
    path('courses/add/', views.add_course, name='add_course'),
    path('courses/remove/<int:course_id>/', views.remove_course, name='remove_course'),

    # Study Partners
    path('partners/find/', views.find_course_partners, name='find_study_partners_view'),
    path('partners/', views.study_partners_list, name='study_partners_list'),

    # Study Groups
    path('groups/', views.group_list, name='group_list'),
    path('groups/create/', views.create_study_group, name='create_study_group'),
    path('groups/<uuid:group_id>/', views.group_detail, name='group_detail'),
    path('groups/<uuid:group_id>/join/', views.join_group, name='join_group'),
    path('groups/<uuid:group_id>/leave/', views.leave_group, name='leave_group'),
    path('groups/<uuid:group_id>/manage/', views.group_manage, name='group_manage'),
    path('groups/<uuid:group_id>/edit/',views.edit_group ,name= "edit_group"),
    path('ajax/load-group-fields/', views.load_group_fields, name='ajax_load_group_fields'),
    path('ajax/load-courses/',views.load_courses,name="ajax_load_courses"),

    # Project Admin
    path('project-admin/', views.project_admin_dashboard, name='project_admin_dashboard'),
    path('project-admin/groups/', views.project_admin_groups, name='project_admin_groups'),

]