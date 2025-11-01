import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Product } from '../../servicios/tienda';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card h-100">
    <img *ngIf="product.img" [src]="product.img" class="card-img-top" [alt]="product.name">
    <div class="card-body d-flex flex-column">
      <h6 class="card-title">{{ product.name }}</h6>
      <small class="text-muted">{{ product.category }}</small>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <span class="fw-bold">$ {{ product.price }}</span>
        <button class="btn btn-sm btn-success" (click)="add.emit(product)">Agregar</button>
      </div>
    </div>
  </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
}
