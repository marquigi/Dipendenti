import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Dipendenti');


  constructor() {

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
  }
}
