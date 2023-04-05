import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/photos/photos.page').then( m => m.PhotosPage)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.page').then( m => m.DetailPage)
  },
];
