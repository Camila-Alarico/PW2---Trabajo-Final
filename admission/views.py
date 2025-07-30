from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Applicant, Parent, Payment, AdmissionStage
from .serializers import ApplicantSerializer, ParentSerializer, PaymentSerializer, AdmissionStageSerializer

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


class AdmissionStageViewSet(viewsets.ModelViewSet):
    queryset = AdmissionStage.objects.all()
    serializer_class = AdmissionStageSerializer
    permission_classes = [IsAuthenticated]

class PublicApplicantListView(ListAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [AllowAny]