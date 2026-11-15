import { Routes } from '@angular/router';
import { SharedLayout } from './layout/shared-layout/shared-layout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: '',
    component: SharedLayout,
    children: [
      {
        path: 'eventos',
        loadComponent: () =>
          import('./components/evento-lista/evento-lista').then((m) => m.EventoLista),
      },
      {
        path: 'evento-nuevo',
        loadComponent: () =>
          import('./components/evento-nuevo/evento-nuevo').then((m) => m.EventoNuevo),
      },
      // {
      //     path: 'eventos/:id',
      //     loadComponent:()=>
      //         import('./components/evento-detalle/evento-detalle')
      //         .then(m=>m.EventoDetalle)
      // },
      {
        path: 'ranking',
        loadComponent: () => import('./components/ranking/ranking').then((m) => m.Ranking),
      },
      {
        path: 'historial',
        loadComponent: () => import('./components/historial/historial').then((m) => m.Historial),
      },
      //   {
      //     path: 'integrantes',
      //     loadComponent: () =>
      //       import('./components/integrantes/integrantes').then((m) => m.Integrantes),
      //   },
    ],
  },
];
