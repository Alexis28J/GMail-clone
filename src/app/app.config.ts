import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};



//////////////////////////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////////////////////////////////////////

// app.config.ts è un file di configurazione dell'applicazione Angular. Contiene un oggetto appConfig che definisce le impostazioni e i provider necessari per l'applicazione. 
// In questo caso, include due provider principali: provideBrowserGlobalErrorListeners() per gestire gli errori globali del browser e provideRouter(routes) per configurare il router con le rotte definite nel file app.routes.ts.


// Ho importato anche provideHttpClient() per fornire il servizio HttpClient, che consente di effettuare richieste HTTP all'interno dell'applicazione.