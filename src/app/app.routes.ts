import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list').then(m => m.ProductListComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail').then(m => m.ProductDetailComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search').then(m => m.SearchComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart').then(m => m.CartComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
