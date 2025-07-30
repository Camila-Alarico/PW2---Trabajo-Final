import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parent-view.html',
  styleUrl: './parent-view.css'
})
export class ParentView {
  parent: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('access');

    this.http.get(`http://127.0.0.1:8000/api/parents/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.parent = data,
      error: err => console.error('Error cargando apoderado', err)
    });
  }

  volver() {
    history.back();
  }
}
