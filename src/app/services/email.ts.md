
# COMMENTI

## IMPORTAZIONI

- `import { Injectable, signal } from '@angular/core';`
Importiamo il decoratore Injectable da Angular, che ci permette di dichiarare la classe come un servizio iniettabile in altri componenti o servizi.

- `@Injectable({ providedIn: 'root'})`
Il decoratore Injectable indica che questa classe può essere iniettata come dipendenza in altri componenti o servizi. 
L'opzione providedIn: 'root' significa che il servizio sarà disponibile a livello globale nell'applicazione.



## CLASSE EMAILSERVICE

`export class EmailService { ... }`
Dichiariamo la classe `EmailService`, che rappresenta un servizio che gestisce le email. Questa classe conterrà i dati delle email e i metodi per accedervi.

### NB: export indica che questa classe può essere importata e utilizzata in altri file del progetto.


`stored = JSON.parse(localStorage.getItem('emails') || '[]')`
La proprietà stored contiene le email salvate nel localStorage del browser. Se non ci sono email salvate, viene utilizzato un array vuoto come fallback.
Utilizziamo JSON.parse per convertire la stringa JSON salvata nel localStorage in un array di oggetti JavaScript.

`.map((email: EmailInterface) => ({ ... email, selected: false }));`
Utilizziamo il metodo `map` per creare un nuovo array di email, aggiungendo la proprietà selected impostata su false a ciascun oggetto email. 
Questo permette di tenere traccia dello stato di selezione delle email senza modificare direttamente gli oggetti originali.


`private emailsSignal = signal<EmailInterface[]>([ ... ]);`
Definiamo una proprietà privata `emailsSignal` che è un segnale reattivo contenente un array di oggetti che seguono l'interfaccia `EmailInterface`. 
Questo array rappresenta la lista delle email gestite dal servizio. Ogni oggetto nell'array contiene informazioni come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.


`JSON.parse(localStorage.getItem('emails') || 'null') ||`
Significa che stiamo cercando di recuperare le email salvate nel `localStorage` (memoria locale) del browser. 
Se non ci sono email salvate, utilizziamo un array predefinito di email come fallback (valore di riserva). 
Questo ci permette di avere un set iniziale di email anche se l'utente non ha ancora interagito con l'applicazione.


## (PRIMA) MODIFICA della classe EMAILSERVICE
Ho commentato la proprietà `emailsSignal` e ho aggiunto la proprietà `stored` per recuperare le email salvate nel localStorage.
La proprietà `stored` contiene le email salvate nel `localStorage` o un array vuoto se non ci sono email salvate.
Ho modificato la proprietà `emailsSignal` per inizializzarla con le email salvate nel `localStorage` se presenti, altrimenti utilizza l'array predefinito di email.    


## (SECONDA) MODIFICA della classe EMAILSERVICE 
### Modifica (mockapi.io) per consentire l'aggiornamento delle email tramite richieste HTTP PUT e POST.
Ho modificato l'URL dell'API per puntare a un endpoint che supporta le operazioni di aggiornamento e creazione delle email. In questo modo, quando si inviano richieste `HTTP PUT` o `POST`, le modifiche vengono salvate correttamente nel backend.



## PRENDERE LE EMAIL
```typescript
getEmails() {
return this.emailsSignal();
}
```
Definiamo un metodo pubblico `getEmails()` che restituisce l'array di email. Questo metodo può essere chiamato da altri componenti o servizi per ottenere la lista delle email.

Il metodo utilizza `this.emailsSignal()` per accedere ai dati delle email, che sono gestiti come un segnale reattivo.



## ELIMINARE LE EMAIL SELEZIONATE

`deleteSelectedEmails() { ... }`

Definiamo un metodo pubblico `deleteSelectedEmails()` che viene chiamato quando l'utente vuole eliminare le email selezionate.
All'interno di questo metodo, utilizziamo `this.emailsSignal.update()` per aggiornare lo stato del segnale reattivo. 

La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui le email selezionate (`email.selected`) vengono modificate per avere `is_deleted` impostato su true e `selected` impostato su false, mentre le altre email rimangono invariate.

In sintesi, questo servizio gestisce un elenco di email e fornisce metodi per accedere a queste email e per spostare le email selezionate nella cartella "trash".

Se l'email è selezionata, creo un nuovo oggetto email con la cartella impostata su "trash", selected impostato su false e is_deleted impostato su true.

### NB: `... email` - i puntini rappresentano un array di oggetti email, ognuno con proprietà come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.

