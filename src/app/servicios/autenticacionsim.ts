import { Injectable, signal, computed, inject } from '@angular/core';
import { CartService } from './carrito';
import { Router } from '@angular/router';

// Definimos la interfaz para el usuario
export interface SimUser {
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class SimLoginService {
  private router = inject(Router);
  private _user = signal<SimUser | null>(null);
  private cart = inject(CartService);
  // Nombre que va a mostrar el encabezado
  readonly displayName = computed(() => {
    const u = this._user();
    if (!u) return '';
    return u.username || u.email;
  });

  readonly loggedIn = computed(() => !!this._user());

  login(username: string, email: string) {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();
    const finalUsername =
      cleanUsername ||
      (cleanEmail ? cleanEmail.split('@')[0] : '');

    this._user.set({
      username: finalUsername || cleanEmail,
      email: cleanEmail
    });
  }

  logout() {
    this._user.set(null);
    this.cart.clear();
    this.router.navigate(['/']);

  }

  get user(): SimUser | null {
    return this._user();
  }
}
