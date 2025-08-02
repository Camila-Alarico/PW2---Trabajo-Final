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
  processes: any[] = [];
  statusMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    if (!token) return;

    this.http.get<any[]>('http://127.0.0.1:8000/api/admission-process/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.processes = data,
      error: () => this.statusMessage = '❌ Error al cargar procesos de admisión'
    });
  }

  toggleEtapa(processId: number, etapa: 'entrevista' | 'convivencia' | 'matricula', event: Event) {
    const token = localStorage.getItem('access');
    if (!token) return;

    const valor = (event.target as HTMLInputElement).checked;
    const body = { [etapa]: valor };

    this.http.patch(`http://127.0.0.1:8000/api/admission-process/${processId}/`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.statusMessage = '✅ Etapa actualizada',
      error: () => this.statusMessage = '❌ No se pudo actualizar la etapa'
    });
  }
}
