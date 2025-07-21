import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admissions.html',
  styleUrls: ['./admissions.css']
})
export class Admissions implements OnInit {
  applicants: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8000/api/applicants/').subscribe((data) => {
      this.applicants = data;
    });
  }
}
