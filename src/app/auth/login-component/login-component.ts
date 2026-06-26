import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  // templateUrl: './login-component.html', 
  styleUrls: ['./login-component.scss'],
  template: `
  <div class="login-container">

    <h2>Login</h2>

    <input [(ngModel)]="email" placeholder="Email"/> 
    <input [(ngModel)]="password" type="password" placeholder="Password"/> 

    <button (click)="onLogin()">Login</button>
    <button (click)="onRegister()">Register</button>

    @if(error()){
      <p>{{ error() }}</p>
    }

  </div>
  `
})


export class LoginComponent {

  email = '';
  password = '';

  error = signal<string | null>(null)

  constructor(private authService: AuthService, private router: Router) { };


  onLogin() {

  
    const result = this.authService.login(this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }

    this.router.navigate(['/main']);

  }


  onRegister() {

    const result = this.authService.register(this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }

    this.error.set('Registration successful! You can now log in.');
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


/// PASSO 5: Implementazione dei metodi onLogin() e onRegister()
// Ho implementato due metodi: onLogin() e onRegister(), che vengono chiamati quando l'utente fa clic sui pulsanti di login e registrazione.
// Il metodo onLogin() chiama il metodo login() del servizio AuthService, passando l'email e la password inserite dall'utente.
// Se il login ha esito positivo, l'utente viene reindirizzato alla pagina principale dell'applicazione (/main).
// Se il login fallisce, viene visualizzato un messaggio di errore.
// Il metodo onRegister() chiama il metodo register() del servizio AuthService, passando l'email e la password inserite dall'utente.
// Se la registrazione ha esito positivo, viene visualizzato un messaggio di successo. 
// Se la registrazione fallisce, viene visualizzato un messaggio di errore.