import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { ContactComponent } from './home/contact/contact';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  constructor(public router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
