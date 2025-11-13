import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressService, AddressCoords } from '../../servicios/direcciones';
import { ShippingService, ShippingQuote } from '../../servicios/envios';
import { CartService } from '../../servicios/carrito';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-page.html'
})
export class EnvioPage {

  // Dirección que escribe/ve el usuario
  address = '';

  // 🔵 NUEVO: país seleccionado (ISO 2 letras)
  country = 'AR';

  // 🔵 NUEVO: lista de países para el combo
  countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'BR', name: 'Brasil' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'UK', name: 'Reino Unido' },
  ];

  // Sugerencias de direcciones
  addressSuggestions = signal<string[]>([]);
  loadingSuggestions = signal(false);

  // Dirección confirmada (con coords)
  confirmedAddress = signal<AddressCoords | null>(null);

  // Envío
  loadingQuote = signal(false);
  quoteError = signal<string | null>(null);
  quote = signal<ShippingQuote | null>(null);

  // Pasos del flujo
  step = signal<'direccion' | 'resumen' | 'confirmado'>('direccion');
  confirmedAt = signal<Date | null>(null);

  // Servicios
  private addressService = inject(AddressService);
  private shippingService = inject(ShippingService);
  protected cart = inject(CartService);

  // Input de dirección con autocomplete
  onAddressInput(term: string) {
    this.address = term;
    this.quoteError.set(null);

    if (!term || term.length < 3) {
      this.addressSuggestions.set([]);
      return;
    }

    this.loadingSuggestions.set(true);

    // 👇 ahora le pasamos también el país a Postcoder
    this.addressService.search(term, this.country).subscribe({
      next: suggestions => {
        this.addressSuggestions.set(suggestions);
        this.loadingSuggestions.set(false);
      },
      error: err => {
        console.error('Error buscando direcciones', err);
        this.loadingSuggestions.set(false);
        this.addressSuggestions.set([]);
      }
    });
  }

  // Seleccionar una sugerencia
  chooseSuggestion(option: string) {
    this.address = option;
    this.addressSuggestions.set([]);
  }

  // Botón "Confirmar dirección"
  confirmarDireccion() {
    if (!this.address) return;

    this.loadingQuote.set(true);
    this.quoteError.set(null);
    this.quote.set(null);

    // 1) Obtener coordenadas de la dirección (Geoapify por ahora)
    this.addressService.getCoords(this.address).subscribe({
      next: coords => {
        this.confirmedAddress.set(coords);

        // 2) Llamar a la API de envíos con coords + subtotal
        const subtotal = this.cart.total();

        this.shippingService.getQuote(coords, subtotal).subscribe({
          next: q => {
            this.quote.set(q);
            this.loadingQuote.set(false);
            this.step.set('resumen');
          },
          error: err => {
            console.error('Error calculando envío', err);
            this.loadingQuote.set(false);
            this.quoteError.set('No se pudo calcular el envío. Intente nuevamente más tarde.');
          }
        });
      },
      error: err => {
        console.error('Error obteniendo coordenadas', err);
        this.loadingQuote.set(false);
        this.quoteError.set('No se pudo localizar la dirección. Probá con otra o más precisa.');
      }
    });
  }

  // Botón "Confirmar envío"
  confirmarEnvio() {
    this.confirmedAt.set(new Date());
    this.step.set('confirmado');
    this.cart.clear();
  }

  get totalConEnvio(): number {
    const q = this.quote();
    return (this.cart.total() ?? 0) + (q?.price ?? 0);
  }
}
