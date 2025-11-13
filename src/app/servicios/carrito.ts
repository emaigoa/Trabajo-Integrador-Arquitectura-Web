// src/app/servicios/carrito.ts
import { Injectable, computed, signal, effect } from '@angular/core';
import type { Product } from './tienda';

export interface CartItem {
  product: Product;
  quantity: number;
  originalPrice?: number;
  promoInfo?: string;
  promoType?: string;  // '2x1', '3x2', 'percentage', etc.
}

const STORAGE_KEY = 'minimarket-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  // Total con lógica de 2x1 (podés extender para otros tipos de promo)
  readonly total = computed(() =>
    this.items().reduce((sum, item) => {
      const price = item.product.price;
      const qty = item.quantity;

      if (item.promoType === '2x1') {
        // Cada 2 unidades, se paga 1
        const paidUnits = Math.ceil(qty / 2);
        return sum + price * paidUnits;
      }

      // Sin promo especial: precio normal por cantidad
      return sum + price * qty;
    }, 0)
  );

  // Cantidad total de unidades en el carrito
  readonly count = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  constructor() {
    // Evitamos romper SSR: sólo tocamos window/localStorage en el browser
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as CartItem[];
          this.items.set(parsed);
        } catch {
          // Si hay algo corrupto, limpiamos
          this.items.set([]);
        }
      }

      // Cualquier cambio en items se persiste en localStorage
      effect(() => {
        const current = this.items();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      });
    }
  }

  add(p: Product & { originalPrice?: number; promoInfo?: string; promoType?: string }) {
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
          promoType: p.promoType
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

  removeItemCompletely(id: string) {
    this.items.update(items => items.filter(item => item.product.id !== id));
  }

  clear() {
    this.items.set([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}
