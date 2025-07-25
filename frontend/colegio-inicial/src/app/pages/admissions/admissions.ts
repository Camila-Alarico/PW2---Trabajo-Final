import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Applicant {
  full_name: string;
  grade_applied: string;
  dni: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private apiUrl = 'http://localhost:8001/api/applicants/'; // Asegúrate de usar el puerto correcto

  constructor(private http: HttpClient) {}

  getApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.apiUrl);
  }
}

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admissions.html',
  styleUrls: ['./admissions.css']
})
export class Admissions implements OnInit {
  applicants: Applicant[] = [];

  constructor(private applicantService: ApplicantService) {}

  ngOnInit() {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
    });
  }
}