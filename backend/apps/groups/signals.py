from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import GroupApplication


@receiver(post_save,sender=GroupApplication)
def notify_group_application(sender,instance,created,**kwargs):
    if created:
        if instance.side == 'invite':
            recipient = instance.student.user 
            msg = f"You have been invited to {instance.group.name}" 
        else:
            recipient = instance.group.creator.user
            msg = f"{instance.student.user.username} wants to join {instance.group.name}"
            
        
        print(f"triggering real-time update for {recipient.username}: {msg}")
            