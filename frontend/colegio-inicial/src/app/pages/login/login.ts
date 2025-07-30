import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth'; // Asegúrate que el path sea correcto

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

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        window.location.href = '/admin';
      },
      error: () => {
        alert('Login incorrecto');
      }
    });
  }

  getApplicants() {
    this.auth.getApplicants().subscribe({
      next: (res) => {
        console.log('Applicants:', res);
      },
      error: (err) => {
        console.error('Error fetching applicants:', err);
      }
    });
  }
}
