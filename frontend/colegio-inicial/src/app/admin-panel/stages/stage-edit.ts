import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stage-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stage-edit.html'
})
export class StageEdit implements OnInit {
  id!: number;
  etapa: any = {};
  applicants: any[] = [];
  statusMessage = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access');

    // Cargar etapa actual
    this.http.get(`http://127.0.0.1:8000/api/stages/${this.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.etapa = data,
      error: () => console.error('❌ No se pudo cargar la etapa')
    });

    // Cargar postulantes
    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.applicants = data,
      error: () => console.error('❌ Error al cargar postulantes')
    });
  }

  guardarCambios() {
    const token = localStorage.getItem('access');
    this.http.put(`http://127.0.0.1:8000/api/stages/${this.id}/`, this.etapa, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Cambios guardados correctamente';
        this.router.navigate(['/admin/etapas']);
      },
      error: () => {
        this.statusMessage = '❌ Error al guardar cambios';
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/etapas']);
  }
}
