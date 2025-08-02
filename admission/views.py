from rest_framework import viewsets, generics
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Applicant, Parent, Payment, AdmissionProcess
from .serializers import ApplicantSerializer, ParentSerializer, PaymentSerializer, AdmissionProcessSerializer

class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-payment_date')
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

class PublicApplicantListView(generics.ListAPIView):
    queryset = Applicant.objects.filter(is_admitted=True)
    serializer_class = ApplicantSerializer
    permission_classes = [AllowAny]

class AdmissionProcessViewSet(viewsets.ModelViewSet):
    queryset = AdmissionProcess.objects.select_related('applicant').all()
    serializer_class = AdmissionProcessSerializer
    permission_classes = [IsAuthenticated]