from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, timedelta
import uuid


# class User(AbstractUser):
#     """
#     Custom User model extending Django's AbstractUser
#     """
#     # University choices
#     UNIVERSITY_CHOICES = [
#         ('UCSY', 'University of Computer Studies Yangon (UCSY)'),
#         ('UCSM', 'University of Computer Studies Mandalay (UCSM)'),
#         ('OTHER', 'Other University'),
#     ]
#
#     # Major choices
#     MAJOR_CHOICES = [
#         ('SE', 'Software Engineering'),
#         ('CSF', 'Cyber Security & Forensics'),
#         ('HPC', 'High Performance Computing'),
#         ('BIS', 'Business Information System'),
#         ('KE', 'Knowledge Engineering'),
#         ('ES', 'Embedded Systems'),
#         ('CCN', 'Computer Communication and Networks'),
#         ('CS', 'Computer Science'),
#         ('IT', 'Information Technology'),
#         ('OTHER', 'Other'),
#     ]
#
#     # Year choices
#     YEAR_CHOICES = [
#         (1, 'First Year'),
#         (2, 'Second Year'),
#         (3, 'Third Year'),
#         (4, 'Fourth Year'),
#         (5, 'Fifth Year'),
#     ]
#
#     # Study preference choices
#     STUDY_PREFERENCE_CHOICES = [
#         ('individual', 'Individual'),
#         ('group', 'Group'),
#         ('both', 'Both'),
#     ]
#
#     # User fields
#     email = models.EmailField(unique=True, verbose_name='email address')
#     university = models.CharField(max_length=50, choices=UNIVERSITY_CHOICES)
#     major = models.CharField(max_length=50, choices=MAJOR_CHOICES)
#     year = models.IntegerField(choices=YEAR_CHOICES)
#     student_id = models.CharField(max_length=20, unique=True)
#     phone = models.CharField(max_length=20, blank=True)
#     bio = models.TextField(blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
#
#     # Study preferences
#     preferred_study_hours = models.IntegerField(
#         default=2,
#         validators=[MinValueValidator(1), MaxValueValidator(8)],
#         help_text="Preferred number of study hours per session"
#     )
#     study_preference = models.CharField(
#         max_length=20,
#         choices=STUDY_PREFERENCE_CHOICES,
#         default='both'
#     )
#
#     # Timestamps
#     date_joined = models.DateTimeField(default=timezone.now)
#     last_login = models.DateTimeField(null=True, blank=True)
#
#     class Meta:
#         verbose_name = 'User'
#         verbose_name_plural = 'Users'
#         ordering = ['username']
#
#     def __str__(self):
#         return f"{self.username} - {self.get_major_display()}"
#
#     def get_full_name(self):
#         """Return first_name plus last_name with a space in between."""
#         full_name = f"{self.first_name} {self.last_name}"
#         return full_name.strip()
#
#     def get_short_name(self):
#         """Return the short name for the user."""
#         return self.first_name
#
#     @property
#     def is_student(self):
#         """Check if user is a student (all users in this system are students)."""
#         return True
#
#     def get_completed_courses_count(self):
#         """Get count of completed courses."""
#         return self.user_courses.filter(grade__isnull=False).count()
#
#     def get_current_courses(self):
#         """Get current semester courses."""
#         # This would need to be implemented based on your semester logic
#         return self.user_courses.filter(grade__isnull=True)

# class University(models.Model):
#     name = models.CharField(max_length=200)
#     short_name = models.CharField(max_length=50, blank=True)
#
#     def __str__(self):
#         return self.name
#
#     class Meta:
#         verbose_name_plural = "Universities"


class Major(models.Model):
    MAJOR_CHOICES = [
        ('1', 'Software Engineering'),
        ('2', 'Knowledge Engineering'),
        ('3', 'High Performance Computing'),
        ('4', 'Cyber Security & Forensics'),
        ('5', 'Business Information Systems (BIS)'),
        ('6', 'Embedded Systems'),
        ('7', 'Computer Communication and Networks')
    ]

    name = models.CharField(max_length=50, choices=MAJOR_CHOICES)
    code = models.CharField(max_length=20)

    # university = models.ForeignKey(University, on_delete=models.CASCADE)

    def __str__(self):
        return f" {self.code} - {self.name}"

