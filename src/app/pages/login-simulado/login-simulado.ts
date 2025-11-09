import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-simulacion',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- 'RouterLink' fue eliminado (Warning NG8113)
  templateUrl: './login-simulado.html',
})
export class LoginSimulacionComponent {
  // Solución al error TS2339: expone el objeto JSON a la plantilla como _JSON
  protected _JSON = JSON;

  // Estado del formulario (usado para binding bidireccional)
  user = {
    username: '',
    email: ''
  };

  // Signals que manejan la salida para cumplir la consigna
  mensaje = signal('');
  dataEnviada = signal<any>(null);

  // NUEVO: Signal para el mensaje de error de validación
  errorMensaje = signal('');

  /**
   * Procesa la simulación de login.
   * La lógica debe: 1) Validar, 2) Imprimir en consola, 3) Mostrar mensaje en pantalla, 4) Limpiar campos.
   */
  submitLogin() {

    //  Lógica de Validación
    if (!this.user.username || !this.user.email) {
      this.errorMensaje.set('Por favor, complete ambos campos (Nombre de Usuario y Email).');
      this.mensaje.set(''); // Limpiamos el mensaje de éxito si existía
      this.dataEnviada.set(null);
      return; // Detenemos la ejecución
    }

    //  VALIDACIÓN DE EMAIL (Debe incluir "@")
    if (!this.user.email.includes('@') || this.user.email.length < 3) {
      this.errorMensaje.set('El formato del email no es válido. Debe incluir "@" y ser correcto.');
      return; // Detenemos la ejecución
    }

    // Si la validación pasa, limpiamos el error
    this.errorMensaje.set('');

    // 2. Impresión en consola (Requisito)
    console.log('--- SIMULACIÓN DE LOGIN EXITOSO ---');
    console.log('Datos del formulario:', this.user);

    // 3. Actualizar Signals de éxito
    this.dataEnviada.set({ ...this.user });
    this.mensaje.set(`Hola ${this.user.email}! Login exitoso.`);

    // 4. Limpiar los campos (Requisito)
    this.user = { username: '', email: '' };
  }
}
