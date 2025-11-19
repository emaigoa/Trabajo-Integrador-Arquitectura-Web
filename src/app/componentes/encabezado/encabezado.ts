// encabezado.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../servicios/carrito';
import { AuthStateService } from '../../servicios/estado-auten';
import { AuthService } from '../../servicios/autenticacion';   //

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
  authWso2 = inject(AuthService);   //

  get isLoggedIn() {
    return this.authState.isLoggedIn();
  }

  get displayName() {
    return this.authState.displayName();
  }


  login() {
    this.authWso2.login();
  }


  logout() {
    this.authState.logout();
  }
}
