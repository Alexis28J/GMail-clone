import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


  // Questo file è il punto di ingresso dell'applicazione Angular. 
  // Chiama la funzione bootstrapApplication per avviare l'applicazione, passando il componente principale App 
  // e la configurazione dell'applicazione appConfig.