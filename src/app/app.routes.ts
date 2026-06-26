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
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: MainpageComponent
            },
            {
                path: 'main',
                component: MainpageComponent
            }
        ]
    }


];


/////////////////////////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////////////////////////////////////

// PASSO 1: Creazione delle rotte dell'applicazione
// In questo file, definisco le rotte dell'applicazione utilizzando l'array routes di tipo Routes.
// Ogni oggetto all'interno dell'array rappresenta una rotta e contiene le proprietà path, component e altre opzioni di configurazione.


// PASSO 2: Definizione della rotta di default
// La prima rotta definita è la rotta di default, che reindirizza l'utente alla pagina di login quando accede all'applicazione senza specificare un percorso.
// La proprietà pathMatch: 'full' indica che il percorso deve corrispondere esattamente a '' per attivare il reindirizzamento.


// PASSO 3: Definizione della rotta di login
// La seconda rotta definita è la rotta di login, che carica il componente LoginComponent utilizzando il metodo loadComponent.
// Questo approccio consente di caricare il componente in modo asincrono, migliorando le prestazioni dell'applicazione.


// PASSO 4: Definizione della rotta principale con layout
// La terza rotta definita è la rotta principale, che utilizza il componente MainLayoutComponent come layout per le pagine interne.
// La proprietà canActivate: [authGuard] indica che l'accesso a questa rotta è protetto dal guardiano authGuard, che verifica se l'utente è autenticato.