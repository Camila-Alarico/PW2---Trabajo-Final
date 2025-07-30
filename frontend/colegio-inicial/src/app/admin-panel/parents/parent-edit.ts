import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parent-edit.html',
})
export class ParentEdit {
  id: string | null = null;

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('access');

    this.http.get<any>(`http://127.0.0.1:8000/api/parents/${this.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.full_name = data.full_name;
        this.dni = data.dni;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.occupation = data.occupation;
        this.education_level = data.education_level;
        this.marital_status = data.marital_status;
        this.has_university_affiliation = data.has_university_affiliation;
        this.university_role = data.university_role;
        this.university_area = data.university_area;
        this.university_relationship_details = data.university_relationship_details;
      },
      error: () => {
        this.statusMessage = '❌ Error al cargar datos del apoderado';
      }
    });
  }

  actualizarApoderado() {
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

    this.http.put(`http://127.0.0.1:8000/api/parents/${this.id}/`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Apoderado actualizado correctamente';
        this.router.navigate(['/admin/padres']);
      },
      error: () => {
        this.statusMessage = '❌ Error al actualizar apoderado';
      }
    });
  }
}
