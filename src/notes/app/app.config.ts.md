
# COMMENTI

`app.config.ts` è un file di configurazione dell'applicazione Angular. 
Si usa per definire i provider globali dell'applicazione, come il `router`, il client `HTTP` e i listener degli errori globali del browser. In questo caso, il file importa le funzioni necessarie da Angular e le utilizza per configurare l'applicazione.

Contiene un oggetto `appConfig` che definisce le impostazioni e i provider necessari per l'applicazione. 

In questo caso, include due provider principali: `provideBrowserGlobalErrorListeners()` per gestire gli errori globali del browser e `provideRouter(routes)` per configurare il router con le rotte definite nel file `app.routes.ts`.

Ho importato anche `provideHttpClient()` per fornire il servizio `HttpClient`, che consente di effettuare richieste HTTP all'interno dell'applicazione.