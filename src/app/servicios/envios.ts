import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ShippingQuote {
  price: number;
  distanceKm: number;
  etaHours: number;
  carrier: string;
}

@Injectable({ providedIn: 'root' })
export class ShippingService {

  private http = inject(HttpClient);
  private orsKey = environment.orsKey;

  // Coordenadas ficticias de tu MiniMarket en Mar del Plata
  private STORE = {
    lon: -57.55123,
    lat: -38.00612,
  };

  /**
   * Calcula el envío usando ORS Distance Matrix.
   * addressCoords: coordenadas del cliente
   * subtotal: total de productos (por si querés usarlo en tu lógica)
   */
  getQuote(addressCoords: { lat: number; lon: number }, subtotal: number): Observable<ShippingQuote> {

    const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

    const body = {
      locations: [
        [this.STORE.lon, this.STORE.lat],
        [addressCoords.lon, addressCoords.lat]
      ],
      metrics: ['distance', 'duration']
    };

    return this.http.post<any>(url, body, {
      headers: {
        Authorization: this.orsKey,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(res => {
        const distanciaMetros = res.distances[0][1];
        const distanciaKm = distanciaMetros / 1000;

        const duracionSeg = res.durations[0][1];
        const etaHoras = duracionSeg / 3600;

        // 🎯 Regla de negocio simple de ejemplo
        const price =
          distanciaKm < 3 ? 800 :
          distanciaKm < 7 ? 1500 :
          2500;

        return {
          price,
          distanceKm: Number(distanciaKm.toFixed(2)),
          etaHours: Number(etaHoras.toFixed(2)),
          carrier: 'Correo La Costa',
        } as ShippingQuote;
      })
    );
  }
}
