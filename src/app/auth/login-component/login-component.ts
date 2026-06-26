import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
})


export class LoginComponent {

  email = '';
  password = '';
  error = signal<string | null>(null)
  success = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {};

  /// GESTIONE DEL MESSAGGIO DI SUCCESSO DOPO LA REGISTRAZIONE
  ngOnInit() {
    //console.log('STATE:', window.history.state);
    const message = window.history.state?.successMessage;

    if (message) {
      this.success.set(message);
    }
  }


  /// GESTIONE DEL LOGIN 
  onLogin() {

    const result = this.authService.login(this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }
    this.router.navigate(['/app']);

  }


  // NAVIGAZIONE ALLA PAGINA DI REGISTRAZIONE
  goToRegister() {
    this.router.navigate(['/register']);
  }


  // GESTIONE DELLA VISIBILITÀ DELLA PASSWORD
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}




///////////////////////////////////COMMENTI//////////////////////////////////////////

/// PASSO 1: Creazione del componente di login
// Ho creato un componente di login chiamato LoginComponent, che rappresenta la pagina di login dell'applicazione.
// Il componente utilizza il decoratore @Component per definire le proprietà del componente, come il selettore, i moduli importati, il template e gli stili.
// All'interno del template, ho creato un semplice modulo di login con due campi di input per l'email e la password, e due pulsanti per il login e la registrazione.
// Ho anche aggiunto un messaggio di errore che viene visualizzato se c'è un errore durante il processo di login o registrazione.


/// PASSO 2: Decoratori e proprietà del componente
// Il decoratore @Component viene utilizzato per definire il componente e le sue proprietà.
// Le proprietà del componente includono email e password, che vengono utilizzate per memorizzare i valori inseriti dall'utente nei campi di input.
// Ho anche creato una proprietà error, che è un segnale reattivo che memorizza eventuali messaggi di errore durante il processo di login o registrazione.

// templateUrl: './login-component.html',   
// In Angular non è possibile utilizzare contemporaneamente templateUrl e template nello stesso decoratore @Component. 
// Le proprietà si escludono a vicenda poiché definiscono due metodi alternativi per fornire l'HTML del componente.


/// PASSO 3: Creazione della classe LoginComponent
// Ho creato la classe LoginComponent, che contiene la logica per gestire il processo di login e registrazione.
// La classe ha un costruttore che inietta il servizio AuthService e il Router di Angular, che vengono utilizzati per autenticare l'utente e navigare tra le pagine dell'applicazione.


// PASSO 4: Creazione del construttore
// Il costruttore della classe LoginComponent accetta due parametri: authService e router.
// authService è un'istanza del servizio AuthService, che fornisce i metodi per registrare, autenticare e gestire l'utente corrente.
// router è un'istanza del Router di Angular, che viene utilizzata per navigare tra le pagine dell'applicazione.


// PASSO 5: Gestione del messaggio di successo dopo la registrazione
// Ho implementato il metodo ngOnInit(), che viene chiamato quando il componente viene inizializzato.
// All'interno del metodo, ho controllato se c'è un messaggio di successo passato come stato della navigazione.
// Se c'è un messaggio di successo, viene impostato nella signal success, che può essere visualizzata nel template del componente.

// Il metodo ngOnInit() è un hook (gancio) del ciclo di vita del componente in Angular, che viene chiamato dopo che il componente è stato creato e inizializzato.
// In informatica, un hook (letteralmente "gancio") è un punto di inserimento o una funzione di callback 
// che permette a un programma di intercettare e modificare il flusso di esecuzione di un'altra applicazione, di un sistema operativo o di un framework, aggiungendo logiche personalizzate senza modificarne il codice sorgente originale


/// PASSO 6: Implementazione dei metodi onLogin() 
// Ho implementato il metodo onLogin(), che viene chiamato quando l'utente fa clic sul pulsante di login.
// Il metodo chiama il metodo login() del servizio AuthService, passando l'email e la password dell'utente.
// Se il login non ha successo, viene impostato un messaggio di errore utilizzando la signal error.
// Se il login ha successo, l'utente viene reindirizzato alla pagina principale dell'applicazione utilizzando il router.


/// PASSO 7: Implementazione dei metodi goToRegister()
// Ho implementato il metodo goToRegister(), che viene chiamato quando l'utente fa clic sul pulsante di registrazione.
// Il metodo utilizza il router per navigare alla pagina di registrazione dell'applicazione.


/// PASSO 8: Implementazione della gestione della visibilità della password
// Ho implementato una proprietà showPassword, che viene utilizzata per gestire la visibilità della password.
// Ho anche creato un metodo togglePasswordVisibility(), che viene chiamato quando l'utente fa clic su un pulsante per mostrare o nascondere la password.
// Il metodo cambia il valore della proprietà showPassword, che può essere utilizzata nel template per modificare il tipo di input della password (password o text).

// Sul template, ho aggiunto un pulsante accanto al campo della password che consente all'utente di alternare la visibilità della password.
// Ho aggiunto un'icona che cambia in base allo stato della visibilità della password: un'icona "occhio" quando la password è nascosta e un'icona "occhio barrato" quando la password è visibile.
// [type]="showPassword ? 'text': 'password'" è un binding che cambia dinamicamente il tipo di input della password in base al valore della proprietà showPassword.
// Si usa le parentesi quadre [] per il binding delle proprietà in Angular, che consente di collegare una proprietà del componente a un attributo dell'elemento HTML.
// Se avessi usato le parentesi tonde () invece delle quadre, avrei creato un binding per gli eventi, che non è quello che voglio fare in questo caso.

// Ho trasferito il codice del template in un file separato chiamato login-component.html, che viene referenziato nel decoratore @Component tramite la proprietà templateUrl.