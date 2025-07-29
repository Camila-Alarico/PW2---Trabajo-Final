import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'postulante-view',
  templateUrl: './postulante-view.html',
  imports: [CommonModule],
})
export class PostulanteView implements OnInit {
  postulante: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('access');

    this.http.get(`http://127.0.0.1:8000/api/applicants/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: data => this.postulante = data,
      error: err => console.error('❌ Error al cargar postulante', err)
    });
  }
}
