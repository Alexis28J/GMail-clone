# COMMENTI 

## PASSO 1: Creazione del componente HeaderComponent
In questo file, definisco il componente `HeaderComponent` utilizzando il decorator `@Component` di Angular. 
Il componente rappresenta l'intestazione dell'applicazione e contiene la logica per gestire l'autenticazione dell'utente e la navigazione tra le pagine.


## PASSO 2: Importazione dei moduli necessari
Importo i moduli necessari per il componente, come `MatIconModule`, `MatTooltipModule`, `MatMenuModule`, `CommonModule` e `RouterModule`. 
Questi moduli forniscono funzionalità aggiuntive per la gestione delle icone, dei tooltip, dei menu e della navigazione tra le pagine.


## PASSO 3: Definizione delle proprietà del componente
Definisco le proprietà `isLoggedIn` e `currentUser`, che vengono inizializzate utilizzando i metodi del servizio `AuthService`. 
Queste proprietà vengono utilizzate per determinare se l'utente è autenticato e per ottenere le informazioni sull'utente corrente.
Poi definisco il costruttore del componente, che accetta come parametri le istanze dei servizi `AuthService` e Router.

### Perché isLoggedIn e currentUser sono messi prima del costruttore? 
 Perché vengono inizializzati nel `costruttore` e quindi devono essere dichiarati prima di essere utilizzati. In `TypeScript`, le proprietà della classe devono essere dichiarate prima di essere utilizzate nel costruttore o in altri metodi della classe. Questo garantisce che il compilatore sappia che queste proprietà esistono e può quindi generare il codice corretto.


### NB: `public` vuol dire che la proprietà `folderService` è accessibile anche dal template del componente `HeaderComponent`.

`templateUrl: './login-component.html',`   
In Angular non è possibile utilizzare contemporaneamente `templateUrl` e template nello stesso decoratore `@Component`. 
Le proprietà si escludono a vicenda poiché definiscono due metodi alternativi per fornire l'HTML del componente.


## PASSO 4: Implementazione dei metodi di navigazione
Implemento i metodi `goToLogin()`, `goToRegister()` e `logout()` per gestire la navigazione tra le pagine di login, registrazione e logout. 
Questi metodi utilizzano il `Router` di Angular per navigare tra le rotte definite nell'applicazione.


## PASSO 5: Implementazione del metodo di ricerca
Importo il servizio `Folder` nel componente `HeaderComponent`.
Implemento il metodo `onSearch(value: string)` per gestire la ricerca delle email. 
Questo metodo chiama il metodo `setSearchTerm()` del servizio `Folder` per impostare il termine di ricerca inserito dall'utente.

### NB: `value` è il termine di ricerca inserito dall'utente nell'input di ricerca e si aspetta che venga passato come argomento al metodo `onSearch()` quando l'utente digita qualcosa nell'input di ricerca.


## PASSO 6: Implementazione del metodo di filtro
Implemento il metodo `toggleFilter(type: 'subject' | 'sender' | 'date', event: any)` per gestire i filtri delle email. 
Questo metodo chiama il metodo `setFilter()` del servizio `Folder` per impostare i filtri attivi in base al tipo di filtro selezionato dall'utente (subject, sender o date) e allo stato del checkbox (`event.target.checked`).

`type` è il tipo di filtro selezionato dall'utente (subject, sender o date) e `event` è l'evento generato dal checkbox che indica se il filtro è attivo o meno.
`event.target.checked` restituisce un valore booleano che indica se il checkbox è selezionato (true) o deselezionato (false). Questo valore viene passato al metodo `setFilter()` per aggiornare lo stato del filtro nel servizio `Folder`.

## NB: Ho messo come publico il servizio `Folder` in modo da poterlo utilizzare direttamente nel template del componente HeaderComponent. 


##  PASSO 7: Menu Firma digitale nel pulsante Settings

```TYPESCRIPT
  openSignatureDialog() {
    this.dialog.open(
      SignatureDialog, 
      {
        width: '550px'
      }
    );
  }
```

Questa funzione apre un dialogo per la firma digitale, utilizzando il servizio `MatDialog` di `Angular Material`. 
Il dialogo viene aperto con una larghezza di 550 pixel. 

Il dialogo, `SignatureDialog`, è un componente separato che gestisce l'interfaccia utente per la firma digitale.
E consente agli utenti di visualizzare, modificare o eliminare la loro firma digitale all'interno dell'applicazione.


```TYPESCRIPT 
  isRotated = false;

  rotateIcon() {
    this.isRotated = !this.isRotated;
  }
```
Questa funzione viene chiamata quando l'utente clicca sull'icona delle impostazioni. 
Cambia lo stato di `isRotated` da `true a false` e viceversa, causando la rotazione dell'icona tramite CSS.