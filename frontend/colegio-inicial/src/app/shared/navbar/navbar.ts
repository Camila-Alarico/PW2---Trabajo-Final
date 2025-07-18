import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;

  constructor(public router: Router) {}

  get isHome(): boolean {
    return this.router.url === '/home';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit(): void {
    this.onWindowScroll(); 
  }
}

