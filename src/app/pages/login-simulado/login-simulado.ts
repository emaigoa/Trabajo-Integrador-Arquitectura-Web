import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimLoginService } from '../../servicios/autenticacionsim';

@Component({
  selector: 'app-login-simulacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-simulado.html',
  styleUrls: ['./login-simulado.css']
})
export class LoginSimulacionComponent {

  username = signal('');
  email = signal('');

  mensaje = signal('');
  dataEnviada = signal<any>(null);
  errorMensaje = signal('');

  private simAuth = inject(SimLoginService);

  onUsernameChange(e: Event) {
    this.username.set((e.target as HTMLInputElement).value);
  }

  onEmailChange(e: Event) {
    this.email.set((e.target as HTMLInputElement).value);
  }

  private reset() {
    this.username.set('');
    this.email.set('');
  }

  submitLogin() {
    const user = this.username().trim();
    const mail = this.email().trim();

    this.errorMensaje.set('');
    this.mensaje.set('');
    this.dataEnviada.set(null);

    if (!user || !mail) {
      this.errorMensaje.set('Debe completar ambos campos.');
      return;
    }

    if (!mail.includes('@')) {
      this.errorMensaje.set('Email no válido.');
      return;
    }

    console.log('--- SIMULACIÓN DE LOGIN EXITOSO ---', { username: user, email: mail });

    this.mensaje.set(`Hola ${mail}! Login exitoso.`);
    this.dataEnviada.set({ username: user, email: mail });

    this.simAuth.login(user, mail);

    this.reset();
  }
}
