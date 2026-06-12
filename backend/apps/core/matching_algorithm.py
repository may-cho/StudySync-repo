
from datetime import time, datetime, timedelta
from django.db.models import Q
from .models import *


def find_course_study_partners(student, course):
    # Use .filter() instead of set operations
    classmates = StudentProfile.objects.filter(
        studentcourse__course=course
    ).exclude(user=student.user).distinct().select_related('user')

    matches = []
    for classmate in classmates:
        # Check inside calculate_compatibility!
        # If it uses intersection(), rewrite it to use .filter()
        score = calculate_compatibility(student, classmate, course)

        if score > 30:
            matches.append({
                'student': classmate,
                'score': score,
                # Ensure get_common_courses returns a LIST or a standard QuerySet
                'common_courses': get_common_courses(student, classmate),
                'suggested_times': suggest_group_times(student, classmate),
            })

    matches.sort(key=lambda x: x['score'], reverse=True)
    return matches

def calculate_compatibility(student1, student2, course):
    """Calculate compatibility score between two students"""
    score = 0

    # Same major: +20 points
    if student1.major == student2.major:
        score += 20

    # Same year: +15 points
    if student1.year == student2.year:
        score += 15

    # Common courses (besides current one): +10 per course
    common_courses = get_common_courses(student1, student2).exclude(id=course.id)
    score += len(common_courses) * 10

    # Overlapping study preferences: +5 per overlapping day
    student1_days = set(student1.preferred_study_days.split(','))
    student2_days = set(student2.preferred_study_days.split(','))
    overlapping_days = student1_days.intersection(student2_days)
    score += len(overlapping_days) * 5

    # Similar study times: +10 if within 1 hour
    time_diff = abs(
        datetime.combine(datetime.today(), student1.preferred_study_start) -
        datetime.combine(datetime.today(), student2.preferred_study_start)
    )
    if time_diff.total_seconds() <= 3600:  # 1 hour
        score += 10

    return min(score, 100)  # Cap at 100


def get_common_courses(student1, student2):
    """Get courses that both students are taking"""
    courses1 = Course.objects.filter(studentcourse__student=student1)
    courses2 = Course.objects.filter(studentcourse__student=student2)
    return Course.objects.filter(studentcourse__student=student1).filter(studentcourse__student=student2)


def suggest_group_times(student1, student2=None, course=None):
    """Suggest study times for a group"""
    suggested_times = []

    # Get free time slots for student1
    student1_slots = TimetableSlot.objects.filter(
        student=student1,
        # slot_type__in=['free', 'self_study']
    )

    if student2:
        # Get free time slots for student2
        student2_slots = TimetableSlot.objects.filter(
            student=student2,
            # slot_type__in=['free', 'self_study']
        )

        # Find overlapping free times
        for slot1 in student1_slots:
            for slot2 in student2_slots:
                if (slot1.day == slot2.day and
                        max(slot1.start_time, slot2.start_time) <
                        min(slot1.end_time, slot2.end_time)):

                    overlap_start = max(slot1.start_time, slot2.start_time)
                    overlap_end = min(slot1.end_time, slot2.end_time)

                    # Apply weekday restrictions
                    if slot1.day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']:
                        # Weekday: after 4 PM
                        if overlap_start >= time(16, 0):
                            suggested_times.append({
                                'day': slot1.day,
                                'start_time': overlap_start,
                                'end_time': overlap_end,
                                'type': 'weekday',
                                'students': [student1, student2]
                            })
                    else:
                        # Weekend: any time
                        suggested_times.append({
                            'day': slot1.day,
                            'start_time': overlap_start,
                            'end_time': overlap_end,
                            'type': 'weekend',
                            'students': [student1, student2]
                        })
    else:
        # Just suggest times based on student1's preferences
        for day in student1.preferred_study_days.split(','):
            if day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']:
                # Weekday: 4 PM - 8 PM
                suggested_times.append({
                    'day': day,
                    'start_time': time(16, 0),
                    'end_time': time(22, 0),
                    'type': 'weekday',
                    'students': [student1]
                })
            else:
                # Weekend: 9 AM - 8 PM
                suggested_times.append({
                    'day': day,
                    'start_time': time(6, 0),
                    'end_time': time(22, 0),
                    'type': 'weekend',
                    'students': [student1]
                })

    # Sort by day and time
    day_order = {'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3,
                 'Fri': 4, 'Sat': 5, 'Sun': 6}
    suggested_times.sort(key=lambda x: (day_order[x['day']], x['start_time']))

    return suggested_times[:5]  # Return top 5 suggestions


def find_best_group_time(students, course):
    """Find best time for a group of students"""
    all_suggestions = []

    # Get suggestions for each pair
    for i in range(len(students)):
        for j in range(i + 1, len(students)):
            suggestions = suggest_group_times(students[i], students[j], course)
            all_suggestions.extend(suggestions)

    # Count occurrences of each time slot
    time_counts = {}
    for suggestion in all_suggestions:
        key = (suggestion['day'], suggestion['start_time'], suggestion['end_time'])
        time_counts[key] = time_counts.get(key, 0) + 1

    # Find time with most students available
    if time_counts:
        best_time = max(time_counts.items(), key=lambda x: x[1])
        day, start_time, end_time = best_time[0]

        # Check which students are available
        available_students = []




