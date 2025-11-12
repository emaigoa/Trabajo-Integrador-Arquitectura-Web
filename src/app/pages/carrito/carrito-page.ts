import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../servicios/carrito';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito-page.html'
})
export class CarritoPage {
  protected cart = inject(CartService);

  // AÑADE ESTA LÍNEA: Exponer Math para el template
  protected Math = Math;
}
