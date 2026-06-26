import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};



//////////////////////////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////////////////////////////////////////

// app.config.ts è un file di configurazione dell'applicazione Angular. Contiene un oggetto appConfig che definisce le impostazioni e i provider necessari per l'applicazione. 
// In questo caso, include due provider principali: provideBrowserGlobalErrorListeners() per gestire gli errori globali del browser e provideRouter(routes) per configurare il router con le rotte definite nel file app.routes.ts.