### NB: La differenza tra `update` e `set` è che `update` permette di modificare solo alcune proprietà dell'oggetto, mentre `set` sostituisce completamente l'oggetto con uno nuovo. In questo caso, utilizziamo `update` per modificare solo le email selezionate senza perdere le altre email nell'array.

### NB: La differenza tra `update` e `computed` è che `update` permette di modificare lo stato del segnale reattivo, mentre `computed` crea un nuovo segnale basato su uno o più segnali esistenti. In questo caso, utilizziamo update per modificare lo stato delle email senza creare un nuovo segnale.


## MODIFICA metodo "ELIMINARE EMAIL SELEZIONATE" (mockAPI)
Ho modificato il metodo `deleteSelectedEmails()` per inviare una richiesta `HTTP PUT` a mockapi.io per aggiornare lo stato delle email selezionate sul server.
Ho aggiunto un ciclo `forEach` per iterare sulle email selezionate e inviare una richiesta `PUT` per ciascuna email, aggiornando le proprietà `is_deleted` e `selected`.
In questo modo, le modifiche alle email selezionate vengono salvate sia localmente che sul server, garantendo la coerenza dei dati tra il client e il server.

### NB: `.subscribe()` è un metodo che permette di iscriversi a un osservabile (observable) in Angular, cioè eseguire del codice quando l'osservabile emette un valore. In questo caso, viene utilizzato per eseguire la richiesta `HTTP PUT` a mockapi.io e aggiornare lo stato delle email selezionate sul server.
### `.subscribe()` è necessario per eseguire la richiesta `HTTP`. Senza `subscribe()`, la richiesta non viene inviata e le modifiche non vengono salvate sul server.



## CONSTRUCTOR EFFETTO

`constructor() { ... } `
Ho aggiunto un costruttore alla classe `EmailService` che contiene l'effetto per salvare le email nel `localStorage`. Il costruttore viene eseguito quando il servizio viene istanziato (es. all'avvio dell'applicazione), garantendo che l'effetto sia attivo fin dall'inizio.

L'effetto salva le email nel `localStorage` ogni volta che lo stato del segnale `emailsSignal` cambia. Questo garantisce che le modifiche alle email vengano persistite tra le sessioni dell'utente.

## NB: `effect()` è una funzione che permette di eseguire del codice ogni volta che uno o più segnali reattivi cambiano. In questo caso, stiamo salvando le email nel `localStorage` ogni volta che `emailsSignal` cambia.
## In questo modo, ogni volta che lo stato delle email cambia, le modifiche vengono salvate automaticamente nel `localStorage`, consentendo all'utente di mantenere le email anche dopo aver chiuso e riaperto l'applicazione.


## MODIFICA condizione login
Ho commentato la parte che verifica se l'utente è autenticato prima di salvare le email nel `localStorage`, poiché non è necessario per il funzionamento del servizio. Inoltre, il servizio `EmailService` non ha accesso diretto al servizio `AuthService`, quindi non può verificare lo stato di autenticazione dell'utente.
Tuttavia, se si desidera implementare questa funzionalità in futuro, è possibile decommentare quella parte e utilizzare il servizio `AuthService` per verificare lo stato di autenticazione dell'utente.

Ho aggiunto il servizio `MatSnackBar` al costruttore per mostrare un messaggio di conferma quando le email vengono ripristinate. Questo fornisce un feedback visivo all'utente, migliorando l'esperienza utente.



## RIPRISTINARE LE EMAIL SELEZIONATE

`restoreSelectedEmails() { ... }`
Definiamo un metodo pubblico `restoreSelectedEmails()` che viene chiamato quando l'utente vuole ripristinare le email selezionate dalla cartella "trash".

All'interno di questo metodo, utilizziamo `this.emailsSignal.update()` per aggiornare lo stato del segnale reattivo.

La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui le email selezionate (`email.selected`) vengono modificate per avere `is_deleted` impostato su false e `selected` impostato su false, mentre le altre email rimangono invariate.


## MODIFICA metodo "RIPRISTINARE EMAIL SELEZIONATE"
Ho modificato il metodo `restoreSelectedEmails()` per inviare una richiesta `HTTP PUT` a mockapi.io per aggiornare lo stato delle email selezionate sul server.
Ho aggiunto un ciclo `forEach` per iterare sulle email selezionate e inviare una richiesta `PUT` per ciascuna email, aggiornando le proprietà `is_deleted` e `selected`.
In questo modo, le modifiche alle email selezionate vengono salvate sia localmente che sul server, garantendo la coerenza dei dati tra il client e il server.



## INVIARE UNA NUOVA EMAIL

