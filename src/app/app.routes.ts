import { Routes } from '@angular/router';
import { CatalogoPage } from './pages/catalogo/catalogo-page';
import { CarritoPage } from './pages/carrito/carrito-page';
import { EnvioPage } from './pages/envio/envio-page';
import { inject, PLATFORM_ID, Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginSimulacionComponent } from './pages/login-simulado/login-simulado';

// 1) Cargas dinámicas
const loadCallback   = () => import('./pages/callback/callback-page').then(m => m.CallbackPage);
const loadSignedOut  = () => import('./pages/cerrar/cerrar-page').then(m => m.CerrarPage);

// 2) Stub SSR para /callback
@Component({ standalone: true, template: `Procesando login…` })
class CallbackStubComponent {}

export const routes: Routes = [
  { path: 'callback', loadComponent: loadCallback, canMatch: [() => isPlatformBrowser(inject(PLATFORM_ID))] },
  { path: 'callback', component: CallbackStubComponent },

  // ✅ /signed-out usa el componente CerrarPage (export real del archivo)
  { path: 'cerrar', loadComponent: loadSignedOut },

  // ✅ NUEVA RUTA PARA EL COMPONENTE DE SIMULACIÓN DE LOGIN (Componente 3)
  { path: 'login-simulado', component: LoginSimulacionComponent },

  { path: '', component: CatalogoPage },
  { path: 'carrito', component: CarritoPage },
  { path: 'envio', component: EnvioPage },
  { path: '**', redirectTo: '' },
];
