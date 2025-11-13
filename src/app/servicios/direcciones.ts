import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AddressCoords {
  lat: number;
  lon: number;
  formatted: string;
}

@Injectable({ providedIn: 'root' })
export class AddressService {

  private http = inject(HttpClient);

  // 🔑 NUEVO: clave de Postcoder
  private postcoderKey = environment.postcoderKey;

  // 🔑 seguimos usando Geoapify SOLO para geocodificar (lat/lon)
  private geoapifyKey = environment.geoapifyKey;

  /** Autocompleta direcciones usando Postcoder */
  search(term: string, countryCode: string = 'AR'): Observable<string[]> {
  if (!term || term.length < 3) {
    return of([]);
  }

  const url = 'https://ws.postcoder.com/pcw/autocomplete/find';

  return this.http.get<any[]>(url, {
    params: {
      query: term,
      country: countryCode,
      apikey: this.postcoderKey,
      singlesummary: 'true',
      maximumresults: 5,
      format: 'json'
    }
  }).pipe(
    map(res => res.map(item => item.summaryline as string))
  );
}


  /** Obtiene coordenadas (lat, lon) para una dirección (sigue con Geoapify) */
  getCoords(address: string): Observable<AddressCoords> {
    const url = 'https://api.geoapify.com/v1/geocode/search';

    return this.http.get<any>(url, {
      params: {
        text: address,
        apiKey: this.geoapifyKey,
        limit: 1,
      }
    }).pipe(
      map(res => {
        const f = res.features[0].properties;
        return {
          lat: f.lat,
          lon: f.lon,
          formatted: f.formatted,
        } as AddressCoords;
      })
    );
  }
}
