import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './tienda';

export interface CartItem {
  product: Product;
  quantity: number;
  originalPrice?: number;
  promoInfo?: string;
  promoType?: string;  // NUEVO: '2x1', '3x2', 'percentage'
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  // Calcula el total aplicando la lógica del 2x1
  readonly total = computed(() =>
    this.items().reduce((sum, item) => {
      const price = item.product.price;
      const qty = item.quantity;

    // Si es 2x1, cada 2 unidades pagas solo 1
    if (item.promoType === '2x1') {
      const paidUnits = Math.ceil(qty / 2);
      return sum + (price * paidUnits);
    }

    // Si es descuento normal
    return sum + (price * qty);
  }, 0)
);

  readonly count = computed(() =>
    this.items().reduce((a, item) => a + item.quantity, 0)
  );

  add(p: Product & { originalPrice?: number; promoInfo?: string; promoType?: string }){
    const existingItem = this.items().find(item => item.product.id === p.id);

    if (existingItem) {
      this.items.update(items =>
        items.map(item =>
          item.product.id === p.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.items.update(items => [
        ...items,
        {
          product: p,
          quantity: 1,
          originalPrice: p.originalPrice,
          promoInfo: p.promoInfo,
          promoType: p.promoType  // NUEVO
        }
      ]);
    }
  }

  decrease(id: string) {
    const existingItem = this.items().find(item => item.product.id === id);

    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      this.removeItemCompletely(id);
    } else {
      this.items.update(items =>
        items.map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  }

  removeItemCompletely(id: string){
    this.items.update(arr => arr.filter(item => item.product.id !== id));
  }

  clear(){ this.items.set([]); }
}
