import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.scss'],
})


export class RegisterComponent {

  email = '';
  password = '';
  username = '';
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { };

  // GESTIONE DELLA VISIBILITÀ DELLA PASSWORD
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  // GESTIONE DELLA NAVIGAZIONE ALLA PAGINA DI LOGIN
  goToLogin() {
    this.router.navigate(['/login']);
  }


  // VALIDAZIONE DELLA PASSWORD CON REGEX (sequenza di caratteri che definisce un pattern)
  isPasswordValid(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);  //con carattere speciale
    //return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);  // senza carattere speciale
  }


  // FUNZIONI DI CONTROLLO DELLA PASSWORD
  hasLowercase() {
    return /[a-z]/.test(this.password);
  }

  hasUppercase() {
    return /[A-Z]/.test(this.password);
  }

  hasNumber() {
    return /\d/.test(this.password);
  }

  hasSpecial() {
    return /[@$!%*?&]/.test(this.password);
  }


  // GESTIONE DELLA FORZA DELLA PASSWORD  
  getPasswordStrength(): string {

    let score = 2;

    if (this.hasLowercase()) score++;
    if (this.hasUppercase()) score++;
    if (this.hasNumber()) score++;
    if (this.hasSpecial()) score++;
    if (this.password.length >= 8) score++;

    if (score < 4) return 'Weak';
    if (score < 6) return 'Medium';
    return 'Strong';  
  }

  getPasswordStrengthColor(): string {

    if (this.getPasswordStrength() === 'Weak') return 'red';
    if (this.getPasswordStrength() === 'Medium') return 'orange';
    return 'green';
  }


  // GESTIONE DELLA CONFERMA DELLA PASSWORD 
  confirmPassword = '';


  /// GESTIONE DELLA REGISTRAZIONE
  onRegister() {

    this.error.set(null);
    this.success.set(null);


    // GESTIONE DELLA VALIDAZIONE DELL'USERNAME
    // if (!this.username || this.username.trim().length === 0) {
    //   this.error.set('Username is required');
    //   return;
    // }

    if (!this.username || this.username.trim().length < 3) {
      this.error.set('Username must be at least 3 characters long');
      return;
    }


    // GESTIONE DELLA VALIDAZIONE DELLA PASSWORD
    if (!this.isPasswordValid(this.password)) {
      //this.error.set('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      this.error.set('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Please verify that the password and confirm password fields are the same.');
      return;
    }

    const result = this.authService.register(this.username, this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }

    if (result.success) {
      this.success.set('Registration successful! You can now log in.');
    }

    this.router.navigate(['/login'], {
      state: { successMessage: 'Registration successful! You can now log in.' }
    });
  }


}



///////////////////////////////////////////COMMENTI////////////////////////////////////////////////

/// PASSO 1: Creazione del componente di registrazione
// Ho creato un componente di registrazione chiamato RegisterComponent, che rappresenta la pagina di registrazione dell'applicazione.
// Il componente utilizza il decoratore @Component per definire le proprietà del componente, come il selettore, i moduli importati, il template e gli stili.
// All'interno del template, ho creato un semplice modulo di registrazione con tre campi di input per l'username, l'email e la password, e due pulsanti per la registrazione e il login.
// Ho anche aggiunto un messaggio di errore che viene visualizzato se c'è un errore durante il processo di registrazione.


/// PASSO 2: Gestione della visibilità della password
// Ho aggiunto una proprietà showPassword al componente, che viene utilizzata per determinare se la password deve essere visualizzata o meno.
// Ho creato un metodo togglePasswordVisibility() che inverte il valore di showPassword ogni volta che viene cliccato il pulsante "Mostra/Nascondi password".
// Nel template, ho utilizzato la proprietà showPassword per determinare il tipo di input della password (text o password) e per cambiare l'etichetta del pulsante.


/// PASSO 3: Gestione della navigazione alla pagina di login
// Ho creato un metodo goToLogin() che viene chiamato quando l'utente clicca sul pulsante di login.
// Il metodo utilizza il router per navigare alla pagina di login dell'applicazione.


