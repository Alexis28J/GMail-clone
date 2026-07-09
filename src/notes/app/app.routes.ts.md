
# COMMENTI

`app.routes.ts` è il file in cui definisco le rotte dell'applicazione. 
Le rotte sono utilizzate per navigare tra le diverse pagine dell'applicazione e per gestire l'accesso alle pagine protette.

A differenza di altri file, in questo file non definisco componenti o servizi, ma solo le rotte dell'applicazione. 

Le rotte sono definite come un array di oggetti, in cui ogni oggetto rappresenta una rotta e contiene le proprietà `path`, `component` e altre opzioni di configurazione.


## NB: `Guard`, invece, è un meccanismo che consente di proteggere le rotte dell'applicazione e di impedire l'accesso a utenti non autorizzati. In questo file, utilizzo il guardiano `authGuard` per proteggere la rotta principale dell'applicazione, in modo che solo gli utenti autenticati possano accedervi.



## PASSO 1: Creazione delle rotte dell'applicazione

In questo file, definisco le rotte dell'applicazione utilizzando l'array `routes` di tipo `Routes`.
Ogni oggetto all'interno dell'array rappresenta una rotta e contiene le proprietà path, component e altre opzioni di configurazione.


## PASSO 2: Definizione della rotta di default

La prima rotta definita è la rotta di `default`, che reindirizza l'utente alla pagina di `login` quando accede all'applicazione senza specificare un percorso.

La proprietà `pathMatch`: 'full' indica che il percorso deve corrispondere esattamente a '' per attivare il reindirizzamento.


## PASSO 3: Definizione della rotta di login

La seconda rotta definita è la rotta di `login`, che carica il componente `LoginComponent` utilizzando il metodo `loadComponent`.

Questo approccio consente di caricare il componente in modo asincrono, migliorando le prestazioni dell'applicazione.


## PASSO 4: Definizione della rotta di registrazione

La terza rotta definita è la rotta di registrazione, che carica il componente `RegisterComponent` utilizzando il metodo `loadComponent`.

Anche in questo caso, l'approccio asincrono consente di migliorare le prestazioni dell'applicazione.


## PASSO 5: Definizione della rotta principale protetta

La quarta rotta definita è la rotta principale dell'applicazione, che carica il componente `MainLayoutComponent`.

## NB: `Angular` prova ad andare su `/app` andando a caricare il `MainLayoutComponent`, che a sua volta carica il `MainpageComponent` come figlio.

Questa rotta è protetta dal guardiano `authGuard`, che verifica se l'utente è autenticato prima di consentire l'accesso alla rotta.

Se l'utente non è autenticato, viene reindirizzato alla pagina di `login`.

Perché mettiamo `component` qui e NON `loadComponent`? 
Perché vogliamo che il `MainLayoutComponent` sia il layout principale dell'applicazione, , cioè che contenga l'intestazione, la barra laterale e il contenuto principale, e che tutte le rotte figlie vengano renderizzate all'interno di esso.

Se mettiamo `loadComponent` qui, Angular non sa che deve caricare il componente all'interno del layout principale. Invece, quando usiamo `component`, Angular sa che deve rendere il `MainpageComponent` all'interno del `MainLayoutComponent`.

In questo modo, possiamo avere un layout coerente per tutte le pagine dell'applicazione, con l'intestazione e la barra laterale sempre visibili.


## NB: 
- main-layout-component.ts è il componente principale che gestisce il layout dell'applicazione. Include l'header e la sidebar, e utilizza il router-outlet per visualizzare i componenti figli in base alla navigazione dell'utente.
- mainpage-component.ts è il componente principale che viene visualizzato all'interno del layout principale. Viene caricato quando l'utente accede alla sezione "app" dell'applicazione, dopo aver effettuato il login.
- mainpage-component è il componente figlio del MainLayoutComponent e viene visualizzato all'interno del router-outlet. Contiene la logica e la struttura della pagina principale dell'applicazione, che può includere altre funzionalità e componenti specifici per l'applicazione stessa.