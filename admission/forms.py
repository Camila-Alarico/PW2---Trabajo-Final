from django import forms
from .models import Parent, Applicant, Payment, AdmissionStage
from datetime import date

class ParentForm(forms.ModelForm):
    class Meta:
        model = Parent
        fields = '__all__'
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),
            'dni': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.TextInput(attrs={'class': 'form-control'}),
            'occupation': forms.TextInput(attrs={'class': 'form-control'}),
            'education_level': forms.Select(attrs={'class': 'form-select'}),
            'marital_status': forms.Select(attrs={'class': 'form-select'}),
            'has_university_affiliation': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'university_role': forms.TextInput(attrs={'class': 'form-control'}),
            'university_area': forms.TextInput(attrs={'class': 'form-control'}),
            'university_relationship_details': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

class ApplicantForm(forms.ModelForm):
    class Meta:
        model = Applicant
        fields = '__all__'
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),
            'birth_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'grade_applied': forms.Select(attrs={'class': 'form-select'}),
            'dni': forms.TextInput(attrs={'class': 'form-control'}),
            'parent': forms.Select(attrs={'class': 'form-select'}),
            'has_siblings_in_school': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'siblings': forms.SelectMultiple(attrs={'class': 'form-select'}),
        }


    def clean(self):
        cleaned_data = super().clean()
        birth_date = cleaned_data.get("birth_date")
        grade = cleaned_data.get("grade_applied")
        if birth_date and grade:
            age = self.calculate_age(birth_date)
            if grade == "1 año" and age > 1:
                self.add_error('birth_date', "Para postular a 1 año, el niño(a) no debe superar 1 año al 31 de marzo.")
            elif grade == "2 años" and age > 2:
                self.add_error('birth_date', "Para postular a 2 años, el niño(a) no debe superar 2 años al 31 de marzo.")
            elif grade == "4 años" and age > 4:
                self.add_error('birth_date', "Para postular a 4 años, el niño(a) no debe superar 4 años al 31 de marzo.")
            elif grade == "5 años" and age > 5:
                self.add_error('birth_date', "Para postular a 5 años, el niño(a) no debe superar 5 años al 31 de marzo.")

    def calculate_age(self, birth_date):
        reference_date = date(2024, 3, 31)
        return (reference_date - birth_date).days // 365

class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = '__all__'
        widgets = {
            'applicant': forms.Select(attrs={'class': 'form-select'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'bank': forms.Select(attrs={'class': 'form-select'}),
            'voucher_number': forms.TextInput(attrs={'class': 'form-control'}),
            'payment_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }

class AdmissionStageForm(forms.ModelForm):
    class Meta:
        model = AdmissionStage
        fields = '__all__'
        widgets = {
            'applicant': forms.Select(attrs={'class': 'form-select'}),
            'stage': forms.Select(attrs={'class': 'form-select'}),
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'completed': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

def applicant_json_api(request):
    data = list(Applicant.objects.values('id', 'full_name', 'grade_applied', 'dni'))
    return JsonResponse(data, safe=False)