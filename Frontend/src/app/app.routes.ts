import { HOME } from '@angular/cdk/keycodes';
import { Routes } from '@angular/router';
import {Home} from './components/home/home';

export const routes: Routes = [
    {
    path: '',
    component:Home
    },
    {
        path: 'eventos',
        loadComponent:()=>
            import('./components/eventos/eventos')
            .then(m=>m.Eventos)
    }
];
