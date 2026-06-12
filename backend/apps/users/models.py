from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class Interest(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, choices=[
        ('programming', 'Programming & Tech'),
        ('language', 'Foreign Languages'),
        ('hobby', 'Hobbies & Vibes')
    ])

    def __str__(self):
        return self.name

class AdminProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"System Admin: {self.user.username}"
    
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
    last_seen = models.DateTimeField(default=timezone.now)
    major = models.ForeignKey("users.Major", on_delete=models.CASCADE, null=True, blank=True)
    year = models.IntegerField(choices=YEAR_CHOICES,null=True, blank=True)
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES, default='1')
    interests = models.ManyToManyField(Interest, blank=True)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

    # Study preferences
    preferred_study_days = models.CharField(max_length=100, default='Mon,Tue,Wed,Thu,Fri')
    preferred_study_start = models.TimeField(default='16:00')  # 4 PM
    preferred_study_end = models.TimeField(default='22:00')  # 10 PM
    weekend_study = models.BooleanField(default=True)

    def __str__(self):
        major_name = self.major.name if self.major else "No Major"
        return f"{self.user.username} - {major_name}"

    @property
    def is_project_admin(self):
        return self.user.is_superuser

    def get_courses(self):
        """Get all courses this student is taking"""
        from django.apps import apps
        Course = apps.get_model('courses', 'Course')
        return Course.objects.filter(studentcourse__student=self).distinct()
    
    @property
    def is_online(self) :
       if self.last_seen:
            # Consider online if active in the last 5 minutes
            return timezone.now() < self.last_seen + timedelta(minutes=5)
       return False 

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