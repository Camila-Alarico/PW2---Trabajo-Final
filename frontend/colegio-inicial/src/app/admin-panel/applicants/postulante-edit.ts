import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'postulante-edit',
  standalone: true,
  templateUrl: './postulante-edit.html',
  styleUrls: ['./postulante-edit.css'],
  imports: [CommonModule, FormsModule],
})
export class PostulanteEdit implements OnInit {
  postulante: any = {};
  allPostulantes: any[] = [];
  statusMessage = '';
  id!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('❌ No hay token');
      return;
    }

    // Cargar postulante actual
    this.http.get(`http://127.0.0.1:8000/api/applicants/${this.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.postulante = data,
      error: (err) => console.error('Error al cargar postulante', err)
    });

    // Cargar lista de todos los postulantes (para seleccionar hermanos)
    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.allPostulantes = data,
      error: (err) => console.error('Error al cargar postulantes', err)
    });
  }

  guardarCambios() {
    const token = localStorage.getItem('access');
    this.http.put(`http://127.0.0.1:8000/api/applicants/${this.id}/`, this.postulante, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Cambios guardados correctamente';
        this.router.navigate(['/admin/postulantes']);
      },
      error: () => {
        this.statusMessage = '❌ Error al guardar cambios';
      }
    });
  }
  volver() {
    this.router.navigate(['/admin/postulantes']);
  }
}
