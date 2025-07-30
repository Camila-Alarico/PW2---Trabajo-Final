import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parent-create.html',
})
export class ParentCreate {
  full_name = '';
  dni = '';
  email = '';
  phone = '';
  address = '';
  occupation = '';
  education_level = '';
  marital_status = '';
  has_university_affiliation = false;
  university_role = '';
  university_area = '';
  university_relationship_details = '';

  statusMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  guardarApoderado() {
    const token = localStorage.getItem('access');
    const data = {
      full_name: this.full_name,
      dni: this.dni,
      email: this.email,
      phone: this.phone,
      address: this.address,
      occupation: this.occupation,
      education_level: this.education_level,
      marital_status: this.marital_status,
      has_university_affiliation: this.has_university_affiliation,
      university_role: this.university_role,
      university_area: this.university_area,
      university_relationship_details: this.university_relationship_details
    };

    this.http.post('http://127.0.0.1:8000/api/parents/', data, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Apoderado creado correctamente';
        this.router.navigate(['/admin/padres']);
      },
      error: () => {
        this.statusMessage = '❌ Error al crear apoderado';
      }
    });
  }
}
