// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenUrl = 'http://localhost:8000/api/token/';
  private applicantsUrl = 'http://localhost:8000/api/applicants/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.tokenUrl, {
      username: email,
      password: password
    });
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  getApplicants() {
    const token = this.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(this.applicantsUrl, { headers });
  }
}
