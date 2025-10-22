import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Abilita l'uso di HttpClient in tutta l'app e specifica che deve usare "fetch" (l'API moderna del browser)
    // per effettuare le richieste HTTP invece del vecchio sistema basato su XMLHttpRequest.
    provideHttpClient(withFetch())
  ]
};
