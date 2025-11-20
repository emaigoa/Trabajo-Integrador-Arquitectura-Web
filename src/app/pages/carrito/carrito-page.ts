import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../servicios/carrito';
import { AuthStateService } from '../../servicios/estado-auten';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito-page.html',
  styleUrl: './carrito-page.css'
})
export class CarritoPage {
  protected cart = inject(CartService);
  protected authState = inject(AuthStateService);
  protected Math = Math;
}
