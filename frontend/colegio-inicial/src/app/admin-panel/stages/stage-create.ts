import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stage-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stage-create.html',
})
export class StageCreate implements OnInit {
  applicant_id: number = 1;
  stage: string = '';
  date: string = '';
  completed: boolean = false;

  applicants: any[] = [];
  statusMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.applicants = data,
      error: () => console.error('❌ Error al cargar postulantes')
    });
  }

  guardarEtapa() {
    const token = localStorage.getItem('access');
    const data = {
      applicant: this.applicant_id,
      stage: this.stage,
      date: this.date,
      completed: this.completed
    };

    this.http.post('http://127.0.0.1:8000/api/stages/', data, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Etapa registrada correctamente';
        this.router.navigate(['/admin/etapas']);
      },
      error: () => {
        this.statusMessage = '❌ Error al registrar etapa';
      }
    });
  }
}
