import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['login']); 

  return false;

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
// Poi verifico se l'utente è autenticato chiamando il metodo isLoggedIn() del servizio AuthService. 
// Se l'utente è autenticato, restituisco true per consentire l'accesso alla rotta richiesta.
// Altrimenti, utilizzo il router per reindirizzare l'utente alla pagina di login e restituisco false per impedire l'accesso alla rotta richiesta.


// L'AuthService è un servizio che gestisce l'autenticazione dell'utente.
// Il Router è un servizio di Angular che consente di navigare tra le diverse rotte dell'applicazione.