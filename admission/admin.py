from django.contrib import admin
from admission.models import Parent, Applicant, Payment, AdmissionStage

admin.site.register(Parent)
admin.site.register(Applicant)
admin.site.register(Payment)
admin.site.register(AdmissionStage)