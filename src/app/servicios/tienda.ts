import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product { id:string; name:string; price:number; category:string; stock:number; img?:string; }
export interface Category { id:string; name:string; }
export interface Promo { id:string; title:string; discount:number; }

@Injectable({ providedIn: 'root' })
export class StoreService {
  private fs = inject(Firestore);

  // GET #1
  getProducts(): Observable<Product[]> {
    const ref = collection(this.fs, 'products');
    return collectionData(query(ref, orderBy('name')), { idField: 'id' }) as Observable<Product[]>;
  }

  // GET #2
  getCategories(): Observable<Category[]> {
    const ref = collection(this.fs, 'categories');
    return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
  }

  // GET #3
  getPromos(): Observable<Promo[]> {
    const ref = collection(this.fs, 'promos');
    return collectionData(ref, { idField: 'id' }) as Observable<Promo[]>;
  }
}
