from django.db import models

class Parent(models.Model):
    full_name = models.CharField("Nombre completo", max_length=100)
    dni = models.CharField("DNI", max_length=10, unique=True)
    email = models.EmailField("Correo electrónico")
    phone = models.CharField("Teléfono", max_length=15)
    address = models.CharField("Dirección", max_length=200, blank=True)
    occupation = models.CharField("Ocupación", max_length=100, blank=True)
    education_level = models.CharField(
        "Nivel educativo",
        max_length=50,
        choices=[
            ('Primaria', 'Primaria'),
            ('Secundaria', 'Secundaria'),
            ('Técnico', 'Técnico'),
            ('Universitario', 'Universitario'),
            ('Posgrado', 'Posgrado'),
        ],
        blank=True
    )
    marital_status = models.CharField(
        "Estado civil",
        max_length=20,
        choices=[
            ('Soltero/a', 'Soltero/a'),
            ('Casado/a', 'Casado/a'),
            ('Divorciado/a', 'Divorciado/a'),
            ('Viudo/a', 'Viudo/a'),
            ('Conviviente', 'Conviviente'),
        ],
        blank=True
    )
    has_university_affiliation = models.BooleanField(
        "¿Tiene vínculo con la universidad?",
        default=False
    )
    university_role = models.CharField(
        "Cargo en la universidad",
        max_length=100,
        blank=True
    )
    university_area = models.CharField(
        "Área o dependencia",
        max_length=100,
        blank=True
    )
    university_relationship_details = models.TextField(
        "Detalles del vínculo",
        blank=True
    )

    def __str__(self):
        return self.full_name


class Applicant(models.Model):
    GRADE_CHOICES = [
        ('1 año', '1 año'),
        ('2 años', '2 años'),
        ('3 años', '3 años'),
        ('4 años', '4 años'),
        ('5 años', '5 años'),
    ]

    full_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    grade_applied = models.CharField(max_length=10, choices=GRADE_CHOICES)
    dni = models.CharField(max_length=10, unique=True)
    parent = models.ForeignKey('Parent', on_delete=models.CASCADE, related_name='children')
    has_siblings_in_school = models.BooleanField(default=False)
    siblings = models.ManyToManyField('self', blank=True, symmetrical=True)
    is_admitted = models.BooleanField("Admitido", default=False)
    
    def __str__(self):
        return f"{self.full_name} - {self.grade_applied}"


class Payment(models.Model):
    BANK_CHOICES = [
        ('Banco de la Nación', 'Banco de la Nación'),
        ('BCP', 'BCP'),
    ]

    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=100.00)
    bank = models.CharField(max_length=30, choices=BANK_CHOICES)
    voucher_number = models.CharField(max_length=30)
    payment_date = models.DateField()

    def __str__(self):
        return f"Pago de {self.applicant.full_name} - {self.voucher_number}"

class AdmissionProcess(models.Model):
    applicant = models.OneToOneField('Applicant', on_delete=models.CASCADE, related_name='admission_process')
    entrevista = models.BooleanField(default=False)
    convivencia = models.BooleanField(default=False)
    matricula = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.entrevista and self.convivencia and self.matricula:
            if not self.applicant.is_admitted:
                self.applicant.is_admitted = True
                self.applicant.save()
        else:
            if self.applicant.is_admitted:
                self.applicant.is_admitted = False
                self.applicant.save()

    def __str__(self):
        return f"Proceso de {self.applicant.full_name}"
