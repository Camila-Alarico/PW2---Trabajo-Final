import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'postulante-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postulante-view.html',
  styleUrls: ['./postulante-view.css']
})
export class PostulanteView implements OnInit {
  postulante: any = {};
  postulantes: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('access');

    this.http.get(`http://127.0.0.1:8000/api/applicants/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data: any) => {
        this.postulante = data;
        this.cargarHermanos(); // <- Importante
      },
      error: () => alert('❌ No se pudo cargar el postulante')
    });
  }

  cargarHermanos() {
    const token = localStorage.getItem('access');
    if (!this.postulante.siblings || this.postulante.siblings.length === 0) {
      this.postulante.sibling_names = [];
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (todos) => {
        const hermanos = todos.filter(p => this.postulante.siblings.includes(p.id));
        this.postulante.sibling_names = hermanos.map(h => h.full_name);
      },
      error: () => {
        console.warn('⚠️ No se pudieron cargar los nombres de hermanos');
        this.postulante.sibling_names = [];
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/postulantes']);
  }
}
