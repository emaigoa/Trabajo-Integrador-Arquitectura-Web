// src/app/servicios/tienda.ts
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

export interface Product { id:string; name:string; price:number; category:string; stock:number; img?:string; }
export interface Category { id:string; name:string; }
export interface Promo { id:string; title:string; discount:number; }

@Injectable({ providedIn: 'root' })
export class StoreService {
  private platformId = inject(PLATFORM_ID);
  // Sólo inyecta Firestore en browser
  private fs: Firestore | null = isPlatformBrowser(this.platformId) ? inject(Firestore) : null;

  getProducts(): Observable<Product[]> {
    if (!this.fs) return of([]); // SSR: no tocar Firebase
    const ref = collection(this.fs, 'products');
    return collectionData(query(ref, orderBy('name')), { idField: 'id' }) as Observable<Product[]>;
  }

  getCategories(): Observable<Category[]> {
    if (!this.fs) return of([]);
    const ref = collection(this.fs, 'categories');
    return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
  }

  getPromos(): Observable<Promo[]> {
    if (!this.fs) return of([]);
    const ref = collection(this.fs, 'promos');
    return collectionData(ref, { idField: 'id' }) as Observable<Promo[]>;
  }
}
