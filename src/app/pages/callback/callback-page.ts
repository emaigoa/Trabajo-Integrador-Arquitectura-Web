import { Component, Inject, PLATFORM_ID, OnInit, afterNextRender, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OAuthService, OAuthEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';

@Component({
  standalone: true,
  selector: 'app-callback',
  template: `Procesando login…`
})
export class CallbackPage implements OnInit {
  private navigated = false;

  constructor(
    private oauth: OAuthService,
    private router: Router,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private pid: Object
  ) {}

  private goHome() {
    if (this.navigated) return;
    this.navigated = true;
    // Asegurar navegación dentro de Angular Zone
    this.zone.run(() => this.router.navigateByUrl('/'));
  }

  async ngOnInit() {
    if (!isPlatformBrowser(this.pid)) return;

    // 1) Si por algún motivo ya hay token válido, navegá
    if (this.oauth.hasValidAccessToken?.()) {
      this.goHome();
      return;
    }

    // 2) Escuchá el evento de éxito y navegá
    const sub = this.oauth.events?.subscribe((e: OAuthEvent) => {
      if ((e as OAuthSuccessEvent).type === 'token_received') {
        sub?.unsubscribe?.();
        this.goHome();
      }
    });

    // 3) Ejecutá el intercambio del code -> tokens después del render del cliente
    afterNextRender(async () => {
      try {
        if (this.oauth.tryLoginCodeFlow) {
          await this.oauth.tryLoginCodeFlow();
        } else if (this.oauth.loadDiscoveryDocumentAndTryLogin) {
          await this.oauth.loadDiscoveryDocumentAndTryLogin();
        }
      } finally {
        // 4) Fallback: si por algún motivo no llegó el evento, navegá igual
        setTimeout(() => this.goHome(), 500);
      }
    });
  }
}
