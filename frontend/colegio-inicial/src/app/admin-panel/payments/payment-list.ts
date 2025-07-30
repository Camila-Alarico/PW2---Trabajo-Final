import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.css']
})
export class PaymentList implements OnInit {
  payments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    this.http.get<any[]>('http://127.0.0.1:8000/api/payments/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('❌ Error al cargar pagos', err)
    });
  }
  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      const token = localStorage.getItem('access');
      this.http.delete(`http://127.0.0.1:8000/api/payments/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.payments = this.payments.filter(p => p.id !== id);
        },
        error: () => alert('❌ Error al eliminar el pago')
      });
    }
  }
}
