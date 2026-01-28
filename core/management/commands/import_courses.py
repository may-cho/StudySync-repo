import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import Course,Major

class Command(BaseCommand):
    help = 'Converts raw JSON and imports courses directly into the database'

    def handle(self, *args, **options):
       
        file_path = os.path.join(settings.BASE_DIR, 'core', 'fixtures', 'courses.json')
        
        if not os.path.exists(file_path):
            self.stderr.write(self.style.ERROR(f"Source file not found at {file_path}"))
            return

        with open(file_path, 'r') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                self.stderr.write(self.style.ERROR("Invalid JSON format in courses.json"))
                return

        self.stdout.write(self.style.WARNING(f"Starting import of {len(data)} courses..."))

        created_count = 0
        updated_count = 0

        all_majors = Major.objects.all()

        for item in data:
            
            obj, created = Course.objects.update_or_create(
                code=item.get('code'),
                semester =  item.get('semester'),
                defaults={
                    'name': item.get('name'),
                    'credits' : item.get('credits')
                }
            )
            obj.major.add(*all_majors)
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully imported! Created: {created_count}, Updated: {updated_count}")
        )