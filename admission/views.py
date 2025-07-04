from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Applicant
from .forms import ApplicantForm

# LISTADO
class ApplicantListView(ListView):
    model = Applicant
    template_name = 'admission/applicant_list.html'
    context_object_name = 'applicants'

# DETALLE
class ApplicantDetailView(DetailView):
    model = Applicant
    template_name = 'admission/applicant_detail.html'

# CREAR
class ApplicantCreateView(CreateView):
    model = Applicant
    form_class = ApplicantForm
    template_name = 'admission/applicant_form.html'
    success_url = reverse_lazy('applicant_list')

# ACTUALIZAR
class ApplicantUpdateView(UpdateView):
    model = Applicant
    form_class = ApplicantForm
    template_name = 'admission/applicant_form.html'
    success_url = reverse_lazy('applicant_list')

# ELIMINAR
class ApplicantDeleteView(DeleteView):
    model = Applicant
    template_name = 'admission/applicant_confirm_delete.html'
    success_url = reverse_lazy('applicant_list')
