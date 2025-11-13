import { Injectable, signal, computed } from '@angular/core';

export interface SimUser {
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class SimLoginService {

  private _user = signal<SimUser | null>(null);

  // nombre que va a mostrar el encabezado
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
  }

  get user(): SimUser | null {
    return this._user();
  }
}
