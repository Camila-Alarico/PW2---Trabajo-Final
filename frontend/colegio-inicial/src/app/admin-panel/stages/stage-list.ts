import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stage-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stage-list.html',
  styleUrls: []
})
export class StageList implements OnInit {
  stages: any[] = [];
  statusMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    this.http.get<any[]>('http://127.0.0.1:8000/api/stages/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.stages = data,
      error: () => this.statusMessage = '❌ Error al cargar etapas'
    });
  }

  eliminarEtapa(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta etapa?')) return;

    const token = localStorage.getItem('access');
    this.http.delete(`http://127.0.0.1:8000/api/stages/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.stages = this.stages.filter(e => e.id !== id);
        this.statusMessage = '✅ Etapa eliminada';
      },
      error: () => this.statusMessage = '❌ No se pudo eliminar la etapa'
    });
  }
}
