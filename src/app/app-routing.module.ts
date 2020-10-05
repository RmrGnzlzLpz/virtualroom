import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicializarDatosDeEntidadesComponent } from './components/inicializar-datos-de-entidades/inicializar-datos-de-entidades.component';

const routes: Routes = [
  { path: 'importar', component: InicializarDatosDeEntidadesComponent },
];


export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: false });