`sendEmail(email: Partial<EmailInterface>) { ... }`
Definiamo un metodo pubblico `sendEmail()` che viene chiamato quando l'utente vuole inviare una nuova email.

Il metodo accetta un oggetto email di tipo `Partial<EmailInterface>`, il che significa che può contenere solo alcune delle proprietà definite nell'interfaccia `EmailInterface`.

All'interno del metodo, creiamo un nuovo oggetto `newEmail` di tipo `EmailInterface`, impostando le proprietà necessarie come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.

L'`id` viene generato utilizzando `Date.now()`, che restituisce il numero di millisecondi trascorsi dal 1 gennaio 1970. Questo garantisce un identificatore unico per ogni email inviata.
Le altre proprietà vengono impostate in base ai valori forniti nell'oggetto email passato al metodo o a valori predefiniti se non sono presenti.


## MODIFICA metodo "INVIARE NUOVA EMAIL"
Ho modificato il metodo `sendEmail()` per inviare una richiesta `HTTP POST` a mockapi.io per salvare la nuova email sul server. 
In questo modo, le email inviate vengono salvate sia localmente che sul server, garantendo la coerenza dei dati tra il client e il server.



## SALVARE UNA BOZZA DI EMAIL

`saveDraft(email: Partial<EmailInterface>) { ... }`
Definiamo un metodo pubblico `saveDraft()` che viene chiamato quando l'utente vuole salvare una bozza di email.

Il metodo accetta un oggetto email di tipo `Partial<EmailInterface>`, simile al metodo `sendEmail()`.

All'interno del metodo, creiamo un nuovo oggetto `newDraft` di tipo `EmailInterface`, impostando le proprietà necessarie come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.

L'`id` viene generato utilizzando `Date.now()`, garantendo un identificatore unico per ogni bozza salvata.
Le altre proprietà vengono impostate in base ai valori forniti nell'oggetto email passato al metodo o a valori predefiniti se non sono presenti.

La cartella viene impostata su "drafts" e la label su "Draft" per indicare che si tratta di una bozza.



 ## SELEZIONA / DESELEZIONA EMAIL PER ID (array di ids)

 ## NB: Il metodo `toggleEmailSelection`  e `setSelectedEmails` fanno la stessa cosa, ma `toggleEmailSelection` è più specifico per un singolo emailId, mentre `setSelectedEmails` può gestire un array di ids.

`setSelectedEmails(ids: number[], selected: boolean) { ... }`
Definiamo un metodo pubblico `setSelectedEmails()` che viene chiamato quando l'utente vuole selezionare o deselezionare una o più email.

Il metodo accetta un array di id di tipo `number[]` e un valore booleano `selected` che indica se le email devono essere selezionate (true) o deselezionate (false).

All'interno del metodo, utilizziamo `this.emailsSignal.update()` per aggiornare lo stato del segnale reattivo. 

La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui le email con id presenti nell'array ids vengono modificate per avere la proprietà `selected` impostata sul valore passato al metodo, mentre le altre email rimangono invariate. 
Ad esempio, se ids contiene [1, 3] e selected è true, le email con id 1 e 3 verranno selezionate, mentre tutte le altre email rimarranno deselezionate.



## CONTA EMAIL SELEZIONATE

`getSelectedEmailsCount(): number { ... }`
Definiamo un metodo pubblico `getSelectedEmailsCount()` che restituisce il numero di email attualmente selezionate.

All'interno del metodo, utilizziamo `this.emailsSignal()` per ottenere l'array corrente di email e applichiamo il metodo `filter()` per creare un nuovo array contenente solo le email con la proprietà selected impostata su true.

Infine, restituiamo la lunghezza di questo nuovo array utilizzando la proprietà `length`, che rappresenta il NUMERO di email selezionate.

In sintesi, questo metodo permette di ottenere rapidamente il numero di email selezionate dall'utente, utile per aggiornare l'interfaccia utente o per eseguire azioni sulle email selezionate.



## PULIZIA SELEZIONE EMAIL

`clearSelection() { ... }`
Definiamo un metodo pubblico `clearSelection()` che viene chiamato quando l'utente vuole deselezionare tutte le email.

All'interno del metodo, utilizziamo `this.emailsSignal.update()` per aggiornare lo stato del segnale reattivo. 

La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui tutte le email vengono modificate per avere la proprietà `selected` impostata su false, mentre le altre proprietà rimangono invariate. In questo modo, tutte le email vengono deselezionate contemporaneamente.



## SELEZIONA / DESELEZIONA EMAIL PER ID (singolo emailId)

