import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../servicios/carrito';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-page.html'
  //styleUrl: './cart.component.css'
})
export class CarritoPage {
  cart = inject(CartService);
}
