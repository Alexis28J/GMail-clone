import { computed, effect, Injectable, signal } from "@angular/core";
import { AuthInterface } from "../../app/interface/auth-interface";


@Injectable({
    providedIn: 'root'
})


export class AuthService {

    private currentUserSignal = signal<AuthInterface | null>(
        JSON.parse(localStorage.getItem('currentUser') || 'null')
    );

    private usersSignal = signal<AuthInterface[]>([
        JSON.parse(localStorage.getItem('users') || '[]')
    ]);


    isLoggedIn = computed(() => this.currentUserSignal() !== null);


    constructor() {
        effect(() => {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUserSignal()));
            localStorage.setItem('users', JSON.stringify(this.usersSignal()));
        })
    }


    // FUNZIONE PER REGISTRARE UN NUOVO UTENTE

      register(email: string, password: string): { success: boolean; message?: string } {

          const users = this.usersSignal();

          if (!email.includes('@')) {
              return { success: false, message: 'Invalid email' };
          }

          if (!email.endsWith('.com') && !email.endsWith('.it')) {
              return { success: false, message: 'Email must end with .com or .it' };
          }

          if (password.length < 6) {
              return { success: false, message: 'Password must be at least 6 characters long!' };
          }

          if (users.find(u => u.email === email)) {
              return { success: false, message: 'User already exits' }
          }

          const newUser: AuthInterface = { email, password };

          this.usersSignal.update(u => [...u, newUser]);

          return { success: true };

        }


    // FUNZIONE PER EFFETTUARE IL LOGIN

      login(email: string, password: string): { success: boolean, message?: string } {

          const user = this.usersSignal().find(
              u => u.email === email && u.password === password
          );

          if (!user) {
              return { success: false, message: 'Invalid email or password' };
          }

          this.currentUserSignal.set(user);

          return { success: true };

        }


    // FUNZIONE PER EFFETTUARE IL LOGOUT

       logout() {
          this.currentUserSignal.set(null);
       }


       getCurrentUser() {
          return this.currentUserSignal;
       }

}



///////////////////////////////////////////////////////////////////COMMENTI////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/// PASSO 1: Creazione del servizio di autenticazione
// Creo un servizio di autenticazione che gestisce lo stato dell'utente corrente. 

// Utilizzo il decoratore @Injectable per rendere il servizio disponibile in tutta l'applicazione.


// PASSO 2: Definizione dei segnali (signals) per lo stato dell'utente
// Poi definisco una proprietà privata currentUserSinal che è un segnale (signal) che può contenere un oggetto AuthInterface o null.
// Inizializzo il segnale con il valore dell'utente corrente memorizzato nel localStorage, se presente, altrimenti lo inizializzo a null.
// JSON.parse viene utilizzato per convertire la stringa JSON memorizzata nel localStorage in un oggetto JavaScript. Se non c'è un utente corrente memorizzato, viene restituito null.

// Definisco anche una proprietà privata usersSignal che è un segnale che può contenere un array di oggetti AuthInterface.
// Inizializzo il segnale con il valore degli utenti memorizzati nel localStorage, se presenti, altrimenti lo inizializzo a un array vuoto.
// JSON.parse viene utilizzato per convertire la stringa JSON memorizzata nel localStorage in un oggetto JavaScript. Questo permette di ottenere l'elenco degli utenti memorizzati nel localStorage.
// Se non ci sono utenti memorizzati, viene restituito un array vuoto.

// Poi definisco una proprietà pubblica isLoggedIn che è un computed signal che restituisce true se l'utente corrente non è null, altrimenti restituisce false.


/// PASSO 3: Sincronizzazione dello stato con il localStorage
// Di solito, un constructor viene utilizzato per inizializzare le proprietà di una classe o per eseguire del codice all'atto della creazione di un'istanza della classe.
// In questo caso, il costruttore del servizio AuthService viene utilizzato per sincronizzare lo stato dell'utente corrente e degli utenti con il localStorage.
// Nel costruttore del servizio, utilizzo la funzione effect per eseguire una funzione ogni volta che i segnali currentUserSignal o usersSignal cambiano.
// All'interno della funzione, aggiorno il localStorage con i valori correnti dei segnali, convertendoli in stringhe JSON utilizzando JSON.stringify.
// In questo modo, lo stato dell'utente corrente e degli utenti viene mantenuto sincronizzato con il localStorage.
// JSON.stringify viene utilizzato per convertire un oggetto JavaScript in una stringa JSON, che può essere memorizzata nel localStorage.
// Questo permette di mantenere lo stato dell'utente corrente e degli utenti anche dopo il refresh della pagina o la chiusura del browser.


/// PASSO 4: Implementazione della funzione di registrazione
// Creo una funzione pubblica register che accetta due parametri: email e password.
// : { success: boolean; message?: string } - La funzione restituisce un oggetto con una proprietà success che indica se la registrazione è avvenuta con successo e una proprietà message opzionale che contiene un messaggio di errore in caso di fallimento.
// All'interno della funzione, ottengo l'elenco degli utenti memorizzati nel segnale usersSignal.
// Poi eseguo alcune validazioni sull'email e sulla password. 
// user.find(u => u.email === email) viene utilizzato per verificare se esiste già un utente con la stessa email nell'elenco degli utenti. Se esiste, restituisco un oggetto con success impostato a false e un messaggio di errore.
// Se tutte le validazioni passano, creo un nuovo oggetto AuthInterface con l'email e la password forniti.
// this.usersSignal.update(u => [...u, newUser]); Poi aggiorno il segnale usersSignal aggiungendo il nuovo utente all'elenco degli utenti esistenti. Utilizzo l'operatore spread (...) per creare un nuovo array che contiene tutti gli utenti esistenti più il nuovo utente.
// Infine, restituisco un oggetto con success impostato a true per indicare che la registrazione è avvenuta con successo.


/// PASSO 5: Implementazione della funzione di login
// Creo una funzione pubblica login che accetta due parametri: email e password.
// La funzione restituisce un oggetto con una proprietà success che indica se il login è avvenuto con successo e una proprietà message opzionale che contiene un messaggio di errore in caso di fallimento.
// All'interno della funzione, cerco un utente nell'elenco degli utenti memorizzati nel segnale usersSignal che corrisponda all'email e alla password forniti.
// Se non viene trovato alcun utente corrispondente, restituisco un oggetto con success impostato a false e un messaggio di errore.
// Se viene trovato un utente corrispondente, aggiorno il segnale currentUserSignal con l'utente trovato e restituisco un oggetto con success impostato a true.


/// PASSO 6: Implementazione della funzione di logout
// Creo una funzione pubblica logout che non accetta parametri e non restituisce nulla.
// All'interno della funzione, imposto il segnale currentUserSignal a null per indicare che l'utente corrente ha effettuato il logout.
// E infine, creo una funzione pubblica getCurrentUser che restituisce il segnale currentUserSignal, permettendo ad altre parti dell'applicazione di accedere allo stato dell'utente corrente.