class StudentProfile(models.Model):
    YEAR_CHOICES = [
        (1, 'First Year'),
        (2, 'Second Year'),
        (3, 'Third Year'),
        (4, 'Fourth Year'),
        (5, 'Fifth Year'),
    ]

    SEMESTER_CHOICES = [
        ('1', 'Semester 1'),
        ('2', 'Semester 2'),
        ('3', 'Semester 3'),
        ('4', 'Semester 4'),
        ('5', 'Semester 5'),
        ('6', 'Semester 6'),
        ('7', 'Semester 7'),
        ('8', 'Semester 8'),
        ('9', 'Semester 9'),
        ('10', 'Semester 10'),

    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # university = models.ForeignKey(University, on_delete=models.CASCADE)
    major = models.ForeignKey(Major, on_delete=models.CASCADE, null=True, blank=True)
    year = models.IntegerField(choices=YEAR_CHOICES)
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES, default='1')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Study preferences
    preferred_study_days = models.CharField(max_length=100, default='Mon,Tue,Wed,Thu,Fri')
    preferred_study_start = models.TimeField(default='16:00')  # 4 PM
    preferred_study_end = models.TimeField(default='22:00')  # 10 PM
    weekend_study = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.major.name}"

    @property
    def is_project_admin(self):
        return self.user.is_superuser

    def get_courses(self):
        """Get all courses this student is taking"""
        return Course.objects.filter(studentcourse__student=self).distinct()


class Course(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=200)
    semester = models.CharField(max_length=2, choices=StudentProfile.SEMESTER_CHOICES, null=True, blank=True)
    major = models.ManyToManyField(Major)
    credits = models.IntegerField(default=3)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['code', 'semester'], 
                name='unique_course_code_per_semester'
            )
        ]

class StudentCourse(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'course']

    def __str__(self):
        return f"{self.student.user.username} - {self.course.code}"


class TimetableSlot(models.Model):
    DAY_CHOICES = [
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]

    SLOT_TYPE_CHOICES = [
        ('class', 'Class'),
        ('self_study', 'Self Study'),
        ('break', 'Break'),
        ('activity', 'Activity'),
        ('free', 'Free Time'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)

    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    slot_type = models.CharField(
        max_length=20,
        choices=SLOT_TYPE_CHOICES,
        default='free'  
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    custom_name = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['day', 'start_time']

    def __str__(self):
        if self.slot_type == 'class' and self.course:
            return f"{self.course.code} ({self.day} {self.start_time})"
        return f"{self.custom_name or self.get_slot_type_display()} ({self.day} {self.start_time})"

    def is_weekday(self):
        return self.day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

    def is_weekend(self):
        return self.day in ['Sat', 'Sun']

    def is_free_time(self):
        return self.slot_type in ['free', 'self_study']
    def get_color(self):
        type_colors = {
            'class': '#6366f1',    
            'self_study': '#8b5cf6',
            'break': '#10b981',     
            'activity': '#f59e0b',  
            'free': '#3b82f6'     
        }
        return type_colors.get(self.slot_type, '#6366f1') 
    def get_styles(self):
        total_height = 1200 
        start_mins = self.start_time.hour * 60 + self.start_time.minute
        
        end_hour = self.end_time.hour
        end_minute = self.end_time.minute
        
        if end_hour == 0 and end_minute == 0:
            end_mins = 1440
        else:
            end_mins = end_hour * 60 + end_minute

        try:
            day_idx = int(self.day) 
        except (ValueError, TypeError):
            days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            day_idx = days.index(self.day) if self.day in days else 0
                
        left_percent = day_idx * (100 / 7)
        
        top = (start_mins / 1440) * total_height
        duration_mins = end_mins - start_mins
        
        if duration_mins < 0:
            duration_mins = 1440 - start_mins

        height = (duration_mins / 1440) * total_height
        width = 100 / 7

        return f"top: {top}px; left: {left_percent}%; height: {height}px; width: {width}%; position: absolute;"
        
class StudyGroup(models.Model):
    GROUP_TYPE_CHOICES = [
        ('major', 'Major-Based'),
        ('course', 'Course-Based'),
        # ('free_time', 'Free Time Matching'),
        ('general', 'General Study'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    group_type = models.CharField(max_length=20, choices=GROUP_TYPE_CHOICES)
    study_day = models.CharField(max_length=100)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)

    # For major-based groups
    major = models.ForeignKey(Major, on_delete=models.CASCADE, null=True, blank=True)

    # For course-based groups
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    semester = models.CharField(max_length=2, choices=StudentProfile.SEMESTER_CHOICES, null=True, blank=True)
    # For free time matching
    # preferred_day = models.CharField(max_length=3, choices=TimetableSlot.DAY_CHOICES, null=True, blank=True)
    # preferred_start_time = models.TimeField(null=True, blank=True)
    # preferred_end_time = models.TimeField(null=True, blank=True)

    # Project admin override
    project_admin_managed = models.BooleanField(default=False)

    # Automatically managed
    auto_created = models.BooleanField(default=False)
    # Group details
    creator = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='created_groups')
    max_members = models.IntegerField(default=200)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def member_count(self):
        return self.memberships.count()

    @property
    def is_full(self):
        return self.member_count >= self.max_members

    def get_available_slots(self):
        """Get all available study time slots for group members"""
        members = StudentProfile.objects.filter(
            group_memberships__group=self
        )

        # # Get common free times
        # slots = {}
        # for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']:
        #     # Check if any member prefers this day
        #     day_members = members.filter(
        #         preferred_study_days__contains=day
        #     )
        #     if day_members.exists():
        #         # Get overlapping free times
        #         slots[day] = self._find_common_free_time(day, members)
        # return slots

    def _find_common_free_time(self, day, members):
        """Find common free time for all members on a given day"""
        # This would implement time intersection logic
        # For now, return default times
        if day in ['Sat', 'Sun']:
            return {
                'start': '06:00',
                'end': '22:00',
                'availability': len(members)
            }
        else:
            return {
                'start': '16:00',
                'end': '22:00',
                'availability': len(members)
            }

    def is_admin(self, user):
        """Check if user is admin of this group"""
        try:
            profile = StudentProfile.objects.get(user=user)
            if self.creator.user == user or profile.is_project_admin:
                return True
            membership = self.memberships.get(student=profile)
            return membership.role in ['admin', 'project_admin']
        except:
            return False

    def is_member(self, user):
        """Check if user is member of this group"""
        try:
            profile = StudentProfile.objects.get(user=user)
            return self.memberships.filter(student=profile).exists()
        except:
            return False


# Add this to your core/models.py

class GroupInvitation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('expired', 'Expired'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='invitations')
    invited_by = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='sent_invitations')
    invited_student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='received_invitations')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['group', 'invited_student']
        ordering = ['-created_at']

    def __str__(self):
        return f"Invitation to {self.group.name} for {self.invited_student.user.username}"

    def is_expired(self):
        if self.expires_at:
            return timezone.now() > self.expires_at
        return False

    def accept(self):
        self.status = 'accepted'
        self.save()
        # Add student to group
        GroupMembership.objects.get_or_create(
            group=self.group,
            student=self.invited_student,
            defaults={'role': 'member'}
        )

    def decline(self):
        self.status = 'declined'
        self.save()


