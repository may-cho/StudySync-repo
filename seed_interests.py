import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # Change this!
django.setup()

from core.models import Interest  # Change this!


def seed_interests():
    interests = [
        # Programming & Tech
        ('Python', 'programming'), ('JavaScript', 'programming'),
        ('Rust', 'programming'), ('Vibe Coding', 'programming'),
        ('AI & LLMs', 'programming'), ('Web Development', 'programming'),

        # Foreign Languages
        ('Japanese', 'language'), ('Korean', 'language'),
        ('French', 'language'), ('English', 'language'),
        ('German', 'language'), ('Chinese', 'language'),

        # Study Vibes
        ('Pomodoro Technique', 'hobby'), ('Deep Work', 'hobby'),
        ('Night Owl', 'hobby'), ('Early Bird', 'hobby'),
        ('Coffee Shop Study', 'hobby'), ('Group Brainstorming', 'hobby'),
    ]

    for name, category in interests:
        obj, created = Interest.objects.get_or_create(name=name, category=category)
        if created:
            print(f"Added: {name}")


if __name__ == '__main__':
    seed_interests()