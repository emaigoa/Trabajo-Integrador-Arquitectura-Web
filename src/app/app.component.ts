import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// importa tus componentes reales (mirá tus rutas)
import { EncabezadoComponent } from './componentes/encabezado/encabezado';
import { FooterComponent } from './componentes/footer/footer';

// servicio de auth
import { AuthService } from './servicios/autenticacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EncabezadoComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);

  async ngOnInit() {
    // Si al cargar la app ya hay token válido, traemos el perfil (claims)
    if (this.auth.isLoggedIn()) {
      await this.auth.afterLoginLoadProfile();
    }
  }
}
