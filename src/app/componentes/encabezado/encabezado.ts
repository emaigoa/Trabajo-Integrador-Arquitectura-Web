import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../servicios/carrito';

@Component({
  selector: 'encabezado',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class EncabezadoComponent {
  cart = inject(CartService);
}
