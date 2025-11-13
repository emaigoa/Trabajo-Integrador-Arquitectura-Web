import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-page.html'
  //styleUrl: './envio-page.css'
})
export class EnvioPage {

  address = '';
  // acá luego integramos ShippingService (OpenRouteService) para calcular envío
  submitted = signal(false);

  submit(){
    this.submitted.set(true);
  }
}