class GroupMembership(models.Model):
    ROLE_CHOICES = [
        ('project_admin', 'Project Admin'),
        ('admin', 'Group Admin'),
        ('moderator', 'Moderator'),
        ('member', 'Member'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='memberships')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='group_memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['group', 'student']

    def __str__(self):
        return f"{self.student.user.username} - {self.group.name}"


# class FreeTimeMatch(models.Model):
#     """Automatically matches students based on free time and common interests"""
#     student1 = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='matches_as_student1')
#     student2 = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='matches_as_student2')
#     day = models.CharField(max_length=3, choices=TimetableSlot.DAY_CHOICES)
#     start_time = models.TimeField()
#     end_time = models.TimeField()
#     match_score = models.FloatField(default=0.0)
#     matched_at = models.DateTimeField(auto_now_add=True)
#     is_group_created = models.BooleanField(default=False)
#
#     class Meta:
#         unique_together = ['student1', 'student2', 'day', 'start_time']
#
#     def __str__(self):
#         return f"{self.student1.user.username} & {self.student2.user.username} - {self.day} {self.start_time}"

class CourseGroupMatch(models.Model):
    """Automatic matching of students in same courses for group formation"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('group_created', 'Group Created'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    initiator = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='initiated_matches')
    target_student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='received_matches')
    # common_free_days = models.CharField(max_length=100, blank=True)
    # common_free_times = models.TextField(blank=True)  # JSON string of common times
    match_score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['course', 'initiator', 'target_student']
        ordering = ['-match_score', '-created_at']

    def __str__(self):
        return f"{self.initiator.user.username} -> {self.target_student.user.username} - {self.course.code}"

class StudySession(models.Model):
    """Individual study sessions for groups"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='sessions')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=200, blank=True)
    agenda = models.TextField(blank=True)
    created_by = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['date', 'start_time']

    def __str__(self):
        return f"{self.group.name} - {self.date} {self.start_time}"

class SessionAttendance(models.Model):
    ATTENDANCE_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('excused', 'Excused'),
    ]

    session = models.ForeignKey(StudySession, on_delete=models.CASCADE, related_name='attendances')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=ATTENDANCE_CHOICES, default='present')
    joined_at = models.DateTimeField(null=True, blank=True)
    left_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ['session', 'student']

    def __str__(self):
        return f"{self.student.user.username} - {self.session}"
