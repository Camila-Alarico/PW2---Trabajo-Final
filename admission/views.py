from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Applicant
from .forms import ApplicantForm
from .models import Parent, Payment, AdmissionStage
from .forms import ParentForm, PaymentForm, AdmissionStageForm
from django.http import JsonResponse


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

class ParentListView(ListView):
    model = Parent
    template_name = 'admission/parent_list.html'
    context_object_name = 'parents'

class ParentCreateView(CreateView):
    model = Parent
    form_class = ParentForm
    template_name = 'admission/parent_form.html'
    success_url = reverse_lazy('parent_list')

class ParentUpdateView(UpdateView):
    model = Parent
    form_class = ParentForm
    template_name = 'admission/parent_form.html'
    success_url = reverse_lazy('parent_list')

class ParentDeleteView(DeleteView):
    model = Parent
    template_name = 'admission/parent_confirm_delete.html'
    success_url = reverse_lazy('parent_list')

# PAYMENT (Pago)
class PaymentListView(ListView):
    model = Payment
    template_name = 'admission/payment_list.html'
    context_object_name = 'payments'

class PaymentCreateView(CreateView):
    model = Payment
    form_class = PaymentForm
    template_name = 'admission/payment_form.html'
    success_url = reverse_lazy('payment_list')

# ADMISSION STAGE (Etapas)
class AdmissionStageListView(ListView):
    model = AdmissionStage
    template_name = 'admission/stage_list.html'
    context_object_name = 'stages'

class AdmissionStageCreateView(CreateView):
    model = AdmissionStage
    form_class = AdmissionStageForm
    template_name = 'admission/stage_form.html'
    success_url = reverse_lazy('stage_list')

def applicant_json_api(request):
    data = list(Applicant.objects.values('id', 'full_name', 'grade_applied', 'dni'))
    return JsonResponse(data, safe=False)

# Poner base en la pagina principal
def home(request):
    return render(request, 'admission/home.html')