from django.contrib import admin
from admission.models import Parent, Applicant, Payment, AdmissionProcess

admin.site.register(Parent)
admin.site.register(Applicant)
admin.site.register(Payment)
admin.site.register(AdmissionProcess)