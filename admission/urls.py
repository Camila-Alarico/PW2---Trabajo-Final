from django.urls import path
from . import views

urlpatterns = [
    path('applicants/', views.ApplicantListView.as_view(), name='applicant_list'),
    path('applicants/<int:pk>/', views.ApplicantDetailView.as_view(), name='applicant_detail'),
    path('applicants/create/', views.ApplicantCreateView.as_view(), name='applicant_create'),
    path('applicants/<int:pk>/edit/', views.ApplicantUpdateView.as_view(), name='applicant_update'),
    path('applicants/<int:pk>/delete/', views.ApplicantDeleteView.as_view(), name='applicant_delete'),
]
