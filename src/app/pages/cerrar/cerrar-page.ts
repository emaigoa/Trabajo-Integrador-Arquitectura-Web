import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: `Cerraste sesión. Redirigiendo…`,
})
export class CerrarPage implements OnInit {
  constructor(private router: Router, private zone: NgZone) {}
  ngOnInit() {
    setTimeout(() => this.zone.run(() => this.router.navigateByUrl('/')), 300);
  }
}
