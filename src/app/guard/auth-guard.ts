import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser()();

  //console.log('GUARD USER:', user);

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);

};




/////////////////////////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////////////////////////////////////

// PASSO 1: Creazione del guardiano di autenticazione
// La route guard è una funzionalità di Angular che consente di proteggere le rotte dell'applicazione in base a determinate condizioni. 
// In questo caso, il guardiano di autenticazione (authGuard) viene creato per verificare se l'utente è autenticato prima di consentire l'accesso a determinate rotte.
// Ho creato una guard di tipo CanActivateFn, che è una funzione che implementa l'interfaccia CanActivateFn di Angular. 


// PASSO 2: Implementazione della funzione di guardiano
// La funzione authGuard implementa l'interfaccia CanActivateFn, che richiede la definizione di un metodo canActivate.
// In parole semplici, la funzione authGuard viene eseguita ogni volta che l'utente tenta di accedere a una rotta protetta.
// All'interno della funzione, utilizzo il decoratore inject per ottenere un'istanza del servizio AuthService e del Router.
// Poi verifico se l'utente è autenticato chiamando il metodo getCurrentUser() del servizio AuthService.
// Se l'utente è autenticato, restituisco true, consentendo l'accesso alla rotta.
// Se l'utente non è autenticato, restituisco un oggetto UrlTree creato dal Router, che reindirizza l'utente alla pagina di login.


// L'AuthService è un servizio che gestisce l'autenticazione dell'utente.
// Il Router è un servizio di Angular che consente di navigare tra le diverse rotte dell'applicazione.
// Gli signals NON si aggiornano immediatamente nel guard, il guard viene eseguito prima che Angular aggiorni completamente lo stato