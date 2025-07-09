import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutUsComponent } from './pages/about-us/about-us';
import { AdmissionsComponent } from './pages/admissions/admissions';
import { GalleryComponent } from './pages/gallery/gallery';
import { ContactPageComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactPageComponent },
];
