import { Injectable, inject, computed } from '@angular/core';
import { AuthService } from './autenticacion';
import { SimLoginService } from './autenticacionsim';

@Injectable({ providedIn: 'root' })
export class AuthStateService {

  private wso2 = inject(AuthService);
  private sim = inject(SimLoginService);

  // El encabezado usa este valor
  readonly isLoggedIn = computed(() => {
    return this.sim.loggedIn() || this.wso2.isLoggedIn();
  });

  loginWSO2() {
    this.wso2.login();
  }
  // El nombre que muestra el encabezado sea cual sea el método de login
  readonly displayName = computed(() => {
    if (this.sim.loggedIn()) return this.sim.displayName();

    if (this.wso2.isLoggedIn()) return this.wso2.displayName;

    return '';
  });

  // Logout universal: si está en WSO2 → logout real
  logout() {
    if (this.wso2.isLoggedIn()) {
      this.wso2.logout();
      return;
    }

    if (this.sim.loggedIn()) {
      this.sim.logout();
      return;
    }
  }
}
