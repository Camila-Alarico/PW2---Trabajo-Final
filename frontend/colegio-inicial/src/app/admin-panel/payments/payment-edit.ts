import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'payment-edit',
  standalone: true,
  templateUrl: './payment-edit.html',
  styleUrls: ['./payment-edit.css'],
  imports: [CommonModule, FormsModule]
})
export class PaymentEdit implements OnInit {
  payment: any = {};
  applicants: any[] = [];
  id!: number;
  statusMessage = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access');

    // Obtener pago
    this.http.get(`http://127.0.0.1:8000/api/payments/${this.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.payment = data,
      error: () => alert('❌ No se pudo cargar el pago')
    });

    // Obtener lista de postulantes
    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.applicants = data,
      error: () => console.error('⚠️ Error cargando postulantes')
    });
  }

  guardarCambios() {
    const token = localStorage.getItem('access');
    this.http.put(`http://127.0.0.1:8000/api/payments/${this.id}/`, this.payment, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Pago actualizado correctamente';
        this.router.navigate(['/admin/pagos']);
      },
      error: () => {
        this.statusMessage = '❌ Error al guardar cambios';
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/pagos']);
  }
}
