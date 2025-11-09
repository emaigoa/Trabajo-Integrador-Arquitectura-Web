import { Component, EventEmitter, Input, Output, signal } from '@angular/core'; // 1. Importar 'signal'
import { CommonModule } from '@angular/common';
import type { Product } from '../../servicios/tienda';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <!-- Se agregó la clase 'card-hover-effect' -->
  <div class="card h-100 card-hover-effect">
    <img *ngIf="product.img" [src]="product.img" class="card-img-top" [alt]="product.name">
    <div class="card-body d-flex flex-column">
      <h6 class="card-title">{{ product.name }}</h6>
      <small class="text-muted">{{ product.category }}</small>

      <!-- 2. Contenedor del botón con 'position: relative' -->
       <div class="mt-auto d-flex justify-content-between align-items-center button-container">
       <span class="fw-bold">$ {{ product.price }}</span>

        <!-- 3. Botón ahora llama a onAddClick() -->
        <button class="btn btn-sm btn-success" (click)="onAddClick($event)">Agregar</button>

        <!-- 4. Elemento "+1" que se animará (controlado por el Signal) -->
        @if (showPlusOne()) {
          <span class="plus-one-animation">+1</span>
        }
      </div>
    </div>
  </div>
  `,
  styles: [`
    .card-hover-effect {
      /* ... (estilos de hover existentes) ... */
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      cursor: pointer;
    }
    .card-hover-effect:hover {
      /* ... (estilos de hover existentes) ... */
      transform: scale(1.20);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.15);
      z-index: 10;
    }

    /* 5. ESTILOS PARA LA NUEVA ANIMACIÓN "+1" */

    .button-container {
      /* Contenedor relativo para posicionar el "+1" */
      position: relative;
    }

    .plus-one-animation {
      position: absolute;
      /* Posiciona el "+1" cerca del botón de agregar */
      right: 15px;
      top: -10px;

      font-size: 1.5rem;
      font-weight: bold;
      color: #198754; /* Color verde (Bootstrap 'success') */

      /* Evita que el <span> bloquee clics */
      pointer-events: none;

      /* Asigna la animación 'fade-and-rise' */
      animation: fade-and-rise 1s ease-out forwards;
    }
  `]
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
