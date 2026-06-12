from django.db import models
import uuid
from apps.users.constants import SEMESTER_CHOICES



class Course(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=200)
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES, null=True, blank=True)
    major = models.ManyToManyField("users.Major")
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
    student = models.ForeignKey('users.StudentProfile', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'course']

    def __str__(self):
        return f"{self.student.user.username} - {self.course.code}"
