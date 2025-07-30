import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-postulante-list',
  templateUrl: './postulante-list.html',
  styleUrl: './postulante-list.css',
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class PostulanteList implements OnInit {
  postulantes: any[] = [];
  estadoCorreo = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('⚠️ No hay token JWT en localStorage');
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:8000/api/applicants/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: data => this.postulantes = data,
      error: err => console.error('❌ Error al obtener postulantes \n', err)
    });
  }
  eliminar(id: number) {
    const token = localStorage.getItem('access');
    if (!confirm('¿Estás seguro de eliminar este postulante?')) return;

    this.http.delete(`http://127.0.0.1:8000/api/applicants/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.postulantes = this.postulantes.filter(p => p.id !== id);
        console.log(`✅ Postulante ${id} eliminado`);
      },
      error: err => console.error('❌ Error al eliminar postulante:', err)
    });
  }

  descargarPDF() {
    const elemento = document.getElementById('pdf-content');
    if (elemento) {
      elemento.style.display = 'block';
      // @ts-ignore
      html2pdf().from(elemento).save('postulantes.pdf');
      setTimeout(() => elemento.style.display = 'none', 1000);
    }
  }

  enviarCorreo() {
    fetch('http://127.0.0.1:8000/send-applicants-email/')
      .then(res => res.text())
      .then(() => this.estadoCorreo = '✅ Correo enviado con éxito')
      .catch(() => this.estadoCorreo = '❌ Error al enviar el correo');
  }
}
