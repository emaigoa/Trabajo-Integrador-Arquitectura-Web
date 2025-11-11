import { Component, EventEmitter, Input, Output, signal } from '@angular/core'; // 1. Importar 'signal'
import { CommonModule } from '@angular/common';
import type { Product } from '../../servicios/tienda';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  // 7. Signal para controlar la visibilidad de la animación "+1"
  showPlusOne = signal(false);

  /**
   * 8. Nueva función que maneja el clic en "Agregar"
   * Emite el evento y activa la animación.
   */
  onAddClick(event: MouseEvent) {
    // Detiene la propagación para que el clic no afecte a la tarjeta (buena práctica)
    event.stopPropagation();

    // Emite el evento original para agregar al carrito
    this.add.emit(this.product);

    // Si la animación ya está en curso, no la reinicies
    if (this.showPlusOne()) {
      return;
    }

    // Inicia la animación (muestra el <span> '+1')
    this.showPlusOne.set(true);

    // Termina la animación (oculta el <span>) después de 1 segundo
    setTimeout(() => {
      this.showPlusOne.set(false);
    }, 1000); // 1000ms = 1 segundo (debe coincidir con la duración de la animación)
  }
}
