import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'payment-create',
  standalone: true,
  templateUrl: './payment-create.html',
  styleUrls: ['./payment-create.css'],
  imports: [CommonModule, FormsModule]
})
export class PaymentCreate implements OnInit {
  payment: any = {
    applicant: '',
    amount: 100.00,
    bank: '',
    voucher_number: '',
    payment_date: ''
  };

  applicants: any[] = [];
  statusMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.applicants = data,
      error: () => console.error('❌ Error al cargar postulantes')
    });
  }

  guardarPago() {
    const token = localStorage.getItem('access');
    this.http.post('http://127.0.0.1:8000/api/payments/', this.payment, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Pago registrado correctamente';
        this.router.navigate(['/admin/pagos']);
      },
      error: () => {
        this.statusMessage = '❌ Error al registrar el pago';
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/pagos']);
  }
}
