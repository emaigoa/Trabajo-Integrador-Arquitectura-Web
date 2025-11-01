import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <h3>Login</h3>
  <form (ngSubmit)="submit()" #f="ngForm" class="row g-2">
    <div class="col-md-4"><input class="form-control" [(ngModel)]="user" name="user" required placeholder="Usuario"></div>
    <div class="col-md-4"><input class="form-control" [(ngModel)]="email" name="email" type="email" required placeholder="Email"></div>
    <div class="col-md-4 d-grid"><button class="btn btn-primary" type="submit" [disabled]="!f.valid">Ingresar</button></div>
  </form>
  <div *ngIf="msg" class="alert alert-success mt-3">{{ msg }}</div>
  `
})
export class LoginPage {
  user=''; email=''; msg='';
  submit(){ this.msg = `Hola ${this.email} Login exitoso`; this.user=''; this.email=''; }
}
