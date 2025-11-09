import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para @if, @for, | number
import { RouterLink } from '@angular/router';   // Necesario para routerLink
import { CartService } from '../../servicios/carrito'; // Inyecta el servicio de carrito

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink], // Módulos que usa el HTML
  templateUrl: './carrito-page.html'  // Apunta al HTML que corregimos (con 'cartItem')
})
export class CarritoPage { // <--- Soluciona el error 'No matching export'

  // Inyecta el servicio de carrito para que el HTML pueda usar 'cart'
  protected cart = inject(CartService);

  // Ya no importa './tienda' (Soluciona el error TS2307)
}
