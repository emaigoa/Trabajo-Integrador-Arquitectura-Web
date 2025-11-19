import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Product, Category, Promo } from '../../servicios/tienda';
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
  promos = signal<Promo[]>([]);
  query = signal('');
  selectedCategory = signal<string | null>(null);

  ngOnInit(): void {
    const products$   = this.store.getProducts().pipe(tap(d => this.products.set(d)));
    const categories$ = this.store.getCategories().pipe(tap(c => this.categories.set(c)));
    const promos$     = this.store.getPromos().pipe(tap(p => this.promos.set(p)));

    combineLatest([products$, categories$, promos$]).pipe(take(1)).subscribe(() => {
      this.loading.set(false);
    });
  }

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cat = this.selectedCategory();
    return this.products().filter(p =>
      (!cat || p.category === cat) && (!q || p.name.toLowerCase().includes(q))
    );
  });

  selectCat(c?: string){
    this.selectedCategory.set(c ?? null);
  }

  addToCart(p: Product){
    const promo = this.promos().find(pr => pr.categoryName === p.category);

    if (!promo) {
      // Sin promoción
      this.cart.add(p);
      return;
    }

    // manejo de promocion 2x1
    if (promo.promoType === '2x1') {
      const productWith2x1 = {
        ...p,
        promoInfo: promo.title,
        promoType: '2x1'
      };
      this.cart.add(productWith2x1);
      return;
    }

    // manejo de descuento porcentual
    if (promo.discount) {
      const discountAmount = p.price * (promo.discount / 100);
      const newPrice = parseFloat((p.price - discountAmount).toFixed(2));

      const discountedProduct = {
        ...p,
        price: newPrice,
        originalPrice: p.price,
        promoInfo: promo.title
      };

      this.cart.add(discountedProduct);
      return;
    }

    // sin descuento aplicable
    this.cart.add(p);
  }
}
