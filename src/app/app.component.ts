import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// importa tus componentes reales (mirá tus rutas)
import { EncabezadoComponent } from './componentes/encabezado/encabezado';
import { FooterComponent } from './componentes/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EncabezadoComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {}
