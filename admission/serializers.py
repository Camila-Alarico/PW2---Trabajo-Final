from rest_framework import serializers
from .models import Applicant, Parent

class ApplicantSerializer(serializers.ModelSerializer):
    parent_name = serializers.StringRelatedField(source='parent', read_only=True)

    class Meta:
        model = Applicant
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'