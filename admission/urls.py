from django.urls import path
from . import views
from django.shortcuts import render

urlpatterns = [
    path('applicants/', views.ApplicantListView.as_view(), name='applicant_list'),
    path('applicants/<int:pk>/', views.ApplicantDetailView.as_view(), name='applicant_detail'),
    path('applicants/create/', views.ApplicantCreateView.as_view(), name='applicant_create'),
    path('applicants/<int:pk>/edit/', views.ApplicantUpdateView.as_view(), name='applicant_update'),
    path('applicants/<int:pk>/delete/', views.ApplicantDeleteView.as_view(), name='applicant_delete'),
    # PADRES
    path('parents/', views.ParentListView.as_view(), name='parent_list'),
    path('parents/create/', views.ParentCreateView.as_view(), name='parent_create'),
    path('parents/<int:pk>/edit/', views.ParentUpdateView.as_view(), name='parent_update'),
    path('parents/<int:pk>/delete/', views.ParentDeleteView.as_view(), name='parent_delete'),

    # PAGOS
    path('payments/', views.PaymentListView.as_view(), name='payment_list'),
    path('payments/create/', views.PaymentCreateView.as_view(), name='payment_create'),
    path('payments/<int:pk>/edit/', views.PaymentUpdateView.as_view(), name='payment_update'),
    path('payments/<int:pk>/delete/', views.PaymentDeleteView.as_view(), name='payment_delete'),

    # ETAPAS
    path('stages/', views.AdmissionStageListView.as_view(), name='stage_list'),
    path('stages/create/', views.AdmissionStageCreateView.as_view(), name='stage_create'),
    path('stages/<int:pk>/edit/', views.AdmissionStageUpdateView.as_view(), name='stage_update'),
    path('stages/<int:pk>/delete/', views.AdmissionStageDeleteView.as_view(), name='stage_delete'),

    # API JSON
    path('api/applicants/', views.applicant_json_api, name='applicant_json_api'),

    # AJAX DEMO PAGE
    path('ajax-demo/', lambda r: render(r, 'admission/ajax_list.html'), name='ajax_demo'),

    # MANDAR CORREOS
    path('send-parents-email/', views.send_parents_email, name='send_parents_email'),
    path('send-applicants-email/', views.send_applicants_email, name='send_applicants_email'),
]
