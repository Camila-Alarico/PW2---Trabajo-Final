import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parent-list.html',
  styleUrls: ['./parent-list.css']
})
export class ParentList {
  parents: any[] = [];
  estadoCorreo = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    this.http.get<any[]>('http://127.0.0.1:8000/api/parents/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.parents = data,
      error: (err) => console.error('Error cargando apoderados', err)
    });
  }

  descargarPDF() {
    const content = document.getElementById('pdf-content');
    if (content) {
      content.style.display = 'block';
      import('html2pdf.js' as any).then(html2pdf => {
        html2pdf.default().from(content).save('apoderados.pdf');
        setTimeout(() => content.style.display = 'none', 500);
      });
    }
  }

  eliminar(id: number) {
    if (!confirm('¿Estás seguro de eliminar este apoderado?')) return;

    const token = localStorage.getItem('access');

    this.http.delete(`http://127.0.0.1:8000/api/parents/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.parents = this.parents.filter(p => p.id !== id);
      },
      error: () => alert('❌ Error al eliminar apoderado')
    });
  }

  enviarCorreo() {
    const token = localStorage.getItem('access');
    this.estadoCorreo = '⏳ Enviando...';
    this.http.get('http://127.0.0.1:8000/send-parents-email/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.estadoCorreo = '✅ Correo enviado con éxito',
      error: () => this.estadoCorreo = '❌ Error al enviar correo'
    });
  }
}
