import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'postulante-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postulante-create.html',
})
export class PostulanteCreate {
  full_name = '';
  birth_date = '';
  grade_applied = '';
  dni = '';
  parent_id: number = 1;  // valor temporal por ahora
  has_siblings_in_school = false;
  siblings: number[] = [];  // IDs de los hermanos

  statusMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  guardarPostulante() {
    const data = {
      full_name: this.full_name,
      birth_date: this.birth_date,
      grade_applied: this.grade_applied,
      dni: this.dni,
      parent: this.parent_id,  // 👈 relación foránea
      has_siblings_in_school: this.has_siblings_in_school,
      siblings: this.siblings  // 👈 lista de IDs
    };

    this.http.post('http://127.0.0.1:8000/api/applicants/', data).subscribe({
      next: () => {
        this.statusMessage = '✅ Postulante creado correctamente';
        this.router.navigate(['/admin/postulantes']);
      },
      error: () => {
        this.statusMessage = '❌ Error al crear postulante';
      }
    });
  }
}
