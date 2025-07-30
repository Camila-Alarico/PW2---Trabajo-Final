from rest_framework import serializers
from .models import Applicant, Parent, Payment

class ApplicantSerializer(serializers.ModelSerializer):
    parent_name = serializers.StringRelatedField(source='parent', read_only=True)

    class Meta:
        model = Applicant
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='applicant.full_name', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
