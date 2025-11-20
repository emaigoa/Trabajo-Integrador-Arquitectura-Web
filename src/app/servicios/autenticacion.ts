import { Injectable, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { CartService } from './carrito';


// Servicio propio para cargar el perfil y exponer displayName
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _displayName = signal<string>('');
  private cart = inject(CartService);
  // Inyectamos OAuthService y Router
  constructor(
    private oauth: OAuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private pid: Object
  ) {}

  // Cargar el perfil del usuario después del login
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

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return isPlatformBrowser(this.pid) && !!this.oauth.hasValidAccessToken?.();
  }

  // Iniciar el proceso de login
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


  logout(): void {
    if (!isPlatformBrowser(this.pid)) return;

    //URL de retorno
    const postLogoutRedirectUri = `${environment.appBaseUrl}/cerrar`;

    // id_token actual para id_token_hint
    const idToken = this.oauth.getIdToken?.() || '';

    //Construir endpoint de logout OIDC de WSO2
    const issuerBase = environment.oidcIssuer?.replace(/\/oauth2\/?$/, '')?.replace(/\/$/, '') || 'https://localhost:9443';

    const url =
      `${issuerBase}/oidc/logout` +
      `?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}` +
      (idToken ? `&id_token_hint=${encodeURIComponent(idToken)}` : '') +
      `&state=logout`;

    // Limpieza local inmediata
    try { this.oauth.logOut(false as any); } catch {}
    try { this.oauth.revokeTokenAndLogout?.(); } catch {}
    try { this.oauth.logOut(); } catch {}
    this._displayName.set('');
    this.cart.clear();

    //Redirección forzada al IdP
    window.location.href = url;

    // Fallback por si algo falla con el IdP (a los 2s volvemos al home)
    setTimeout(() => this.router.navigateByUrl('/'), 2000);
  }
}
