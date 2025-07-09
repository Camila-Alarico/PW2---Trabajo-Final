import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { HeroComponent } from './home/hero/hero';
import { ServicesComponent } from './home/services/services';
import { AboutComponent } from './home/about/about';
import { PortfolioComponent } from './home/portfolio/portfolio';
import { TeamComponent } from './home/team/team';
import { FooterComponent } from './shared/footer/footer';
import { ContactComponent } from './home/contact/contact';
//Se podria agregar contact component
@Component({
  standalone: true,
  //import RouterOutlet, fallaba
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
