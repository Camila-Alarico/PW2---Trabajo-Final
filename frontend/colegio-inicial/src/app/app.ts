import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { ContactComponent } from './home/contact/contact';

@Component({
  standalone: true,
imports: [
  RouterOutlet,
  NavbarComponent,
  FooterComponent
],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App { }
