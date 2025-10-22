import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DipendentiService } from './dipendenti-service';
import { ListaDipendenti } from './dipendente.interface';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Dipendenti');

  dipService = inject(DipendentiService) // Inietto il servizio per fare chiamate HTTP e ottenere dipendenti

  lista?: ListaDipendenti // Qui salverò i dati dei dipendenti ricevuti dal server

  pages: number[] = [] // Array dei numeri di pagina per la paginazione

  currentPage = 1 // Tiene traccia della pagina attualmente visualizzata

  constructor() {

    /*
    // OBSETVABLE:
    // Un Observable è un oggetto che emette valori nel tempo (come un flusso di dati) a cui possiamo "iscriverci" per reagire a ogni nuovo valore.

    // Qui creiamo manualmente un Observable che emette tre valori (1, 2 e 3) e poi si completa dopo 2 secondi.
    const obs = new Observable(sub => {
      sub.next(1)
      sub.next(2)
      setTimeout(() => {
        sub.next(3)
        sub.complete()
        console.log("Obsevable completato!")
      }, 2000);
    })

    // Ci iscriviamo (subscribe) all'Observable per ricevere i valori emessi e gestire eventuali errori o la fine del flusso.
    obs.subscribe({
      // Si attiva ogni volta che l'obsevable invoca next()
      next: (x) => {
        console.log(`ho ricevuto ${x}`)
      },
      // Si attiva solo quando l'obsevable invoca error()
      error: () => {
        console.log("L'obsevable è andato in errore!")
      },
      // Si attiva quando l'observable termina
      complete: () => {
        console.log("Ho finito di osservare")
      }
    })
    */
  }

  ngOnInit() {
    // Metodo del ciclo di vita: viene chiamato appena il componente si inizializza
    this.fetchUsers(); // Carico subito i dati della prima pagina
  }


  private fetchUsers() {

    // Chiamata HTTP per ottenere i dipendenti della pagina corrente
    this.dipService.getAll(this.currentPage).subscribe({
      // ---- subscribe ----
      // Si iscrive all'Observable creato dal servizio HTTP.
      // Senza subscribe, la chiamata HTTP **non partirebbe mai**, perché gli Observable in Angular sono "pigri".
      // subscribe accetta tre callback:
      // 1) next → gestisce i dati ricevuti
      // 2) error → gestisce eventuali errori
      // 3) complete → opzionale, viene chiamato quando il flusso termina

      next: (data) => {
        // ---- next ----
        // Viene eseguito quando la chiamata HTTP va a buon fine
        // 'data' contiene i risultati ricevuti dal server

        this.lista = data; // Salvo i dati ricevuti
        this.pages = []; // Pulisco l'array delle pagine prima di riempirlo
        for (let i = 1; i <= data.total_pages; i++) {
          this.pages.push(i); // Riempio l'array con tutti i numeri di pagina disponibili
        }
      },
      // ---- error ----
      // Viene eseguito se la chiamata HTTP fallisce
      // 'e' contiene informazioni sull'errore
      error: (e) => {
        console.error(e); // Stampo eventuali errori della chiamata
      }
    });
  }

  changePage(p: number) {
    this.currentPage = p // Aggiorno la pagina corrente
    this.fetchUsers() // Ricarico i dati della nuova pagina
  }
}
