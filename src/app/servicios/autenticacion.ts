// src/app/servicios/autenticacion.ts
import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _displayName = signal<string>('');

  constructor(
    private oauth: OAuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private pid: Object
  ) {}

  async afterLoginLoadProfile() {
    if (!isPlatformBrowser(this.pid)) return;
    try {
      await this.oauth.loadUserProfile();
      const claims: any = this.oauth.getIdentityClaims() || {};
      const name =
        claims?.name ||
        (claims?.given_name && claims?.family_name
          ? `${claims.given_name} ${claims.family_name}`
          : null) ||
        claims?.preferred_username ||
        claims?.email ||
        '';
      this._displayName.set(name);
    } catch {
      this._displayName.set('');
    }
  }

  get displayName(): string {
    return this._displayName();
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.pid) && !!this.oauth.hasValidAccessToken?.();
  }

  login(): void {
    if (!isPlatformBrowser(this.pid)) return;
    const redirectUri = `${environment.appBaseUrl}/callback`;
    this.oauth.redirectUri = redirectUri;
    if (typeof this.oauth.initCodeFlow === 'function') {
      this.oauth.initCodeFlow();
    } else {
      this.oauth.initLoginFlow(redirectUri);
    }
  }

  /** Logout con OIDC RP-initiated y redirección inmediata al front. */
  logout(): void {
    if (!isPlatformBrowser(this.pid)) return;

    // 1) URL de retorno (debe estar whitelisteada en WSO2)
    const postLogoutRedirectUri = `${environment.appBaseUrl}/cerrar`;

    // 2) id_token actual para id_token_hint (recomendado por OIDC)
    const idToken = this.oauth.getIdToken?.() || '';

    // 3) Construir endpoint de logout OIDC de WSO2
    //    Si tu issuer/issuer base está en environment, usalo; si no, ponelo literal.
    const issuerBase = environment.oidcIssuer?.replace(/\/oauth2\/?$/, '')?.replace(/\/$/, '') || 'https://localhost:9443';
    // WSO2: /oidc/logout soporta id_token_hint + post_logout_redirect_uri
    const url =
      `${issuerBase}/oidc/logout` +
      `?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}` +
      (idToken ? `&id_token_hint=${encodeURIComponent(idToken)}` : '') +
      `&state=logout`;

    // 4) Limpieza local inmediata (no dependas de que el IdP vuelva)
    try { this.oauth.logOut(false as any); } catch {}
    try { this.oauth.revokeTokenAndLogout?.(); } catch {}
    try { this.oauth.logOut(); } catch {}
    this._displayName.set('');

    // 5) Redirección forzada al IdP (sin confirmación si deshabilitaste logout consent)
    //    WSO2 devolverá a /signed-out y desde ahí navegás al home.
    window.location.href = url;

    // 6) Fallback por si algo falla con el IdP (a los 2s volvemos al home)
    setTimeout(() => this.router.navigateByUrl('/'), 2000);
  }
}
