// encabezado.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../servicios/carrito';
import { AuthStateService } from '../../servicios/estado-auten';
import { AuthService } from '../../servicios/autenticacion';   // ⬅️ WSO2

@Component({
  selector: 'encabezado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './encabezado.html',
  styleUrls: ['./encabezado.css']
})
export class EncabezadoComponent {

  cart = inject(CartService);
  authState = inject(AuthStateService);
  authWso2 = inject(AuthService);   // ⬅️ servicio real de WSO2

  get isLoggedIn() {
    return this.authState.isLoggedIn();
  }

  get displayName() {
    return this.authState.displayName();
  }

  // 👉 este lo usa el botón “Iniciar sesión”
  login() {
    this.authWso2.login();
  }

  // 👉 este lo usa el botón “Cerrar sesión”
  logout() {
    this.authState.logout();
  }
}
