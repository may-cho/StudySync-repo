from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import *


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'your.email@example.com'
    }))
    first_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'John'
    }))
    last_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Doe'
    }))
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Choose a username'
    }))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Create a strong password'
    }))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Repeat your password'
    }))

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']

        def clean_email(self):
            email = self.cleaned_data.get('email')

            # ✅ Restrict email domain to UCSY only
            if not email.endswith('@ucsy.edu.mm'):
                raise forms.ValidationError('Only @ucsy.edu.mm email addresses are allowed.')

            # ✅ Prevent duplicate email registration
            if User.objects.filter(email=email).exists():
                raise forms.ValidationError('This email is already registered.')

            return email


class StudentProfileForm(forms.ModelForm):
    major = forms.ModelChoiceField(
        queryset=Major.objects.all(),
        empty_label="Select Major",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    year = forms.ChoiceField(
        choices=StudentProfile.YEAR_CHOICES,
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    bio = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Tell us about yourself...'
        })
    )
    profile_picture = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'd-none',  # Hide the ugly default button
            'accept': 'image/*',
            'id': 'imageInput'
        })
    )

    # Set this to False so it doesn't block the save if the checkbox is missing
    terms = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        label='I agree to the Terms of Service'
    )

    interests = forms.ModelMultipleChoiceField(
        queryset=Interest.objects.all(),
        widget=forms.CheckboxSelectMultiple(attrs={
            'class': 'form-check-input'
        }),
        required=False,
        help_text="Select topics you're interested in."
    )

    class Meta:
        model = StudentProfile
        # IMPORTANT: All fields rendered in HTML must be listed here
        fields = [
            'major', 'year', 'semester', 'bio', 'profile_picture','interests'
        ]
        widgets = {
            'semester': forms.Select(attrs={'class': 'form-select'}),
            'weekend_study': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'interests': forms.CheckboxSelectMultiple(),
        }



class TimetableSlotForm(forms.ModelForm):
    class Meta:
        model = TimetableSlot
        fields = ['day', 'start_time', 'end_time', 'slot_type', 'course', 'custom_name']
        widgets = {
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def __init__(self, *args, **kwargs):
        student = kwargs.pop('student', None)
        super().__init__(*args, **kwargs)
        if student:
            self.fields['course'].queryset = student.studentcourse_set.all()


class StudyGroupForm(forms.ModelForm):
    DAY_CHOICES = [
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]

    study_day = forms.MultipleChoiceField(
        choices=DAY_CHOICES,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'form-check-input'}),
        required=True
    )

    class Meta:
        model = StudyGroup
        fields = ['name', 'description', 'group_type', 'major', 'course', 'semester',
                  'study_day', 'start_time', 'end_time', 'max_members']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control rounded-pill'}),
            'description': forms.Textarea(attrs={'class': 'form-control rounded-4', 'rows': 4}),
            'group_type': forms.Select(attrs={'class': 'form-select rounded-pill'}),
            'major': forms.Select(attrs={'class': 'form-select rounded-pill'}),
            'course': forms.Select(attrs={'class': 'form-select rounded-pill'}),
            'semester': forms.Select(attrs={'class': 'form-select rounded-pill'}),
            'start_time': forms.TimeInput(attrs={'class': 'form-control rounded-pill', 'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'class': 'form-control rounded-pill', 'type': 'time'}),
            'max_members': forms.NumberInput(attrs={'class': 'form-control rounded-pill'}),
        }

    def __init__(self, *args, **kwargs):
        student = kwargs.pop('student', None)
        super().__init__(*args, **kwargs)

        # Pre-populate study_day if editing an existing group
        if self.instance and self.instance.pk and self.instance.study_day:
            # Converts "Mon,Tue" back into ['Mon', 'Tue'] for the checkboxes
            self.initial['study_day'] = self.instance.study_day.split(',')

        self.fields["group_type"].empty_label = "Please select a group type"

        # HTMX support for dynamic course loading
        self.fields['semester'].widget.attrs.update({
            'hx-get': '/ajax/load-courses/',
            'hx-target': '#id_course',
            'hx-trigger': 'change'
        })

        if student:
            self.fields['major'].queryset = Major.objects.filter(university=student.university)
            if 'semester' in self.data:
                try:
                    semester_id = self.data.get('semester')
                    self.fields['course'].queryset = Course.objects.filter(semester=semester_id)
                except (ValueError, TypeError):
                    pass
            elif self.instance and self.instance.pk:
                # If editing, show courses for the current group's semester
                self.fields['course'].queryset = Course.objects.filter(semester=self.instance.semester)
            else:
                self.fields['course'].queryset = Course.objects.filter(semester=student.semester)

    def clean_study_day(self):
        """Convert the list of days into a comma-separated string for storage."""
        data = self.cleaned_data.get('study_day')
        if isinstance(data, list):
            return ",".join(data)
        return data
                
                

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['code', 'name', 'semester', 'credits']

class StudentCourseForm(forms.ModelForm):
    class Meta:
        model = StudentCourse
        fields = ['student', 'course']

class StudySessionForm(forms.ModelForm):
    class Meta:
        model = StudySession
        fields = ['date', 'start_time', 'end_time', 'location', 'agenda']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
            'agenda': forms.Textarea(attrs={'rows': 4}),
        }
