from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Applicant, AdmissionProcess

@receiver(post_save, sender=Applicant)
def create_admission_process(sender, instance, created, **kwargs):
    if created:
        AdmissionProcess.objects.get_or_create(applicant=instance)
