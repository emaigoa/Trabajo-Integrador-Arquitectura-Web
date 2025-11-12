import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// No se necesita FormsModule

@Component({
  selector: 'app-login-simulacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-simulado.html', // <--- Enlaza al HTML
  styleUrls: ['./login-simulado.css']   // <--- NUEVO: Enlaza al CSS
})
export class LoginSimulacionComponent {

  // 1. Signals individuales para cada campo
  username = signal('');
  email = signal('');

  // 2. Signals que manejan la salida
  mensaje = signal('');
  dataEnviada = signal<any>(null);
  errorMensaje = signal('');

  // 3. Funciones para manejar el evento (input) de cada campo
  onUsernameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.username.set(value);
  }

  onEmailChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.email.set(value);
  }

  // 4. Función privada para limpiar los campos
  private resetFields() {
    this.username.set('');
    this.email.set('');
  }

  /**
   * 5. Lógica de Submit (lee desde las Signals)
   */
  submitLogin() {
    const currentUsername = this.username();
    const currentEmail = this.email();

    // Limpiamos mensajes anteriores
    this.errorMensaje.set('');
    this.mensaje.set('');
    this.dataEnviada.set(null);

    // Validación de campos vacíos
    if (!currentUsername || !currentEmail) {
      this.errorMensaje.set('Por favor, complete ambos campos (Nombre de Usuario y Email).');
      return;
    }

    // Validación de Email
    if (!currentEmail.includes('@') || currentEmail.length < 3) {
      this.errorMensaje.set('El formato del email no es válido. Debe incluir "@" y ser correcto.');
      return;
    }

    // Impresión en consola
    console.log('--- SIMULACIÓN DE LOGIN EXITOSO ---');
    console.log('Datos del formulario:', { username: currentUsername, email: currentEmail });

    // Actualizar Signals de éxito
    this.dataEnviada.set({ username: currentUsername, email: currentEmail });
    this.mensaje.set(`Hola ${currentEmail}! Login exitoso.`);

    // Limpiar los campos
    this.resetFields();
  }
}
