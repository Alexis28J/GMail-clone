import { Routes } from '@angular/router';
import { MainpageComponent } from './layout/mainpage-component/mainpage-component';
import { authGuard } from './guard/auth-guard';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login-component/login-component')
                .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => 
            import('./auth/register-component/register-component')
                .then(m => m.RegisterComponent)
    },
    {
        path: 'app',
        component: MainLayoutComponent,  
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: MainpageComponent
            }
        ]
    }


];


/////////////////////////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////////////////////////////////////

// app.routes.ts è il file in cui definisco le rotte dell'applicazione. Le rotte sono utilizzate per navigare tra le diverse pagine dell'applicazione e per gestire l'accesso alle pagine protette.
// A differenza di altri file, in questo file non definisco componenti o servizi, ma solo le rotte dell'applicazione. Le rotte sono definite come un array di oggetti, in cui ogni oggetto rappresenta una rotta e contiene le proprietà path, component e altre opzioni di configurazione.
// Guard, invece, è un meccanismo che consente di proteggere le rotte dell'applicazione e di impedire l'accesso a utenti non autorizzati. In questo file, utilizzo il guardiano authGuard per proteggere la rotta principale dell'applicazione, in modo che solo gli utenti autenticati possano accedervi.


// PASSO 1: Creazione delle rotte dell'applicazione
// In questo file, definisco le rotte dell'applicazione utilizzando l'array routes di tipo Routes.
// Ogni oggetto all'interno dell'array rappresenta una rotta e contiene le proprietà path, component e altre opzioni di configurazione.


// PASSO 2: Definizione della rotta di default
// La prima rotta definita è la rotta di default, che reindirizza l'utente alla pagina di login quando accede all'applicazione senza specificare un percorso.
// La proprietà pathMatch: 'full' indica che il percorso deve corrispondere esattamente a '' per attivare il reindirizzamento.


// PASSO 3: Definizione della rotta di login
// La seconda rotta definita è la rotta di login, che carica il componente LoginComponent utilizzando il metodo loadComponent.
// Questo approccio consente di caricare il componente in modo asincrono, migliorando le prestazioni dell'applicazione.


// PASSO 4: Definizione della rotta di registrazione
// La terza rotta definita è la rotta di registrazione, che carica il componente RegisterComponent utilizzando il metodo loadComponent.
// Anche in questo caso, l'approccio asincrono consente di migliorare le prestazioni dell'applicazione.


// PASSO 5: Definizione della rotta principale protetta
// La quarta rotta definita è la rotta principale dell'applicazione, che carica il componente MainLayoutComponent.
// Questa rotta è protetta dal guardiano authGuard, che verifica se l'utente è autenticato prima di consentire l'accesso alla rotta.
// Se l'utente non è autenticato, viene reindirizzato alla pagina di login.

// Perché mettiamo component qui e non loadComponent? 
// Perché vogliamo che il MainLayoutComponent sia il layout principale dell'applicazione, e che tutte le rotte figlie vengano renderizzate all'interno di esso. In questo modo, possiamo avere un layout coerente per tutte le pagine dell'applicazione, con l'intestazione e la barra laterale sempre visibili.