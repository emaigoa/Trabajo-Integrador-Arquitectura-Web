import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

// Definimos las interfaces para los datos de la tienda
export interface Product {
  id:string;
  name:string;
  price:number;
  category:string;
  stock:number;
  img?:string;
}

export interface Category { id:string; name:string; }

// Nueva interfaz para promociones
export interface Promo {
  id:string;
  title:string;          // ej: "Promo Verano" o "50% OFF"
  categoryName: string;   // ej: "Lácteos" (para vincular)
  discount?: number;
  promoType?: string;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private platformId = inject(PLATFORM_ID);
  private fs: Firestore | null = isPlatformBrowser(this.platformId) ? inject(Firestore) : null;

  // Obtener productos desde Firestore
  getProducts(): Observable<Product[]> {
    if (!this.fs) return of([]);
    const ref = collection(this.fs, 'products');
    return collectionData(query(ref, orderBy('name')), { idField: 'id' }) as Observable<Product[]>;
  }

  // Obtener categorías desde Firestore
  getCategories(): Observable<Category[]> {
    if (!this.fs) return of([]);
    const ref = collection(this.fs, 'categories');
    return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
  }

  // Obtener promociones desde Firestore
  getPromos(): Observable<Promo[]> {
    if (!this.fs) return of([]);
    const ref = collection(this.fs, 'promos');
    return collectionData(ref, { idField: 'id' }) as Observable<Promo[]>;
  }
}
