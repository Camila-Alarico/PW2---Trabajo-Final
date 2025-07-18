import { Component } from '@angular/core';
import { HeroComponent } from '../../home/hero/hero';
import { ServicesComponent } from '../../home/services/services';
import { AboutComponent } from '../../home/about/about';
import { PortfolioComponent } from '../../home/portfolio/portfolio';
import { TeamComponent } from '../../home/team/team';
import { ContactComponent } from '../../home/contact/contact';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    TeamComponent,
    ContactComponent
  ],
  templateUrl: './home.html'
})
export class Home {}
