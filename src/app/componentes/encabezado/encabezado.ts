// src/app/componentes/encabezado/encabezado.ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../servicios/carrito';
import { AuthService } from '../../servicios/autenticacion';

@Component({
  selector: 'encabezado',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class EncabezadoComponent {
  cart = inject(CartService);
  auth = inject(AuthService);

  get loggedIn() {
    return this.auth.isLoggedIn();
  }

  get displayName() {
    return this.auth.displayName; // viene del AuthService (claims.name / email / etc.)
  }

  login()    { this.auth.login(); }
  logout()   { this.auth.logout(); }
}
