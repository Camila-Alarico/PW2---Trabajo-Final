import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { ContactComponent } from './home/contact/contact';
import { FormsModule } from '@angular/forms';
import { Contact } from './pages/login/login';



@Component({
  standalone: true,
imports: [
  RouterOutlet,
  NavbarComponent,
  FooterComponent,
  FormsModule,
  //Contact
],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App { }
