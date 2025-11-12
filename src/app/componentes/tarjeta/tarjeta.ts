import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Product, Promo } from '../../servicios/tienda';

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
  @Input() promos: Promo[] = [];

  showPlusOne = signal(false);

  // Signal computada para encontrar la promo aplicable
  applicablePromo = computed(() => {
    if (!this.product || !this.promos) {
      return null;
    }
    return this.promos.find(p => p.categoryName === this.product.category) || null;
  });

  // Signal computada para calcular el precio con descuento (solo para descuentos %)
  discountedPrice = computed(() => {
    const promo = this.applicablePromo();

    // Solo calcula precio si es descuento porcentual
    if (promo && promo.discount && promo.promoType !== '2x1') {
      const discountAmount = this.product.price * (promo.discount / 100);
      return parseFloat((this.product.price - discountAmount).toFixed(2));
    }
    return null;
  });

  // NUEVO: Signal para verificar si es 2x1
  is2x1 = computed(() => {
    const promo = this.applicablePromo();
    return promo?.promoType === '2x1';
  });

  onAddClick(event: MouseEvent) {
    event.stopPropagation();
    this.add.emit(this.product);

    if (this.showPlusOne()) {
      return;
    }
    this.showPlusOne.set(true);
    setTimeout(() => {
      this.showPlusOne.set(false);
    }, 1000);
  }
}
