import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ListaDipendenti } from './dipendente.interface';

@Injectable({
  providedIn: 'root'
})
export class DipendentiService {

  // ---- inject HttpClient ----
  // Qui stiamo iniettando il servizio HttpClient di Angular senza passarlo nel costruttore.
  // Ci permette di fare richieste HTTP (GET, POST, ecc.)
  private http = inject(HttpClient)

  constructor(
    // Nota: potresti anche usare "constructor(private http: HttpClient) {}" invece di inject()
  ) { }

  // Metodo per recuperare tutti i dipendenti dalla pagina specificata
  getAll(page: number) {
    return this.http.get<ListaDipendenti>(`${environment.backendApi}/users`,
      // Non importa quale dei due environment importiamo, 
      // perché Angular sostituisce automaticamente il file giusto (development o production) in base al tipo di build.
      // Ritorna dato tipo Lista Dipendenti
      {
        params: {
          // ---- params ----
          // Questi parametri vengono aggiunti alla URL della richiesta

          page: page,  // Numero della pagina da richiedere

          per_page: 4,  // Numero di dipendenti per pagina

          delay: 1  // Ritardo simulato (utile per test o demo)

        },
        headers: {
          // ---- headers ----
          // Intestazioni della richiesta HTTP
          "x-api-key": "reqres-free-v1" // Chiave API richiesta dal server per autorizzare la chiamata
        }
      }
    )
  }
}