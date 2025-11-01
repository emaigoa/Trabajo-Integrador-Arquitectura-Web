import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product, Category } from '../../servicios/tienda';
import { CartService } from '../../servicios/carrito';
import { ProductCardComponent } from '../../componentes/tarjeta/tarjeta';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './catalogo-page.html'
})
export class CatalogoPage implements OnInit {
  private store = inject(StoreService);
  private cart = inject(CartService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  query = signal('');
  selectedCategory = signal<string | null>(null);

  ngOnInit(): void {
    this.store.getProducts().subscribe(d => this.products.set(d));
    this.store.getCategories().subscribe(c => this.categories.set(c));
    this.store.getPromos().subscribe(); // 3er GET
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
