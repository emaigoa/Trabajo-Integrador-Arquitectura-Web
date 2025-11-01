import { Routes } from '@angular/router';
import { CatalogoPage } from './pages/catalogo/catalogo-page';
import { CarritoPage } from './pages/carrito/carrito-page';
import { EnvioPage } from './pages/envio/envio-page';
import { LoginPage } from './pages/login/login-page';

export const routes: Routes = [
  { path: '', component: CatalogoPage },
  { path: 'carrito', component: CarritoPage },
  { path: 'envio', component: EnvioPage },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '' }
];
