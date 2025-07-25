import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Contact {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:8001/api/token/', {
      username: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        window.location.href = 'http://127.0.0.1:8001/';
      },
      error: () => {
        alert('Login incorrecto');
      }
    });
  }

  getApplicants() {
    const token = localStorage.getItem('access');
    this.http.get('http://localhost:8001/api/applicants/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        console.log('Applicants:', res);
      },
      error: (err) => {
        console.error('Error fetching applicants:', err);
      }
    });
  }
}