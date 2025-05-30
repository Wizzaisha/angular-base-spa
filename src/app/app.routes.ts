import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/module1/module1.component').then(
        (c) => c.Module1Component
      ),
  },
];