// PASSO 4: Gestione della validazione della password con regex
// Ho creato un metodo isPasswordValid() che utilizza una regex per verificare se la password soddisfa i requisiti di sicurezza.
// La regex verifica che la password contenga almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale, e che sia lunga almeno 8 caratteri.
// Il metodo restituisce true se la password è valida e false altrimenti.

// isPasswordValid(password: string): boolean {     //:boolean indica che il metodo restituisce un valore booleano (vero o falso).
//   const regex =
//     /^(?=.*[a-z])       // minuscola
//      (?=.*[A-Z])       // maiuscola
//      (?=.*\d)          // numero
//      (?=.*[@$!%*?&])   // simbolo
//      [A-Za-z\d@$!%*?&]{8,}$/x;

//   return regex.test(password);     // Il metodo test() verifica se la password corrisponde al pattern definito dalla regex e restituisce true o false.
// }


// PASSO 5: Funzioni di controllo della password
// Ho creato quattro metodi: hasLowercase(), hasUppercase(), hasNumber() e hasSpecial() che verificano se la password contiene rispettivamente una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale.
// Ogni metodo utilizza una regex per verificare la presenza del carattere specifico nella password e restituisce true o false.


/// PASSO 6: Gestione della forza della password
// Ho creato due metodi: getPasswordStrength() e getPasswordStrengthColor() che calcolano la forza della password in base alla sua lunghezza.
// Il metodo getPasswordStrength() restituisce una stringa che indica se la password è "Weak", "Medium" o "Strong" in base al numero di criteri soddisfatti.
// Il metodo getPasswordStrengthColor() restituisce un colore che indica la forza della password: rosso per "Weak", arancione per "Medium" e verde per "Strong".
// NB: let score deve inizializzarsi a 2 e non a 0, se voglio che la password sia considerata "Strong" solo se soddisfa tutti i criteri, altrimenti può essere considerata "Medium" anche se soddisfa solo 4 criteri.

/// PASSO 7: Gestione della conferma della password
// Ho aggiunto una proprietà confirmPassword al componente, che viene utilizzata per memorizzare il valore inserito dall'utente nel campo di conferma della password.
// Nel template, ho creato un campo di input per la conferma della password e ho collegato la proprietà confirmPassword al valore del campo di input utilizzando il two-way data binding [(ngModel)].


/// PASSO 8: Gestione della registrazione
// Ho creato un metodo onRegister() che viene chiamato quando l'utente clicca sul pulsante di registrazione.
// Se la password non soddisfa i requisiti di sicurezza, viene impostato un messaggio di errore utilizzando la signal error.
// Se le password non corrispondono, viene impostato un messaggio di errore utilizzando la signal error.
// const result = ....: All'interno del metodo, ho chiamato il metodo register() del servizio AuthService, passando l'username, l'email e la password dell'utente.
// Se la registrazione non ha successo, ho impostato il messaggio di errore utilizzando la signal error.
// Se la registrazione ha successo, ho impostato un messaggio di successo utilizzando la signal success e ho reindirizzato l'utente alla pagina di login utilizzando il router, passando un messaggio di successo come stato della navigazione.


/// PASSO 9: Gestione della validazione dell'username
// Ho aggiunto una validazione per l'username nel metodo onRegister().
// Se l'username è vuoto o contiene solo spazi bianchi, viene impostato un messaggio di errore utilizzando la signal error.
// Se l'username è più corto di 3 caratteri, viene impostato un messaggio di errore utilizzando la signal error.


/// PASSO 10: Gestione della validazione della password
// Ho aggiunto una validazione per la password nel metodo onRegister().
// Se la password non soddisfa i requisiti di sicurezza, viene impostato un messaggio di errore utilizzando la signal error.
// Se le password non corrispondono, viene impostato un messaggio di errore utilizzando la signal error.



