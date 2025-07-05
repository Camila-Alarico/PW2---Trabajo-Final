from django.db import models

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

    def __str__(self):
        return self.full_name


class Applicant(models.Model):
    GRADE_CHOICES = [
        ('1 año', '1 año'),
        ('2 años', '2 años'),
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

class AdmissionStage(models.Model):
    STAGE_CHOICES = [
        ('Entrevista', 'Entrevista'),
        ('Convivencia', 'Convivencia'),
        ('Matrícula', 'Matrícula'),
    ]

    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES)
    date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.stage} - {self.applicant.full_name}"
