import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ListaDipendenti } from './dipendente.interface';

@Injectable({
  providedIn: 'root'
})
export class DipendentiService {


  private http = inject(HttpClient)

  constructor(
    // Private http: HttpClient
  ) { }

  // Questo metodo recupera tutti i dipendenti inviando una richiesta HTTP GET all'indirizzo indicato nel file environment.
  getAll() {
    this.http.get<ListaDipendenti>(`${environment.backendApi}/users`)
    // Non importa quale dei due environment importiamo, 
    // perché Angular sostituisce automaticamente il file giusto (development o production) in base al tipo di build.
    // Ricevo dato tipo Lista Dipendenti
  }
}