## NB: Questo metodo `toggleEmailSelection`  e `setSelectedEmails` fanno la stessa cosa, ma `toggleEmailSelection` è più specifico per un singolo emailId, mentre `setSelectedEmails` può gestire un array di ids.

`toggleEmailSelection(emailId: number, selected: boolean) { ... }`
Definiamo un metodo pubblico `toggleEmailSelection()` che viene chiamato quando l'utente vuole selezionare o deselezionare una singola email.

Il metodo accetta un `id` di tipo number che rappresenta l'identificatore dell'email da selezionare o deselezionare e un valore booleano `selected` che indica se l'email deve essere selezionata (true) o deselezionata (false).

All'interno del metodo, utilizziamo `this.emailsSignal.update()` per aggiornare lo stato del segnale reattivo. 

La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui l'email con l'id corrispondente a `emailId` viene modificata per avere la proprietà `selected` impostata sul valore passato al metodo, mentre le altre email rimangono invariate. In questo modo, l'utente può selezionare o deselezionare una singola email senza influenzare lo stato delle altre email nell'elenco.



## MOCKAPI.IO

Ho aggiunto un metodo `loadEmails()` che utilizza il servizio `HttpClient` di Angular per effettuare una richiesta `GET` all'API mockapi.io e recuperare le email.

Il metodo si iscrive all'osservabile restituito dalla richiesta `HTTP` e, quando i dati vengono ricevuti, aggiorna lo stato del segnale `emailsSignal` con le email recuperate dall'API.

In questo modo, le email vengono caricate dal server all'avvio del servizio e possono essere visualizzate nell'applicazione.  

### NB: Siccome mockapi genera un id come stringa, è meglio usare string invece di number. Perciò ho modificato l'interfaccia `EmailInterface` e tutti i metodi che utilizzano l'id delle email per lavorare con string invece di number.

### NB: Gli observable in Angular sono flussi di dati asincroni che possono emettere valori nel tempo. Il metodo `subscribe()` permette di iscriversi a un observable e ricevere i valori emessi, eseguendo una funzione callback ogni volta che viene emesso un nuovo valore. 
### In questo caso, viene utilizzato per ricevere le email dall'API mockapi.io e aggiornare lo stato del segnale emailsSignal con i dati ricevuti.
// Ora emailsSignal viene inizializzato come un array vuoto e viene popolato con le email recuperate dall'API mockapi.io quando il metodo loadEmails() viene chiamato nel costruttore del servizio.
// Nel metodo loadEmails(), next serve per gestire la risposta positiva della richiesta HTTP, mentre error serve per gestire eventuali errori durante la richiesta. 
// In caso di successo, le email vengono aggiornate nel segnale emailsSignal e viene mostrato un messaggio di conferma tramite MatSnackBar. In caso di errore, viene mostrato un messaggio di errore sempre tramite MatSnackBar.

// Ho aggiunto un segnale loading per indicare lo stato di caricamento delle email. Questo segnale viene impostato su true all'inizio del metodo loadEmails() e su false al termine della richiesta, sia in caso di successo che di errore.


/// ARCHIVIA EMAIL
// archiveSelectedEmails() { ... }
// Ho aggiunto un metodo archiveSelectedEmails() che permette di spostare le email selezionate nella cartella "archived".
// Il metodo utilizza this.emailsSignal() per ottenere l'array corrente di email e filtra le email selezionate.
// Per ciascuna email selezionata, viene inviata una richiesta HTTP PUT a mockapi.io per aggiornare la proprietà folder dell'email su "archived" e impostare selected su false.
// Dopo che la richiesta è completata con successo, lo stato del segnale emailsSignal viene aggiornato localmente per riflettere le modifiche apportate sul server.
// In questo modo, le email selezionate vengono archiviate sia localmente che sul server, garantendo la coerenza dei dati tra il client e il server.

// NB: emails.map(e =>e.id === email.id ? { ...e, folder: 'archived', selected: false } : e
// Questa parte del codice utilizza il metodo map per creare un nuovo array di email, in cui l'email con l'id corrispondente a email.id viene modificata per avere la proprietà folder impostata su "archived" e selected impostata su false.
// e.id === email.id ?: se l'id dell'email corrente (e.id) è uguale all'id dell'email selezionata (email.id), allora viene creato un nuovo oggetto email con le proprietà aggiornate, altrimenti l'email rimane invariata.
// Questo controllo sembra ridondante, ma è necessario per garantire che solo l'email selezionata venga modificata, mentre tutte le altre email rimangono invariate nell'array.