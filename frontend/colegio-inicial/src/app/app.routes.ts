import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Admissions } from './pages/admissions/admissions';
import { Gallery } from './pages/gallery/gallery';
import { Contact } from './pages/login/login';
import { Dashboard } from './admin-panel/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'admissions', component: Admissions },
  { path: 'gallery', component: Gallery },
  { path: 'login', component: Contact },
  { path: 'admin', component: Dashboard},
  { path: 'admin/postulantes',
  loadComponent: () =>
    import('./admin-panel/applicants/postulante-list').then(
      m => m.PostulanteList
    )
}
];
 