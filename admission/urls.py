from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicantViewSet, ParentViewSet, PaymentViewSet, AdmissionStageViewSet, PublicApplicantListView

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet, basename='applicant')
router.register(r'parents', ParentViewSet)
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'stages', AdmissionStageViewSet, basename='stages')

urlpatterns = [
    path('', include(router.urls)),
    path('public-applicants/', PublicApplicantListView.as_view(), name='public_applicants'),
]
