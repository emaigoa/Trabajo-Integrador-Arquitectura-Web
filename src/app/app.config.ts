import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { routes } from './app.routes';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// OAuth2 (OIDC)
import {
  provideOAuthClient,
  OAuthService,
  AuthConfig,
  OAuthStorage,
} from 'angular-oauth2-oidc';

// Servicio propio para cargar el perfil y exponer displayName
import { AuthService } from './servicios/autenticacion';

// detectar si estamos en browser
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const base = environment.oidcIssuer.replace(/\/$/, ''); // sin barra final
/**  config OIDC (endpoints manuales de WSO2) */
const authConfig: AuthConfig = {
   loginUrl:        `${base}/authorize`,
  tokenEndpoint:   `${base}/token`,
  userinfoEndpoint:`${base}/userinfo`,
  revocationEndpoint: `${base}/revoke`,
  logoutUrl:       `${base.replace(/\/oauth2$/, '')}/oidc/logout`, // ruta OIDC

  redirectUri: `${environment.appBaseUrl}/callback`,

  clientId: environment.oidcClientId ?? 'o2B5f_ZslC19ctDZvL9tYxKUUNoa',
  responseType: 'code',
  scope: 'openid email profile',
  skipIssuerCheck: true,
  strictDiscoveryDocumentValidation: false,
  requireHttps: true,
};

function storageFactory(pid: Object): OAuthStorage {
  if (!isPlatformBrowser(pid)) {
    return {
      getItem: (_: string) => null,
      removeItem: (_: string) => {},
      setItem: (_: string, __: string) => {},
    } as OAuthStorage;
  }
  return localStorage;
}

function oauthInitFactory(oauth: OAuthService, pid: Object, auth: AuthService) {
  return async () => {
    oauth.configure(authConfig);
    if (!isPlatformBrowser(pid)) return;
    await oauth.tryLoginCodeFlow();
    if (oauth.hasValidAccessToken()) {
      await auth.afterLoginLoadProfile();
    }
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideOAuthClient(),

    { provide: OAuthStorage, useFactory: storageFactory, deps: [PLATFORM_ID] },

    {
      provide: APP_INITIALIZER,
      useFactory: oauthInitFactory,
      deps: [OAuthService, PLATFORM_ID, AuthService],
      multi: true,
    },

    ...(isBrowser
      ? [
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => getFirestore()),
        ]
      : []),
  ],
};
