from django.contrib.auth import login
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.db.models import Q, Count
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import datetime, date, time, timedelta
import json
from .models import StudyGroup, StudentProfile, GroupMembership
from .forms import StudyGroupForm
from django.db.models import Prefetch

from django.views.decorators.http import require_http_methods

from .matching_algorithm import find_course_study_partners, find_course_study_partners, suggest_group_times, \
    get_common_courses, calculate_compatibility
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q, Count
from datetime import datetime, date, time, timedelta
from .models import *
from .forms import *
from .matching_algorithm import find_course_study_partners, suggest_group_times

from django.http import JsonResponse
from django.views.decorators.http import require_POST
# from .models import GroupInvitation, CourseGroupMatch

def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'core/home.html')

from django.contrib.auth.decorators import user_passes_test
from .models import StudentProfile, StudyGroup, Major


@login_required
def dashboard(request):
    try:
        # Get the profile - use StudentProfile (Model), not StudentProfileForm (Form)
        profile = StudentProfile.objects.get(user=request.user)
    except StudentProfile.DoesNotExist:
        # Create a default profile if it doesn't exist
        return redirect('register')

    # Get today's schedule
    today = date.today()
    day_name = today.strftime('%a')
    today_slots = TimetableSlot.objects.filter(
        student=profile,
        day=day_name
    ).order_by('start_time')

    # Get study groups
    study_groups = StudyGroup.objects.filter(
        memberships__student=profile
    )[:5]

    # Get course matches
    course_matches = CourseGroupMatch.objects.filter(
        Q(initiator=profile) | Q(target_student=profile),
        status='pending'
    ).order_by('-match_score')


    # Get courses
    courses = StudentCourse.objects.filter(student=profile)

    # Get upcoming study sessions
    upcoming_sessions = StudySession.objects.filter(
        group__memberships__student=profile,
        date__gte=today
    ).order_by('date', 'start_time')[:5]

    context = {
        'profile': profile,
        'today_slots': today_slots,
        'study_groups': study_groups,
        'course_matches': course_matches,
        'course_matches_count': course_matches.count(),
        'courses': courses,
        'upcoming_sessions': upcoming_sessions,
        'today': today,
    }


    return render(request, 'core/dashboard.html', context)

@login_required
def find_study_partners(request):
    """Find classmates for group study"""
    profile = get_object_or_404(StudentProfile, user=request.user)

    
    user_courses = profile.get_courses();
    # Get recent classmates (simple version)
    recent_classmates = StudentProfile.objects.filter(
        studentcourse__course__in=user_courses
    ).exclude(
        user=request.user
    ).distinct().select_related('user')[:4]  # Just get 4 recent classmates

    if request.method == 'POST':
        course_id = request.POST.get('course_id')
        if course_id:
            course = get_object_or_404(Course, id=course_id)
            # Run matching algorithm
            matches = find_course_study_partners(profile, course)

            if len(matches) > 0:
                messages.success(request, f'Found {len(matches)} potential study partners for {course.code}!')
            else:
                messages.info(request, f'No matching study partners found for {course.code}.')

            return redirect('study_partners_list', course_id=course.id)
        else:
            messages.error(request, 'Please select a course.')
            return redirect('find_study_partners')

    context = {
        'profile': profile,
        'user_courses': user_courses,
        'recent_classmates': recent_classmates,
    }
    return render(request, 'core/find_study_partners.html', context)

def study_partners_list(request, course_id=None):
    viewer_profile = request.user.studentprofile

    # 1. Get the actual Course IDs for the viewer
    # Make sure we are getting the ID of the Course, not the StudentCourse record
    user_course_ids = Course.objects.filter(
        studentcourse__student=viewer_profile
    ).values_list('id', flat=True)

    # 2. Base Filter
    partners_filter = StudentProfile.objects.exclude(id=viewer_profile.id)

    if course_id:
        partners = partners_filter.filter(studentcourse__course_id=course_id)
    else:
        partners = partners_filter.filter(studentcourse__course_id__in=user_course_ids)

    # 3. The Prefetch Fix
    # We must prefetch 'studentcourse_set' because that is the related_name
    # from StudentCourse to StudentProfile
    partners = partners.distinct().select_related('user').prefetch_related(
        Prefetch(
            'studentcourse_set',
            queryset=StudentCourse.objects.filter(course_id__in=user_course_ids).select_related('course'),
            to_attr='shared_courses'
        )
    )

    return render(request, 'core/study_partners_list.html', {
        'partners': partners,
    })

def register(request):
    if request.method == 'POST':
        # Split the form data for user and profile
        user_form = UserRegisterForm(request.POST, prefix='user')
        profile_form = StudentProfileForm(request.POST, request.FILES, prefix='profile')

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            profile_form.save_m2m()

            login(request, user)
            return redirect('dashboard')
        else:
            # Print errors for debugging
            print("User form errors:", user_form.errors)
            print("Profile form errors:", profile_form.errors)
            messages.error(request, 'Please correct the errors below.')
    else:
        user_form = UserRegisterForm(prefix='user')
        profile_form = StudentProfileForm(prefix='profile')

    context = {
        'user_form': user_form,
        'profile_form': profile_form,
    }

    return render(request, 'core/register.html', context)

