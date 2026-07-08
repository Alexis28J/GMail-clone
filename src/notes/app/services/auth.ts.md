
# COMMENTI

## PASSO 1: Creazione del servizio di autenticazione

Creo un servizio di autenticazione che gestisce lo stato dell'utente corrente. 

Utilizzo il decoratore `@Injectable` per rendere il servizio disponibile in tutta l'applicazione.



## PASSO 2: Definizione dei segnali (signals) per lo stato dell'utente

1. 
``` typescript
private currentUserSignal = signal<AuthInterface | null>(
        JSON.parse(localStorage.getItem('currentUser') || 'null')  
    );
```

Poi definisco una proprietà privata `currentUserSignal` che è un segnale (`signal`) che può contenere un oggetto `AuthInterface` o `null`.

'currentUser' è l'oggetto che contiene le informazioni dell'utente attualmente loggato, se presente. Se non c'è nessun utente loggato, viene restituito null.

`JSON.pars` viene utilizzato per convertire la stringa JSON memorizzata nel `localStorage` in un oggetto JavaScript. 
Questo permette di ottenere l'elenco degli utenti memorizzati nel localStorage. Se non c'è un utente corrente memorizzato, viene restituito null (un array vuoto).

## NB: Il localStorage in JavaScript serve a memorizzare dati direttamente nel browser dell'utente. È ideale per salvare le preferenze dell'utente (come la modalità scura o i dati di un carrello) in modo persistente, poiché i dati non hanno una scadenza e rimangono anche dopo la chiusura del browser.Questa memoria locale è accessibile tramite JavaScript ed è limitata al singolo dominio del sito web (tra 2 MB e 10 MB a seconda del browser).


2. `storedUsers = JSON.parse(localStorage.getItem('users') || '[]');`  
Recupera gli utenti registrati dal localStorage, se presenti, altrimenti inizializza come array vuoto.
In questo modo, quando l'applicazione viene caricata, gli utenti registrati vengono mantenuti anche dopo un refresh della pagina o la chiusura del browser.


3.  
```typescript
    private usersSignal = signal<AuthInterface[]>(
        Array.isArray(this.storedUsers) ? this.storedUsers : []
    );
 ```   

Definisco anche una proprietà privata `usersSignal` che è un segnale che può contenere un array di oggetti `AuthInterface`.
Inizializza il segnale degli utenti con gli utenti memorizzati, se presenti, altrimenti come array vuoto.


4. `isLoggedIn = computed(() => this.currentUserSignal() !== null);`
Poi definisco una proprietà pubblica `isLoggedIn` che è un computed signal che restituisce true se l'utente corrente non è null, altrimenti restituisce false.



## PASSO 3: Sincronizzazione dello stato con il localStorage

Di solito, un `constructor` viene utilizzato per inizializzare le proprietà di una classe o per eseguire del codice all'atto della creazione di un'istanza della classe.

```typescript
    constructor() {
        effect(() => {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUserSignal()));
            localStorage.setItem('users', JSON.stringify(this.usersSignal()));
        })
    }
```
In questo caso, il costruttore del servizio `AuthService` viene utilizzato per sincronizzare lo stato dell'utente corrente e degli utenti con il `localStorage`.

Nel costruttore del servizio, utilizzo la funzione `effect` per eseguire una funzione ogni volta che i segnali `currentUserSignal` o `usersSignal` cambiano.

All'interno della funzione, aggiorno il `localStorage` con i valori correnti dei segnali, convertendoli in stringhe JSON utilizzando `JSON.stringify`.

In questo modo, lo stato dell'utente corrente e degli utenti viene mantenuto sincronizzato con il `localStorage`.

### NB: `JSON.stringify` viene utilizzato per convertire un oggetto JavaScript in una stringa JSON, che può essere memorizzata nel `localStorage`.
Questo permette di mantenere lo stato dell'utente corrente e degli utenti anche dopo il refresh della pagina o la chiusura del browser.



## PASSO 4: Implementazione della funzione di registrazione

- `register(username: string, email: string, password: string): { success: boolean; message?: string } {...}`

Creo una funzione pubblica `register` che accetta tre parametri: username, email e password.

`: { success: boolean; message?: string }`: La funzione restituisce un oggetto con una proprietà success che indica se la registrazione è avvenuta con successo e una proprietà message opzionale che contiene un messaggio di errore in caso di fallimento.

All'interno della funzione, ottengo l'elenco degli utenti memorizzati nel segnale `usersSignal` (`const users = this.usersSignal()`) 
e creo un nuovo oggetto `AuthInterface` con l'username, l'email e la password forniti.

`newUser: AuthInterface = { username: username.trim(), email: email.trim().toLowerCase(), password }`: Creo un nuovo oggetto `AuthInterface` con l'username, l'email e la password forniti. 
Utilizzo il metodo `trim()` per rimuovere eventuali spazi bianchi all'inizio e alla fine dell'username e dell'email, e il metodo toLowerCase() per convertire l'email in minuscolo.


Poi eseguo alcune validazioni sull'email e sulla password.

### NB: `user.find(u => u.email === newUser.email)` viene utilizzato per verificare se l'email fornita è già presente nell'elenco degli utenti.

Se tutte le validazioni passano, creo un nuovo oggetto AuthInterface con l'username, l'email e la password forniti.

`this.usersSignal.update(u => [...u, newUser]);` Poi aggiorno il segnale usersSignal aggiungendo il nuovo utente all'elenco degli utenti esistenti. Utilizzo l'operatore `spread (...)` per creare un nuovo array che contiene tutti gli utenti esistenti più il nuovo utente.

Infine, restituisco un oggetto con success impostato a true per indicare che la registrazione è avvenuta con successo.



## PASSO 5: Implementazione della funzione di login

Creo una funzione pubblica `login` che accetta due parametri: email e password.

La funzione restituisce un oggetto con una proprietà `success` che indica se il login è avvenuto con successo e una proprietà `message` opzionale che contiene un messaggio di errore in caso di fallimento.

All'interno della funzione, cerco un utente nell'elenco degli utenti memorizzati nel segnale `usersSignal` che corrisponda all'email e alla password forniti.
Se non viene trovato alcun utente corrispondente, restituisco un oggetto con success impostato a false e un messaggio di errore.
Se viene trovato un utente corrispondente, aggiorno il segnale `currentUserSigna` con l'utente trovato e restituisco un oggetto con success impostato a true.



## PASSO 6: Implementazione della funzione di logout

Creo una funzione pubblica `logout` che non accetta parametri e non restituisce nulla.

All'interno della funzione, imposto il segnale `currentUserSignal` a null per indicare che l'utente corrente ha effettuato il `logout`.

E infine, creo una funzione pubblica `getCurrentUser` che restituisce il segnale `currentUserSignal`, permettendo ad altre parti dell'applicazione di accedere allo stato dell'utente corrente.