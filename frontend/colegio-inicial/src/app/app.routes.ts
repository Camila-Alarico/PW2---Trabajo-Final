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
  {
    path: 'admin',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'postulantes', pathMatch: 'full' },
      { path: 'postulantes',
        loadComponent: () =>
          import('./admin-panel/applicants/postulante-list').then(
            m => m.PostulanteList)
      },
      { path: 'postulantes/crear',
        loadComponent: () =>
        import('./admin-panel/applicants/postulante-create').then(
        m => m.PostulanteCreate)
      },
      { 
        path: 'postulantes/editar/:id',
        loadComponent: () =>
          import('./admin-panel/applicants/postulante-edit').then(
            m => m.PostulanteEdit
          )
      },
      {
        path: 'postulantes/ver/:id',
        loadComponent: () =>
          import('./admin-panel/applicants/postulante-view').then(
            m => m.PostulanteView
          )
      },
      

      { path: 'padres', loadComponent: () => import('./admin-panel/parents/parent-list').then(m => m.ParentList) },
      { path: 'padres/crear', loadComponent: () => import('./admin-panel/parents/parent-create').then(m => m.ParentCreate) },
      { path: 'padres/editar/:id', loadComponent: () => import('./admin-panel/parents/parent-edit').then(m => m.ParentEdit) },
      { path: 'padres/ver/:id', loadComponent: () => import('./admin-panel/parents/parent-view').then(m => m.ParentView) },
      
      {
        path: 'pagos',
        loadComponent: () =>
          import('./admin-panel/payments/payment-list').then(m => m.PaymentList)
      },
      { path: 'pagos/editar/:id', loadComponent: () => import('./admin-panel/payments/payment-edit').then(m => m.PaymentEdit) },
      { path: 'pagos/crear', loadComponent: () => import('./admin-panel/payments/payment-create').then(m => m.PaymentCreate) },

      { path: 'etapas', loadComponent: () => import('./admin-panel/stages/stage-list').then(m => m.StageList)},
      { path: 'etapas/crear', loadComponent: () => import('./admin-panel/stages/stage-create').then(m => m.StageCreate)},
      { path: 'etapas/editar/:id', loadComponent: () => import('./admin-panel/stages/stage-edit').then(m => m.StageEdit)}

    ]
  }
];
  