@login_required
def timetable_view(request):
    profile = get_object_or_404(StudentProfile,user=request.user)
    slots = TimetableSlot.objects.filter(student=request.user.studentprofile)
    courses = profile.get_courses()
    day_map = {'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6}
    for slot in slots:
        slot.day_index = day_map.get(slot.day, 0)
    context = {
        'timetable_slots': slots,
        'courses' : courses
    }
    return render(request, 'core/timetable.html', context)

@login_required
def add_timetable_slot(request):
    profile = get_object_or_404(StudentProfile, user=request.user)

    if request.method == 'POST':
        form = TimetableSlotForm(request.POST)  # Use the Form class, not Model
        if form.is_valid():
            slot = form.save(commit=False)
            slot.student = profile
            slot.save()
            messages.success(request, 'Time slot added successfully!')
            return redirect('timetable_view')
    else:
        form = TimetableSlotForm()  # Form instance

    context = {
        'form': form,
        'profile': profile,
    }
    return render(request, 'core/add_timetable_slot.html', context)

@login_required
def edit_timetable_slot(request, slot_id):
    profile = get_object_or_404(StudentProfile, user=request.user)
    slot = get_object_or_404(TimetableSlot, id=slot_id, student=profile)

    if request.method == 'POST':
        form = TimetableSlotForm(request.POST, instance=slot)  # Form with instance
        if form.is_valid():
            form.save()
            messages.success(request, 'Time slot updated successfully!')
            return redirect('timetable_view')
    else:
        form = TimetableSlotForm(instance=slot)

    context = {
        'form': form,
        'slot': slot,
    }
    return render(request, 'core/edit_timetable_slot.html', context)

@login_required
def delete_timetable_slot(request, slot_id):
    profile = get_object_or_404(StudentProfile, user=request.user)
    slot = get_object_or_404(TimetableSlot, id=slot_id, student=profile)

    if request.method == 'POST':
        slot.delete()
        messages.success(request, 'Time slot deleted successfully!')

    return redirect('timetable_view')

@login_required
def create_study_group(request):
    profile = get_object_or_404(StudentProfile, user=request.user)

    if request.method == 'POST':
        form = StudyGroupForm(request.POST)  
    
       
        if form.is_valid():
            group = form.save(commit=False)
            group.creator = profile

            # If user is project admin, mark as project admin managed
            if profile.is_project_admin:
                group.project_admin_managed = True

            group.save()
            
            #Added to timeslot
            days = group.study_day.split(",");
            slots = [
                TimetableSlot(
                    day=d.strip(),
                    start_time=group.start_time,
                    end_time=group.end_time,
                    student=profile,
                    custom_name=group.name,
                    slot_type="activity"
                )
                for d in days
            ]
            
            TimetableSlot.objects.bulk_create(slots);

            # Add creator as admin
            role = 'project_admin' if profile.is_project_admin else 'admin'
            GroupMembership.objects.create(
                group=group,
                student=profile,
                role=role
            )

            # Create chat room
            from chat.models import ChatRoom
            ChatRoom.objects.create(group=group)

            messages.success(request, 'Study group created successfully!')
            return redirect('group_detail', group_id=group.id)
        else: 
            print('Form is invalid')
    else:
        form = StudyGroupForm()  # Form instance
    courses = Course.objects.all();
    
    
    context = {
        'form': form,
        'profile': profile,
        'user_courses' : courses
       
    }
    return render(request, 'core/create_study_group.html', context)

def load_group_fields(request):
    selected_type = request.GET.get('group_type')
    form = StudyGroupForm()
    
    return render(request, 'core/partials/group_type_fields.html', {
        'selected_type': selected_type,
        'form': form
    })

def load_courses(request): 
    semester_id = request.GET.get('semester')
    courses = Course.objects.filter(semester=semester_id).order_by('name')
    return render(request,'core/partials/course_dropdown_list_options.html',{'courses': courses})

from django.utils import timezone

@login_required
def group_detail(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)
    profile = get_object_or_404(StudentProfile, user=request.user)

    # 1. Get the SINGLE membership for the logged-in user
    user_mem = GroupMembership.objects.filter(group=group, student=profile).first()

    if not user_mem:
        messages.error(request, 'You are not a member of this group')
        return redirect('group_list')

    # 2. Get counts based on the user's last view timestamps
    chat_room = getattr(group, 'chat_room', None)
    new_messages_count = 0
    if chat_room:
        new_messages_count = chat_room.messages.filter(
            timestamp__gt=user_mem.last_chat_view
        ).count()

    new_posts_count = group.posts.filter(
        created_at__gt=user_mem.last_feed_view
    ).count()

    # 3. Fetch ALL memberships for the members list card
    all_memberships = group.memberships.all().select_related('student__user')

    context = {
        'group': group,
        'memberships': all_memberships, # Used for the loop in HTML
        'is_admin': group.is_admin(request.user),
        'is_creator': (group.creator == profile),
        'new_messages_count': new_messages_count,
        'new_posts_count': new_posts_count,
    }
    return render(request, 'core/group_detail.html', context)

def group_list(request):
    # Use select_related to get the profile and user in one database hit
    profile = get_object_or_404(StudentProfile.objects.select_related('user', 'major'), user=request.user)

    # 1. Get IDs of all courses the user is currently taking
    user_course_ids = StudentCourse.objects.filter(student=profile).values_list('course_id', flat=True)

    # 2. Get groups user is already a member of
    my_groups = StudyGroup.objects.filter(
        memberships__student=profile
    ).order_by('-created_at')

    # 3. Get Recommended Groups
    # We look for groups that match the user's courses OR their major
    recommended_groups = StudyGroup.objects.filter(
        is_active=True
    ).exclude(
        memberships__student=profile # Don't recommend groups they are already in
    ).filter(
        Q(course_id__in=user_course_ids) | # Groups for the courses they are taking
        Q(major=profile.major)             # Groups for their major
    ).distinct().order_by('-created_at')[:5]

    context = {
        'my_groups': my_groups,
        'recommended_groups': recommended_groups,
        'profile': profile,
    }
    return render(request, 'core/group_list.html', context)

@login_required
def join_group(request, group_id):
    profile = get_object_or_404(StudentProfile, user=request.user)
    group = get_object_or_404(StudyGroup, id=group_id)

    # Check if already member
    if group.is_member(request.user):
        messages.warning(request, 'You are already a member of this group')
        return redirect('group_detail', group_id=group_id)

    # Check if group is full
    if group.member_count >= group.max_members:
        messages.error(request, 'This group is full')
        return redirect('group_detail', group_id=group_id)

    # Join group
    GroupMembership.objects.create(
        group=group,
        student=profile,
        role='member'
    )

    messages.success(request, f'You have joined {group.name}')
    return redirect('group_detail', group_id=group_id)

@login_required
def leave_group(request, group_id):
    if request.method == 'POST':
        profile = get_object_or_404(StudentProfile, user=request.user)
        group = get_object_or_404(StudyGroup, id=group_id)

        try:
            membership = GroupMembership.objects.get(group=group, student=profile)

            # Prevent creator from leaving without transferring ownership
            if group.creator == profile:
                messages.error(request, 'Group creator cannot leave. Transfer ownership first.')
                return redirect('group_manage', group_id=group.id)

            membership.delete()
            messages.success(request, f'You have successfully left {group.name}.')
            return redirect('group_list')

        except GroupMembership.DoesNotExist:
            messages.error(request, 'You are not a member of this group.')
            return redirect('group_list')

    return redirect('group_detail', group_id=group_id)

@login_required
def group_manage(request, group_id):
    """View to manage member roles, removals, and group deletion"""
    group = get_object_or_404(StudyGroup, id=group_id)
    profile = get_object_or_404(StudentProfile, user=request.user)

    # Check if the user is the creator (needed for group deletion)
    is_creator = (group.creator == profile)

    if not group.is_admin(request.user):
        messages.error(request, 'You do not have permission to manage roles.')
        return redirect('group_detail', group_id=group.id)

    if request.method == 'POST':
        action = request.POST.get('action')
        student_id = request.POST.get('student_id')

        # 1. DELETE GROUP ACTION
        if action == 'delete_group':
            if is_creator:
                group_name = group.name
                group.delete()
                messages.success(request, f'Group "{group_name}" has been deleted.')
                return redirect('group_list')
            else:
                messages.error(request, 'Only the group creator can delete this group.')

        # 2. PROMOTE TO ADMIN
        elif action == 'add_admin':
            membership = get_object_or_404(GroupMembership, group=group, student_id=student_id)
            membership.role = 'admin'
            membership.save()
            messages.success(request, 'Member promoted to Admin.')

        # 3. REMOVE MEMBER
        elif action == 'remove_member':
            membership = get_object_or_404(GroupMembership, group=group, student_id=student_id)
            if membership.student != group.creator:
                membership.delete()
                messages.success(request, 'Member removed.')
            else:
                messages.error(request, 'The creator cannot be removed.')

        return redirect('group_manage', group_id=group.id)

    memberships = GroupMembership.objects.filter(group=group).select_related('student__user')
    return render(request, 'core/group_manage.html', {
        'group': group,
        'memberships': memberships,
        'is_creator': is_creator,
    })

@login_required
def edit_group(request, group_id):
    group = get_object_or_404(StudyGroup, id=group_id)

    # Check if user is an admin
    if not group.is_admin(request.user):
        messages.error(request, "You don't have permission to edit this group.")
        return redirect('group_detail', group_id=group.id)

    if request.method == 'POST':
        form = StudyGroupForm(request.POST, request.FILES, instance=group)
        if form.is_valid():
            form.save()
            messages.success(request, 'Group updated successfully!')
            return redirect('group_detail', group_id=group.id)
    else:
        form = StudyGroupForm(instance=group)

    # THIS RETURN MUST BE OUTSIDE THE IF STATEMENTS
    return render(request, 'core/edit_group.html', {
        'form': form,
        'group': group
    })

# @user_passes_test(lambda u: u.is_superuser)
# def project_admin_dashboard(request):
#     # For superuser, get or create profile
#     try:
#         profile = StudentProfile.objects.get(user=request.user)
#     except StudentProfile.DoesNotExist:
#         # Create a profile for superuser
#         profile = StudentProfile.objects.create(
#             user=request.user,
#             major='SE',
#             year=1,
#             is_project_admin=True
#         )
#
#     # Get statistics
#     total_groups = StudyGroup.objects.count()
#     total_students = StudentProfile.objects.count()
#     total_members = GroupMembership.objects.count()
#     active_groups = StudyGroup.objects.filter(is_active=True).count()
#
#     # Get recent groups
#     recent_groups = StudyGroup.objects.all().order_by('-created_at')[:10]
#
#     # Get groups needing attention
#     inactive_groups = StudyGroup.objects.filter(is_active=False)[:5]
#
#     context = {
#         'profile': profile,
#         'total_groups': total_groups,
#         'total_students': total_students,
#         'total_members': total_members,
#         'active_groups': active_groups,
#         'recent_groups': recent_groups,
#         'inactive_groups': inactive_groups,
#     }
#     return render(request, 'core/project_admin_dashboard.html', context)


# @user_passes_test(lambda u: u.is_superuser)
# def project_admin_groups(request):
#     groups = StudyGroup.objects.all().order_by('-created_at')
#
#     if request.method == 'POST':
#         group_id = request.POST.get('group_id')
#         action = request.POST.get('action')
#
#         try:
#             group = StudyGroup.objects.get(id=group_id)
#
#             if action == 'toggle_active':
#                 group.is_active = not group.is_active
#                 group.save()
#                 messages.success(request, f'Group {"activated" if group.is_active else "deactivated"}')
#
#             elif action == 'add_as_admin':
#                 # Get or create profile for superuser
#                 profile, created = StudentProfile.objects.get_or_create(
#                     user=request.user,
#                     defaults={'major': 'SE', 'year': 1, 'is_project_admin': True}
#                 )
#                 membership, created = GroupMembership.objects.get_or_create(
#                     group=group,
#                     student=profile,
#                     defaults={'role': 'project_admin'}
#                 )
#                 if not created:
#                     membership.role = 'project_admin'
#                     membership.save()
#                 messages.success(request, f'Added as admin to {group.name}')
#
#             elif action == 'delete_group':
#                 group_name = group.name
#                 group.delete()
#                 messages.success(request, f'Group "{group_name}" deleted')
#
#         except StudyGroup.DoesNotExist:
#             messages.error(request, 'Group not found')
#
#         return redirect('project_admin_groups')
#
#     context = {
#         'groups': groups,
#     }
#     return render(request, 'core/project_admin_groups.html', context)


@login_required
def profile_view(request):
    profile = get_object_or_404(StudentProfile, user=request.user)
    courses = StudentCourse.objects.filter(student=profile).select_related('course')

    # Get groups user is member of
    my_groups = StudyGroup.objects.filter(
        memberships__student=profile
    ).order_by('-created_at')

    # Get user's free time slots
    free_time_slots = TimetableSlot.objects.filter(
        student=profile,
        slot_type__in=['free', 'self_study', 'break']
    ).order_by('day', 'start_time')

    context = {
        'profile': profile,
        'courses': courses,
        'my_groups': my_groups,
        'free_time_slots': free_time_slots,
    }
    return render(request, 'core/profile.html', context)


@login_required
def edit_profile(request):
    profile = get_object_or_404(StudentProfile, user=request.user)

    if request.method == 'POST':
        form = StudentProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile') # Goes to profile page on success
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = StudentProfileForm(instance=profile)

    return render(request, 'core/edit_profile.html', {'form': form, 'profile': profile})


@login_required
def student_profile(request, user_id):
    # 1. Get the User object for the profile you are viewing
    target_user = get_object_or_404(User, id=user_id)

    # 2. Use 'target_profile' consistently to avoid collision with function name
    target_profile = target_user.studentprofile
    viewer_profile = request.user.studentprofile

    # 3. Query courses using the Profile instances
    student_courses = Course.objects.filter(studentcourse__student=target_profile)
    viewer_courses = Course.objects.filter(studentcourse__student=viewer_profile)

    # 4. Find shared courses
    shared_courses = student_courses.filter(id__in=viewer_courses)

    # 5. USER'S GROUPS (All groups viewer joined)
    user_groups = StudyGroup.objects.filter(
        memberships__student=viewer_profile
    ).distinct()

    # 6. VIEWER'S ADMIN GROUPS (Groups they can invite others to)
    user_admin_groups = user_groups.filter(
        memberships__role__in=['admin', 'project_admin']
    ).distinct()

    # 7. ✅ FIXED: Use 'target_profile' here instead of 'student_profile'
    pending_invites = GroupInvitation.objects.filter(
        invited_student=target_profile,
        status='pending'
    ).values_list('group_id', flat=True)

    already_member_group_ids = StudyGroup.objects.filter(
        memberships__student=target_profile
    ).values_list('id', flat=True)

    context = {
        'student': target_user,
        'student_profile': target_profile,
        'shared_courses': shared_courses,
        'user_groups': user_groups,
        'pending_invites': list(pending_invites),
        'user_admin_groups': user_admin_groups,
        'already_member_group_ids': list(already_member_group_ids),  # Added this
    }
    return render(request, 'core/student_profile.html', context)


@login_required
def add_course(request):
    profile = get_object_or_404(StudentProfile, user=request.user)
    if request.method == 'POST':
       
        course_ids= request.POST.getlist('course_ids')
        try:
            for course_id in course_ids:
                course = Course.objects.get(id=course_id)
                StudentCourse.objects.get_or_create(
                    student=profile,
                    course=course
                )
            messages.success(request, f'Added {course.code} to your courses')
            return redirect('profile')
        except Course.DoesNotExist:
            messages.error(request, 'Course not found')

    # Get courses for user's major
    courses = Course.objects.filter(
        major=profile.major,
        semester=profile.semester
    ).distinct().exclude(
        id__in=profile.studentcourse_set.values_list('course_id', flat=True)
    )

    context = {
        'courses': courses,
        'profile': profile,
    }
    return render(request, 'core/add_course.html', context)

@login_required
def remove_course(request, course_id):
    profile = get_object_or_404(StudentProfile, user=request.user)

    try:
        course = Course.objects.get(id=course_id)
        StudentCourse.objects.filter(student=profile, course=course).delete()
        messages.success(request, f'Removed {course.code} from your courses')
    except Course.DoesNotExist:
        messages.error(request, 'Course not found')

    return redirect('profile')

@csrf_exempt
@login_required
def api_save_timetable(request):
    """API endpoint to save timetable via AJAX"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            profile = StudentProfile.objects.get(user=request.user)

            # Clear existing timetable
            TimetableSlot.objects.filter(student=profile).delete()

            # Add new slots
            for slot_data in data.get('slots', []):
                TimetableSlot.objects.create(
                    student=profile,
                    day=slot_data['day'],
                    start_time=slot_data['start_time'],
                    end_time=slot_data['end_time'],
                    slot_type=slot_data['slot_type'],
                    course_id=slot_data.get('course_id'),
                    custom_name=slot_data.get('custom_name', '')
                )

            return JsonResponse({'success': True, 'message': 'Timetable saved successfully'})

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})


# @login_required
# def course_partners_list(request, course_id):
#     """List potential study partners for a course"""
#     profile = get_object_or_404(StudentProfile, user=request.user)
#     course = get_object_or_404(Course, id=course_id)
#
#     # Get classmates
#     classmates = StudentProfile.objects.filter(
#         studentcourse__course=course
#     ).exclude(
#         user=request.user
#     ).distinct()
#
#     # Check for existing matches
#     existing_matches = CourseGroupMatch.objects.filter(
#         course=course,
#         initiator=profile
#     ).values_list('target_student_id', flat=True)
#
#     # Get common free times for each classmate
#     classmates_with_info = []
#     for classmate in classmates:
#         # Find common free times
#         common_times = suggest_group_times(profile, classmate)
#
#         classmates_with_info.append({
#             'student': classmate,
#             'has_match': classmate.id in existing_matches,
#             'common_times': common_times[:3],  # Top 3 suggestions
#         })
#
#     context = {
#         'profile': profile,
#         'course': course,
#         'classmates': classmates_with_info,
#         'total_classmates': classmates.count(),
#     }
#     return render(request, 'core/course_partners_list.html', context)

@login_required
def send_group_invite(request):
    """Send invitation to form a study group"""
    if request.method == 'POST':
        course_id = request.POST.get('course_id')
        student_ids = request.POST.getlist('student_ids')

        course = get_object_or_404(Course, id=course_id)
        profile = get_object_or_404(StudentProfile, user=request.user)

        # Create matches for each student
        for student_id in student_ids:
            target_student = get_object_or_404(StudentProfile, id=student_id)

            # Calculate match score based on common free times
            common_times = suggest_group_times(profile, target_student)
            match_score = len(common_times) * 10

            # Create or update match
            CourseGroupMatch.objects.update_or_create(
                course=course,
                initiator=profile,
                target_student=target_student,
                defaults={
                    'match_score': match_score,
                    'common_free_days': ','.join([t['day'] for t in common_times[:3]]),
                    'common_free_times': json.dumps(common_times),
                }
            )

        messages.success(request, f'Invitations sent to {len(student_ids)} classmates!')
        return redirect('pending_invites')

    return redirect('dashboard')


@login_required
def create_course_group(request, course_id):
    """Create a study group for a specific course"""
    profile = get_object_or_404(StudentProfile, user=request.user)
    course = get_object_or_404(Course, id=course_id)

    if request.method == 'POST':
        form = StudyGroupForm(request.POST)
        if form.is_valid():
            group = form.save(commit=False)
            group.course = course
            group.semester = course.semester
            group.group_type = 'course'
            group.creator = profile
            group.save()

            # Add creator as admin
            GroupMembership.objects.create(
                group=group,
                student=profile,
                role='admin'
            )

            messages.success(request, f'Study group "{group.name}" created for {course.code}!')
            return redirect('group_detail', group_id=group.id)
    else:
        # Suggest group name and times
        suggested_name = f"{course.code} Study Group - Semester {course.semester}"
        suggested_times = suggest_group_times(profile, None, course)

        form = StudyGroupForm(initial={
            'name': suggested_name,
            'course': course,
        })

    context = {
        'form': form,
        'profile': profile,
        'course': course,
        'suggested_times': suggested_times,
    }
    return render(request, 'core/create_course_group.html', context)


# @login_required
# def auto_create_group(request, course_id):
#     """Automatically create group with best matching times"""
#     profile = get_object_or_404(StudentProfile, user=request.user)
#     course = get_object_or_404(Course, id=course_id)
#
#     # Get all classmates
#     classmates = StudentProfile.objects.filter(
#         studentcourse__course=course
#     ).exclude(
#         user=request.user
#     )
#
#     if not classmates.exists():
#         messages.error(request, 'No classmates found for this course.')
#         return redirect('course_partners_list', course_id=course_id)
#
#     # Find best common time
#     best_time = None
#     max_members = 0
#
#     for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']:
#         # Check weekday restrictions
#         if day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']:
#             start_time = time(16, 0)  # 4 PM
#             end_time = time(20, 0)  # 8 PM
#         else:
#             start_time = time(9, 0)  # 9 AM
#             end_time = time(20, 0)  # 8 PM
#
#         # Count available members
#         available_members = classmates.filter(
#             preferred_study_days__contains=day
#         ).count() + 1  # +1 for current user
#
#         if available_members > max_members:
#             max_members = available_members
#             best_time = {
#                 'day': day,
#                 'start_time': start_time,
#                 'end_time': end_time,
#             }
#
#     if best_time:
#         # Create group
#         group = StudyGroup.objects.create(
#             name=f"{course.code} Auto-Group - {best_time['day']}s",
#             description=f"Automatically created study group for {course.code}. Meeting every {best_time['day']} from {best_time['start_time']} to {best_time['end_time']}.",
#             course=course,
#             semester=course.semester,
#             group_type='course',
#             study_day=best_time['day'],
#             study_start_time=best_time['start_time'],
#             study_end_time=best_time['end_time'],
#             creator=profile,
#             auto_created=True,
#         )
#
#         # Add creator
#         GroupMembership.objects.create(
#             group=group,
#             student=profile,
#             role='admin'
#         )
#
#         # Add classmates who are available
#         for classmate in classmates.filter(
#                 preferred_study_days__contains=best_time['day']
#         )[:9]:  # Max 10 members including creator
#             GroupMembership.objects.create(
#                 group=group,
#                 student=classmate,
#                 role='member'
#             )
#
#         messages.success(request, f'Auto-created group with {group.member_count} members!')
#         return redirect('group_detail', group_id=group.id)
#
#     messages.error(request, 'Could not find suitable time for group creation.')
#     return redirect('course_partners_list', course_id=course_id)

@login_required
def create_group_with_student(request, student_id):
    """Create a new group and invite a student"""
    if request.method == 'POST':
        target_user = get_object_or_404(User, id=student_id)
        target_profile = target_user.studentprofile
        viewer_profile = request.user.studentprofile

        print(viewer_profile.preferred_study_end,viewer_profile.preferred_study_days,viewer_profile.preferred_study_start)
        study_day = request.POST.get("study_day",viewer_profile.preferred_study_days)

        #Get form data
        group_name = request.POST.get('group_name')
        group_description = request.POST.get('group_description')
        group_type = request.POST.get('group_type')
        invite_message = request.POST.get('invite_message', '')

        # Validate
        if not group_name or not group_description:
            messages.error(request, 'Group name and description are required.')
            return redirect('student_profile', user_id=student_id)

        # Create the group
        group = StudyGroup.objects.create(
            name=group_name,
            description=group_description,
            group_type=group_type,
            study_day=study_day,
            start_time=request.POST.get('start_time') or viewer_profile.preferred_study_start,
            end_time=request.POST.get('end_time') or viewer_profile.preferred_study_end,
            max_members=request.POST.get('max_members', 20),
            creator=viewer_profile,
        )

        #Save timeslot
        slots = []
        for day in study_day.split(","):
            #create a slot for the current viewer
            slots.append(TimetableSlot(
                student=viewer_profile,
                day=day,
                start_time=group.start_time,
                end_time=group.end_time,
                slot_type="activity",
                custom_name=group_name
            ))
        TimetableSlot.objects.bulk_create(slots)


        # Add creator as admin
        GroupMembership.objects.create(
            group=group,
            student=viewer_profile,
            role='admin'
        )

        # Create invitation
        invitation = GroupInvitation.objects.create(
            group=group,
            invited_by=viewer_profile,
            invited_student=target_profile,
            message=invite_message,
            expires_at=timezone.now() + timedelta(days=7)
        )

        # Create chat room
        from chat.models import ChatRoom
        ChatRoom.objects.create(group=group)



        messages.success(request,
                         f'Group "{group.name}" created successfully and invitation sent to {target_user.username}!')
        return redirect('group_detail', group_id=group.id)

    return redirect('student_profile', user_id=student_id)


from django.utils import timezone
from datetime import timedelta
from django.db import IntegrityError


@login_required
def invite_to_existing_group(request, student_id):
    """Invite student with graceful warnings instead of crashes"""
    if request.method == 'POST':
        # 1. Get the target student (The person being invited)
        target_user = get_object_or_404(User, id=student_id)
        target_profile = getattr(target_user, 'studentprofile', None)
        viewer_profile = request.user.studentprofile
        group_id = request.POST.get('group_id')
        invite_message = request.POST.get('invite_message', '')

        if not target_profile:
            messages.error(request, "Target user profile not found.")
            return redirect('student_profile', user_id=student_id)

        try:
            group = StudyGroup.objects.get(id=group_id)

            # 2. Check: Is the user already a member?
            if group.memberships.filter(student=target_profile).exists():
                messages.warning(request, f'{target_user.username} is already a member of this group.')
                return redirect('student_profile', user_id=student_id)

            # 3. Check: Is there already an active/pending invitation?
            # We look for the unique pair (group + target_profile)
            existing_invite = GroupInvitation.objects.filter(
                group=group,
                invited_student=target_profile
            ).first()

            if existing_invite:
                if existing_invite.status == 'pending' and not existing_invite.is_expired():
                    # CASE: Already invited and still waiting
                    messages.info(request, f'An invitation is already pending for {target_user.username}.')
                else:
                    # CASE: Previously invited (declined or expired) - we RE-INVITE
                    existing_invite.status = 'pending'
                    existing_invite.invited_by = viewer_profile
                    existing_invite.message = invite_message
                    existing_invite.created_at = timezone.now()
                    existing_invite.expires_at = timezone.now() + timedelta(days=7)
                    existing_invite.save()

                    messages.success(request, f"Invitation re-sent to {target_user.username}!")
                    # Notify via WebSocket
                    from .utils import trigger_notification_update
                    trigger_notification_update(target_user, f"New invite for {group.name}")
            else:
                # 4. CASE: First time invitation
                GroupInvitation.objects.create(
                    group=group,
                    invited_by=viewer_profile,
                    invited_student=target_profile,
                    message=invite_message,
                    status='pending',
                    expires_at=timezone.now() + timedelta(days=7)
                )
                messages.success(request, f'Invitation sent to {target_user.username}!')

                # Notify via WebSocket
                from .utils import trigger_notification_update
                trigger_notification_update(target_user, f"New invite for {group.name}")

        except StudyGroup.DoesNotExist:
            messages.error(request, 'Group not found.')
        except Exception as e:
            # Catch-all for any other weird errors to prevent 500 pages
            messages.error(request, f"An unexpected error occurred: {str(e)}")

    return redirect('student_profile', user_id=student_id)


from django.contrib import messages
from .models import ActivityNotification, TimetableSlot
from .utils import trigger_notification_update


@login_required
def accept_invitation(request, invitation_id):
    """Accept a group invitation and notify the inviter"""
    invitation = get_object_or_404(GroupInvitation, id=invitation_id, invited_student=request.user.studentprofile)

    if invitation.status == 'pending' and not invitation.is_expired():
        invitation.accept()
        group = invitation.group

        # 1. Update Timetable
        days = group.study_day.split(",")
        slots = [
            TimetableSlot(
                student=request.user.studentprofile,
                slot_type="activity",
                day=d.strip(),
                start_time=group.start_time,
                end_time=group.end_time,
                custom_name=group.name
            )
            for d in days
        ]
        TimetableSlot.objects.bulk_create(slots)

        # 2. Create Activity Notification for the Inviter
        ActivityNotification.objects.create(
            recipient=invitation.invited_by.user,
            sender=request.user,
            notification_type='comment',  # Using comment type or add 'accept' to your model choices
            group=group,
            content_preview=f"Joined the group: {group.name}"
        )

        # 3. Trigger WebSocket update for the Inviter
        trigger_notification_update(
            invitation.invited_by.user,
            message_text=f"{request.user.username} accepted your invite to {group.name}"
        )

        messages.success(request, f'You have joined "{group.name}"!')
        return redirect('group_detail', group_id=group.id)

    elif invitation.is_expired():
        messages.error(request, 'This invitation has expired.')
    else:
        messages.error(request, 'This invitation is no longer valid.')

    return redirect('dashboard')


@login_required
def decline_invitation(request, invitation_id):
    """Decline a group invitation and notify the inviter"""
    invitation = get_object_or_404(GroupInvitation, id=invitation_id, invited_student=request.user.studentprofile)

    if invitation.status == 'pending':
        invitation.decline()

        # Optional: Notify the inviter that the request was declined
        ActivityNotification.objects.create(
            recipient=invitation.invited_by.user,
            sender=request.user,
            notification_type='comment',
            group=invitation.group,
            content_preview=f"Declined the invite to {invitation.group.name}"
        )

        trigger_notification_update(
            invitation.invited_by.user,
            message_text=f"{request.user.username} declined the invite to {invitation.group.name}"
        )

        messages.info(request, f'You have declined the invitation to "{invitation.group.name}".')

    return redirect('dashboard')

@login_required
def invitation_list(request):
    """View all pending invitations"""
    profile = request.user.studentprofile
    pending_invitations = profile.groupinvitation_set.filter(status='pending')

    # Mark expired invitations
    for invitation in pending_invitations:
        if invitation.is_expired():
            invitation.status = 'expired'
            invitation.save()

    context = {
        'pending_invitations': pending_invitations,
        'expired_invitations': profile.groupinvitation_set.filter(status='expired'),
        'responded_invitations': profile.groupinvitation_set.exclude(status='pending').exclude(status='expired'),
    }
    return render(request, 'core/invitation_list.html', context)
@login_required
def pending_invites(request):
    """View and manage pending group invitations"""
    profile = get_object_or_404(StudentProfile, user=request.user)

    # Get invites sent by user
    sent_invites = CourseGroupMatch.objects.filter(
        initiator=profile,
        status='pending'
    ).select_related('course', 'target_student')

    # Get invites received by user
    received_invites = CourseGroupMatch.objects.filter(
        target_student=profile,
        status='pending'
    ).select_related('course', 'initiator')

    context = {
        'profile': profile,
        'sent_invites': sent_invites,
        'received_invites': received_invites,
    }
    return render(request, 'core/pending_invites.html', context)


@login_required
def respond_invite(request, match_id, action):
    """Accept or decline group invitation"""
    profile = get_object_or_404(StudentProfile, user=request.user)
    match = get_object_or_404(CourseGroupMatch, id=match_id, target_student=profile)

    if action == 'accept':
        match.status = 'accepted'
        match.save()

        # Create group or add to existing group
        # You can implement logic to create group here
        messages.success(request, f'Accepted invitation from {match.initiator.user.username} for {match.course.code}')

    elif action == 'decline':
        match.status = 'declined'
        match.save()
        messages.info(request, 'Invitation declined.')

    return redirect('pending_invites')


@login_required
def course_groups(request, course_id=None):
    """View all groups for a course or all courses"""
    profile = get_object_or_404(StudentProfile, user=request.user)

    if course_id:
        course = get_object_or_404(Course, id=course_id)
        groups = StudyGroup.objects.filter(
            course=course,
            is_active=True
        ).order_by('-created_at')
        title = f"Study Groups for {course.code}"
    else:
        # Get groups for user's courses
        user_courses = Course.objects.filter(
            studentcourse__student=profile
        )
        groups = StudyGroup.objects.filter(
            course__in=user_courses,
            is_active=True
        ).order_by('-created_at')
        title = "All Course Study Groups"

    # Check membership status
    groups_with_status = []
    for group in groups:
        is_member = group.is_member(request.user)
        is_admin = group.is_admin(request.user)
        groups_with_status.append({
            'group': group,
            'is_member': is_member,
            'is_admin': is_admin,
        })

    context = {
        'profile': profile,
        'groups': groups_with_status,
        'title': title,
        'course_id': course_id,
    }
    return render(request, 'core/course_groups.html', context)


@login_required
def create_study_session(request, group_id):
    """Create a study session for a group"""
    group = get_object_or_404(StudyGroup, id=group_id)
    profile = get_object_or_404(StudentProfile, user=request.user)

    if not group.is_admin(request.user) and not group.creator == profile:
        messages.error(request, 'Only group admins can create study sessions.')
        return redirect('group_detail', group_id=group_id)

    if request.method == 'POST':
        form = StudySessionForm(request.POST)
        if form.is_valid():
            session = form.save(commit=False)
            session.group = group
            session.created_by = profile
            session.save()

            # Create attendance records for all members
            members = group.memberships.all()
            for membership in members:
                SessionAttendance.objects.create(
                    session=session,
                    student=membership.student,
                )

            messages.success(request, 'Study session created!')
            return redirect('group_detail', group_id=group_id)
    else:
        # Suggest next available time (next occurrence of group's study day)
        today = date.today()
        current_weekday = today.strftime('%a')
        days_ahead = (['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].index(group.study_day) -
                      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].index(current_weekday))
        if days_ahead <= 0:
            days_ahead += 7

        suggested_date = today + timedelta(days=days_ahead)

        form = StudySessionForm(initial={
            'date': suggested_date,
            'start_time': group.study_start_time,
            'end_time': group.study_end_time,
            'location': 'Library Study Room A',
        })

    context = {
        'form': form,
        'group': group,
        'profile': profile,
    }
    return render(request, 'core/create_study_session.html', context)

    
@login_required
def save_timetable_slot(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        profile = get_object_or_404(StudentProfile, user=request.user)
        
        # 1. Extract and Clean Inputs
        title = data.get("title", "").strip()
        slot_type = data.get("slot_type", "free")
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        
        # 2. Validation
        if not title and slot_type != 'class':
            return JsonResponse({'status': 'error', 'message': 'Title cannot be empty.'}, status=400)

        # 3. Handle Course logic vs Custom Name
        course_obj = None
        final_custom_name = title
        
        if slot_type == 'class':
            # Look for the specific course in the student's semester
            course_obj = Course.objects.filter(code=title, semester=profile.semester).first()
            # If it's a class, we usually leave custom_name empty to use the Course name instead
            if course_obj:
                final_custom_name = ""

        # 4. Parse Day Index
        days_map = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        try:
            day_idx = int(data.get('day_index', 0))
            day_str = days_map[max(0, min(6, day_idx))]
        except (ValueError, TypeError):
            day_str = 'Mon'

        # 5. Handle the UUID (raw_id)
        raw_id = data.get('event_id')
        slot_id = None
        if raw_id not in [None, "null", "undefined", "None", ""]:
            try:
                slot_id = uuid.UUID(str(raw_id))
            except (ValueError, TypeError):
                pass

        # 6. The "Single Save" Logic (Refactored)
        # We define what to save in a dictionary to avoid repeating ourselves
        defaults = {
            'day': day_str,
            'start_time': start_time,
            'end_time': end_time,
            'slot_type': slot_type,
            'course': course_obj,
            'custom_name': final_custom_name[:200],
        }

        # update_or_create handles both "Save" and "Update" in one line
        slot, created = TimetableSlot.objects.update_or_create(
            id=slot_id, 
            student=profile,
            defaults=defaults
        )

        return JsonResponse({
            'status': 'success', 
            'id': str(slot.id), 
            'action': 'created' if created else 'updated'
        })

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@login_required
@require_http_methods(["DELETE"])
def delete_timetable_slot(request, slot_id):
    try:
        profile = get_object_or_404(StudentProfile, user=request.user)
        slot = TimetableSlot.objects.filter(id=slot_id, student=profile).first()
        
        if slot:
            slot.delete()
            return JsonResponse({'status': 'success', 'message': 'Deleted'})
        else:
            return JsonResponse({'status': 'success', 'message': 'Already deleted'})
            
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import GroupInvitation, CourseGroupMatch, ActivityNotification


@login_required
def all_notifications(request):
    profile = request.user.studentprofile

    # 1. Fetch Invitations
    invites = GroupInvitation.objects.filter(invited_student=profile).order_by('-created_at')

    # 2. Fetch Matches
    matches = CourseGroupMatch.objects.filter(target_student=profile).order_by('-created_at')

    # 3. Fetch Activity (Likes, Comments, Posts, Acceptances)
    activities = ActivityNotification.objects.filter(recipient=request.user)

    # Combine all lists
    all_notifications = list(invites) + list(matches) + list(activities)

    # Sort by date (newest first)
    all_notifications.sort(key=lambda x: x.created_at, reverse=True)

    # Mark as read
    invites.filter(is_read=False).update(is_read=True)
    matches.filter(is_read=False).update(is_read=True)
    # Ensure activity is also marked read
    activities.filter(is_read=False).update(is_read=True)

    # Trigger a counter reset via WebSocket (optional)
    from .utils import trigger_notification_update
    trigger_notification_update(request.user, message_text="All read")

    return render(request, 'core/all_notifications.html', {
        'notifications': all_notifications
    })

@login_required
@require_POST
def mark_notifications_read(request):
    try:
        profile = request.user.studentprofile
        user = request.user

        # Mark everything as read
        GroupInvitation.objects.filter(invited_student=profile, is_read=False).update(is_read=True)
        CourseGroupMatch.objects.filter(target_student=profile, is_read=False).update(is_read=True)
        ActivityNotification.objects.filter(recipient=user, is_read=False).update(is_read=True)

        # Trigger WebSocket update so the red bubble disappears immediately
        from .utils import trigger_notification_update
        trigger_notification_update(user)

        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)