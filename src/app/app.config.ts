import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

// Firebase (AngularFire web)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Detectar si estamos en browser SIN usar inject()
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),

    // Solo registrar Firebase en browser (evita NG0203 y problemas en SSR/prerender)
    ...(isBrowser
      ? [
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => getFirestore()),
        ]
      : []),
  ],
};
