import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './tienda';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<Product[]>([]);
  readonly total = computed(() => this.items().reduce((a,p)=> a + (p.price ?? 0), 0));

  add(p: Product){ this.items.update(arr => [...arr, p]); }
  remove(id: string){ this.items.update(arr => arr.filter(x => x.id !== id)); }
  clear(){ this.items.set([]); }
  count(){ return this.items().length; }
}
