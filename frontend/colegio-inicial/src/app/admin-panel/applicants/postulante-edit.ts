import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'postulante-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postulante-edit.html',
})
export class PostulanteEdit implements OnInit {
  id!: number;
  full_name = '';
  birth_date = '';
  grade_applied = '';
  dni = '';
  parent_id = 1;
  has_siblings_in_school = false;
  siblings: number[] = [];

  statusMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access');

    this.http.get<any>(`http://127.0.0.1:8000/api/applicants/${this.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: data => {
        this.full_name = data.full_name;
        this.birth_date = data.birth_date;
        this.grade_applied = data.grade_applied;
        this.dni = data.dni;
        this.parent_id = data.parent;
        this.has_siblings_in_school = data.has_siblings_in_school;
        this.siblings = data.siblings || [];
      },
      error: () => {
        this.statusMessage = '❌ Error al cargar postulante';
      }
    });
  }

  actualizarPostulante() {
    const token = localStorage.getItem('access');

    const data = {
      full_name: this.full_name,
      birth_date: this.birth_date,
      grade_applied: this.grade_applied,
      dni: this.dni,
      parent: this.parent_id,
      has_siblings_in_school: this.has_siblings_in_school,
      siblings: this.siblings
    };

    this.http.put(`http://127.0.0.1:8000/api/applicants/${this.id}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Postulante actualizado correctamente';
        this.router.navigate(['/admin/postulantes']);
      },
      error: () => {
        this.statusMessage = '❌ Error al actualizar postulante';
      }
    });
  }
}
