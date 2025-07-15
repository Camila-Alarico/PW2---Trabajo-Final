from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Applicant
from .forms import ApplicantForm
from .models import Parent, Payment, AdmissionStage
from .forms import ParentForm, PaymentForm, AdmissionStageForm
from django.http import JsonResponse

from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.http import HttpResponse
import io

@method_decorator(login_required, name='dispatch')
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

@csrf_exempt
def send_parents_email(request):
    if request.method == 'POST':
        sender = request.POST.get('sender')
        recipient = request.POST.get('recipient')
        message = request.POST.get('message')
        pdf = request.FILES.get('pdf')
        extra_file = request.FILES.get('extra_file')

        if not recipient or not pdf:
            return HttpResponse('Faltan datos', status=400)

        # Remitente fijo (el que envía el correo)
        fixed_sender = 'tu_correo_fijo@gmail.com'  

        # Mensaje mejorado con info del "quién lo envía"
        mensaje_final = f"Mensaje enviado por: {sender}\n\n{message}"

        email = EmailMessage(
            'Lista de Apoderados',
            mensaje_final,
            fixed_sender,
            [recipient],
        )
        email.attach(pdf.name, pdf.read(), 'application/pdf')

        if extra_file:
            email.attach(extra_file.name, extra_file.read(), extra_file.content_type)

        email.send()
        return HttpResponse('Correo enviado con éxito')
    return HttpResponse('Método no permitido', status=405)

def send_applicants_email(request):
    if request.method == 'POST':
        recipient = request.POST.get('recipient')
        message = request.POST.get('message')
        pdf = request.FILES.get('pdf')
        extra_file = request.FILES.get('extra_file')

        if not recipient or not pdf:
            return HttpResponse('Faltan datos', status=400)

        fixed_sender = 'tu_correo_fijo@gmail.com'  # Reemplaza con el real

        email = EmailMessage(
            'Lista de Postulantes',
            message,
            fixed_sender,
            [recipient],
        )
        email.attach(pdf.name, pdf.read(), 'application/pdf')

        if extra_file:
            email.attach(extra_file.name, extra_file.read(), extra_file.content_type)

        email.send()
        return HttpResponse('Correo enviado con éxito')

    return HttpResponse('Método no permitido', status=405)

@login_required
def home_view(request):
    return render(request, 'admission/home.html')

# Vista de registro
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'admission/register.html', {'form': form})