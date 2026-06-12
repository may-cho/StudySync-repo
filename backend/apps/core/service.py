from django.db.models import Count
from .models import TimetableSlot

class CompatibilityService:
    @classmethod
    def get_compatibility(cls,user_profile,target_profile):
        
        #Factor 1: Major 30%
        major_score = 30 if user_profile.major_id == target_profile.major_id else 0
        
        #Factor 2: Shared days
        days1 = set(user_profile.preferred_study_days.split(','))
        days2 = set(target_profile.preferred_study_days.split(','))
        shared_days = days1.intersection(days2)

       
        
        #Factor 3: Overlap hours(Preferred study hours compatible) 40%
        #Goal 10: 40pts
        overlap_hours,daily_schedules = cls.get_detailed_overlap(user_profile,target_profile,shared_days)
        time_score = min((overlap_hours/10) * 40,40)
        
        #Factor 4: Courses 30%
        
        shared_courses = user_profile.get_courses().filter(
        id__in=target_profile.get_courses().values_list('id', flat=True))
        
        total_shared_courses = shared_courses.count();
        course_score = min(total_shared_courses * 10 , 30)
        
        total_score = major_score + time_score + course_score;
        
        return round(total_score) , round(overlap_hours,1), shared_courses,shared_days, daily_schedules
        
        
    @staticmethod    
    def get_minutes(t):
        return t.hour * 60 + t.minute
    
    
    @staticmethod
    def minutes_to_hm(minutes):
        mins = minutes % 1440
        h = mins // 60
        m = mins % 60
        return f"{int(h):02d}:{int(m):02d}"
    @classmethod
    def get_detailed_overlap(cls, p1, p2, shared_days):
        # Convert base study windows to minutes for easier math
        s1, e1 = cls.get_minutes(p1.preferred_study_start), cls.get_minutes(p1.preferred_study_end)
        s2, e2 = cls.get_minutes(p2.preferred_study_start), cls.get_minutes(p2.preferred_study_end)
        
        # Handle midnight cross (e.g., 10 PM to 2 AM)
        if e1 <= s1: e1 += 1440
        if e2 <= s2: e2 += 1440 

        # The "Study Window" shared by both users
        overlap_start_min = max(s1, s2)
        overlap_end_min = min(e1, e2)
        potential_daily_min = max(0, overlap_end_min - overlap_start_min)

        all_conflicts = TimetableSlot.objects.filter(
            student__in=[p1, p2],
            day__in=shared_days,
            slot_type="class"
        )

        total_weekly_mins = 0
        daily_schedules = [] # To send to Vue

        for day in shared_days:
            # 1. Reset blocked minutes for every new day!
            blocked_intervals = []
            
            day_conflicts = [s for s in all_conflicts if s.day == day]
            for slot in day_conflicts:
                cs, ce = cls.get_minutes(slot.start_time), cls.get_minutes(slot.end_time)
                if ce <= cs: ce += 1440
                
                # Intersection of conflict and study window
                b_start = max(cs, overlap_start_min)
                b_end = min(ce, overlap_end_min)
                
                if b_end > b_start:
                    blocked_intervals.append((b_start, b_end))

            # 2. Merge blocked intervals (handles if both have class at same time)
            blocked_intervals.sort()
            merged_blocked_min = 0
            if blocked_intervals:
                curr_start, curr_end = blocked_intervals[0]
                for next_start, next_end in blocked_intervals[1:]:
                    if next_start < curr_end:
                        curr_end = max(curr_end, next_end)
                    else:
                        merged_blocked_min += (curr_end - curr_start)
                        curr_start, curr_end = next_start, next_end
                merged_blocked_min += (curr_end - curr_start)

            daily_overlap = max(0, potential_daily_min - merged_blocked_min)
            total_weekly_mins += daily_overlap

            # 3. Map for Vue (Convert back to HH:MM strings or floats)
            if daily_overlap > 0:
                daily_schedules.append({
                    'day': day,
                    'start_time': cls.minutes_to_hm(overlap_start_min),
                    'end_time': cls.minutes_to_hm(overlap_end_min),
                    'duration_hours': round(daily_overlap / 60, 1)
                })

        return total_weekly_mins / 60, daily_schedules