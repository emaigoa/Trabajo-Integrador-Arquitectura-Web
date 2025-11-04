import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product, Category } from '../../servicios/tienda';
import { CartService } from '../../servicios/carrito';
import { ProductCardComponent } from '../../componentes/tarjeta/tarjeta';
import { combineLatest } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css'
})
export class CatalogoPage implements OnInit {
  private store = inject(StoreService);
  private cart = inject(CartService);

  loading = signal(true);
  vacias = Array.from({ length: 12 });
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  query = signal('');
  selectedCategory = signal<string | null>(null);

  ngOnInit(): void {
    // armamos observables que además populan los signals
    const products$   = this.store.getProducts().pipe(tap(d => this.products.set(d)));
    const categories$ = this.store.getCategories().pipe(tap(c => this.categories.set(c)));

    // cuando llegan por primera vez ambas colecciones, apagamos el loading
    combineLatest([products$, categories$]).pipe(take(1)).subscribe(() => this.loading.set(false));

    // si también llamás getPromos(), no hace falta esperarlo para el loading
    this.store.getPromos().subscribe();
  }

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cat = this.selectedCategory();
    return this.products().filter(p =>
      (!cat || p.category === cat) && (!q || p.name.toLowerCase().includes(q))
    );
  });

  selectCat(c?: string){ this.selectedCategory.set(c ?? null); }
  addToCart(p: Product){ this.cart.add(p); }
}
