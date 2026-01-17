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
    # university = forms.ModelChoiceField(
    #     queryset=University.objects.all(),
    #     empty_label="Select your university",
    #     widget=forms.Select(attrs={'class': 'form-select'})
    # )
    major = forms.ChoiceField(
        # queryset=Major.objects.none(),
        #empty_label="Select your major",
        choices=StudentProfile.MAJOR_CHOICES,
        widget=forms.Select(attrs={'class': 'form-select'})
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
            'placeholder': 'Tell us about yourself, your study interests, etc.'
        })
    )
    profile_picture = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*'
        })
    )
    terms = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        label='I agree to the Terms of Service and Privacy Policy'
    )
    # preferred_study_days = forms.MultipleChoiceField(
    #     choices=TimetableSlot.DAY_CHOICES,
    #     widget=forms.CheckboxSelectMultiple,
    #     required=True,
    #     initial=['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    # )

    class Meta:
        model = StudentProfile
        fields = ['major', 'year','semester', 'bio', 'profile_picture',]


        widgets = {
        #     # 'major': forms.Select(attrs={'class': 'form-control'}),
        #     # 'year': forms.Select(attrs={'class': 'form-control'}),
        #     # 'bio': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        #     'preferred_study_start': forms.TimeInput(attrs={'type': 'time'}),
         #    'preferred_study_end': forms.TimeInput(attrs={'type': 'time'}),
         }

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     if 'university' in self.data:
    #         try:
    #             # university_id = int(self.data.get('university'))
    #             #self.fields['major'].queryset = Major.objects.filter(university_id=university_id)
    #             self.fields['major'].widget.attrs.pop('disabled', None)
    #         except (ValueError, TypeError):
    #             pass



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
        widget=forms.CheckboxSelectMultiple,
        required=True
    )
    class Meta:
        model = StudyGroup
        fields = ['name', 'description', 'group_type', 'major', 'course','semester',
                  'study_day','start_time','end_time', 'max_members']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def __init__(self, *args, **kwargs):
        student = kwargs.pop('student', None)
        super().__init__(*args, **kwargs)
        self.fields["group_type"].empty_label = "Please select a group type"
        
        self.fields['semester'].widget.attrs.update({
            'hx-get': '/ajax/load-courses',
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
            else:
                self.fields['course'].queryset = Course.objects.filter(semester=student.semester)
                
                

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
