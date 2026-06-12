from django.db import models,transaction
import uuid




class Tag(models.Model):
    name = models.CharField(max_length=30,unique=True)


class Category(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    color = models.CharField(max_length=7)



class StudyGroup(models.Model):

    VISIBILITY_CHOICES = [
        ('public', 'Public'),   
        ('private', 'Private'), 
        ('hidden', 'Hidden'),    
    ]

    # --- Identity & Metadata ---
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    creator = models.ForeignKey("users.StudentProfile", on_delete=models.CASCADE, related_name='created_groups')
    
   

    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='groups',blank=True,null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='groups')
    
    # --- Status & Permissions ---
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    max_members = models.PositiveIntegerField(default=50) 
    created_at = models.DateTimeField(auto_now_add=True)

    # --- Schedule (Simplified) ---
    # We move the complex "Calculation" logic out of the model
    study_schedule_info = models.TextField(blank=True, help_text="Summary of meeting times")

    
    room_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    is_chat_enabled = models.BooleanField(default=True)
    is_video_enabled = models.BooleanField(default=True)
    visibility = models.CharField(
        max_length=10, 
        choices=VISIBILITY_CHOICES, 
        default='public'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def member_count(self):
        return self.memberships.count()

    @property
    def is_full(self):
        return self.member_count >= self.max_members
    

    
class GroupMembership(models.Model):
    ROLE_CHOICES = [
        ('project_admin', 'Project Admin'),
        ('admin', 'Group Admin'),
        ('moderator', 'Moderator'),
        ('member', 'Member'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='memberships')
    student = models.ForeignKey("users.StudentProfile", on_delete=models.CASCADE, related_name='group_memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)
    class Meta:
       constraints = [
       models.UniqueConstraint(
            fields=['group', 'student'], 
            name='unique_group_membership'
        )
    ]
    def __str__(self):
        return f"{self.student.user.username} - {self.group.name}"


class GroupApplication(models.Model):
    APP_TYPE = [
        ('request', 'Join Request'), # Student wants to join
        ('invite', 'Invitation'),    # Group wants student to join
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='applications')
    student = models.ForeignKey("users.StudentProfile", on_delete=models.CASCADE, related_name='applications')
    side = models.CharField(max_length=10, choices=APP_TYPE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def accept(self):
        with transaction.atomic():
            self.status = 'accepted'
            self.save()
            GroupMembership.objects.get_or_create(
                group=self.group,
                student=self.student,
                defaults={'role': 'member'}
            )

    class Meta:
        unique_together = ['group', 'student']


class StudySession(models.Model):
    DAY_CHOICES = [
        ('MON', 'Monday'), ('TUE', 'Tuesday'), ('WED', 'Wednesday'),
        ('THU', 'Thursday'), ('FRI', 'Friday'), ('SAT', 'Saturday'), ('SUN', 'Sunday'),
    ]

    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, related_name='sessions')
    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=255, blank=True, help_text="Room number or Zoom link")

    def __str__(self):
        return f"{self.group.name} - {self.day} ({self.start_time})"
    
class SessionAttendance(models.Model):
    ATTENDANCE_CHOICES = [
        ('present', 'Present'), ('absent', 'Absent'),
        ('late', 'Late'), ('excused', 'Excused'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(StudySession, on_delete=models.CASCADE, related_name='attendances')
    student = models.ForeignKey("users.StudentProfile", on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=ATTENDANCE_CHOICES, default='present')
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ['session', 'student']