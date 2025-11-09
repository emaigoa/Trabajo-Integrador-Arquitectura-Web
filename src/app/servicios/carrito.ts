import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './tienda';

// 1. Nueva interfaz para agrupar productos y cantidades
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // 2. El 'store' (items) ahora usa CartItem[]
  readonly items = signal<CartItem[]>([]);

  // 3. 'total' (computado) ahora multiplica precio * cantidad
  readonly total = computed(() =>
    this.items().reduce((a, item) => a + (item.product.price * item.quantity), 0)
  );

  // 4. 'count' (computado) ahora suma las cantidades de todos los items
  readonly count = computed(() =>
    this.items().reduce((a, item) => a + item.quantity, 0)
  );

  /**
   * 5. 'add' (actualizado)
   * Agrega un producto. Si ya existe, incrementa la cantidad.
   */
  add(p: Product){
    const existingItem = this.items().find(item => item.product.id === p.id);

    if (existingItem) {
      // Si existe, actualiza la cantidad (de forma inmutable)
      this.items.update(items =>
        items.map(item =>
          item.product.id === p.id
            ? { ...item, quantity: item.quantity + 1 } // Incrementa cantidad
            : item
        )
      );
    } else {
      // Si no existe, agrega el nuevo CartItem con cantidad 1
      this.items.update(items => [...items, { product: p, quantity: 1 }]);
    }
  }

  /**
   * 6. 'decrease' (NUEVO - Requerido por el HTML del carrito)
   * Resta un producto. Si la cantidad llega a 1, lo elimina.
   */
  decrease(id: string) {
    const existingItem = this.items().find(item => item.product.id === id);

    if (!existingItem) return; // Guarda de seguridad

    if (existingItem.quantity === 1) {
      // Si es el último, elimínalo de la lista usando la función renombrada
      this.removeItemCompletely(id);
    } else {
      // Si no, solo resta la cantidad
      this.items.update(items =>
        items.map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 } // Decrementa cantidad
            : item
        )
      );
    }
  }

  /**
   * 7. 'removeItemCompletely' (RENOMBRADO - Solucionó el error de compilación)
   * Elimina una línea de producto completa del carrito (ej. "Quitar X").
   */
  removeItemCompletely(id: string){
    this.items.update(arr => arr.filter(item => item.product.id !== id));
  }

  /** 8. 'clear' (sin cambios) */
  clear(){ this.items.set([]); }
}
