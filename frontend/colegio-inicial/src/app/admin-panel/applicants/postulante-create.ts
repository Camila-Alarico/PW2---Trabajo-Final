import { Component,OnInit } from '@angular/core';
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
export class PostulanteCreate implements OnInit {
  full_name = '';
  birth_date = '';
  grade_applied = '';
  dni = '';
  parent_id: number = 1;  // ⚠️ Reemplaza esto luego con un selector
  has_siblings_in_school = false;
  siblings: number[] = [];

  statusMessage = '';
  allPostulantes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('⚠️ No hay token JWT en localStorage');
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        console.log('📦 Postulantes cargados:', data);
        this.allPostulantes = data;
      },
      error: (err) => console.error('❌ Error cargando postulantes', err)
    });
  }


  guardarPostulante() {
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

    this.http.post('http://127.0.0.1:8000/api/applicants/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
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
