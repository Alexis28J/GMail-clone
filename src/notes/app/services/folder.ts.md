
# COMMENTI

Una classe in Angular è un costrutto che rappresenta un'entità o un concetto all'interno dell'applicazione. 
Può essere utilizzata per definire componenti, servizi, direttive, pipe e altro ancora. 

Le classi in Angular sono spesso decorate con decoratori specifici (come `@Component`, `@Injectable`, ecc.) per indicare il loro ruolo e comportamento all'interno dell'applicazione. 
Ad esempio, una classe decorata con `@Component` rappresenta un componente UI, mentre una classe decorata con `@Injectable` rappresenta un servizio che può essere iniettato in altri componenti o servizi.

NON può avere più di un decoratore, ma può implementare più interfacce. 

Le classi in Angular possono avere proprietà, metodi e costruttori per gestire lo stato e il comportamento dell'entità che rappresentano. 

Possono anche estendere altre classi per ereditare funzionalità comuni. In sintesi, una classe in Angular è un costrutto fondamentale che consente di organizzare e strutturare il codice dell'applicazione in modo modulare e riutilizzabile.

### NB: `private` vuol dire che la proprietà `selectedFolder` è accessibile solo all'interno della classe `Folder` e non può essere modificata direttamente da altre classi o componenti.



## PASSAGGI

1. Creo la classe `Folder` e la dichiaro come un servizio iniettabile utilizzando il decoratore `@Injectable`. 

Questo permette ad altri componenti o servizi di utilizzare la classe `Folder` come dipendenza, consentendo l'accesso alle sue proprietà e metodi.


2. Creo il `constructor` della classe `Folder` per iniettare il servizio `EmailService`. In questo modo, la classe `Folder` può accedere ai metodi e alle proprietà del servizio `EmailService` per ottenere le email e gestire le cartelle associate.

### NB: `emailService` è un nome che ho scelto io, ma deve essere lo stesso nome della classe che sto importando (per non creare conflitti), in questo caso `EmailService`.

Inoltre, ho aggiunto anche il servizio `AuthService` per poter verificare se l'utente è autenticato prima di filtrare le email in base alla cartella selezionata.



## FOLDER SELEZIONATO

`private selectedFolder = signal<string>('Inbox');`
Creo una proprietà privata `selectedFolder` che è un segnale reattivo contenente una stringa. 

Inizializzo il segnale con il valore 'Inbox', che rappresenta la cartella selezionata di default. 

Il tipo `<string>` indica che il segnale conterrà solo valori di tipo stringa. 

Questo segnale può essere utilizzato per tenere traccia della cartella attualmente selezionata e aggiornare l'interfaccia utente di conseguenza.


`if (this.selectedFolder() === folderId) { return; }`
Ho aggiunto un controllo all'interno del metodo `setSelectedFolder(folderId: string)`.

Questo controllo verifica se la cartella selezionata attuale (`this.selectedFolder()`) è uguale alla cartella passata come parametro (`folderId`). 

Se sono uguali, significa che l'utente ha selezionato la stessa cartella già selezionata, quindi non è necessario aggiornare il segnale `selectedFolder`. 

In questo caso, il metodo termina immediatamente con `return;`, evitando di eseguire ulteriori operazioni e migliorando le prestazioni dell'applicazione.


Ho aggiunto `this.emailService.clearSelection();` all'interno del metodo `setSelectedFolder(folderId: string)` prima di aggiornare il segnale `selectedFolder`.

Questo serve a deselezionare tutte le email quando l'utente cambia cartella. 
In questo modo, quando l'utente seleziona una nuova cartella, tutte le email precedentemente selezionate vengono deselezionate automaticamente, evitando confusione e garantendo che l'interfaccia utente rifletta correttamente lo stato delle email nella nuova cartella selezionata.



## LISTA CARTELLE   

`private foldersSignal = signal<FolderInterface[]>([ ... ]);`
Creo una proprietà privata `foldersSignal` che è un segnale reattivo contenente un array di oggetti che seguono l'interfaccia `FolderInterface`. 

Questo array rappresenta la lista delle cartelle gestite dal servizio. Ogni oggetto nell'array contiene informazioni come id, name, icon e count (opzionale) per ogni cartella.

Il tipo `<FolderInterface[]>` indica che il segnale conterrà solo valori di tipo array di `FolderInterface`.



## FUNZIONE PER OTTENERE LE CARTELLE

`getFolders() { return this.foldersSignal(); }`
Creo un metodo pubblico `getFolders()` che restituisce l'array di cartelle. 

Questo metodo può essere chiamato da altri componenti o servizi per ottenere la lista delle cartelle. 

Il metodo utilizza `this.foldersSignal()` per accedere ai dati delle cartelle, che sono gestiti come un segnale reattivo.



## FUNZIONE PER SELEZIONARE UNA CARTELLA

`setSelectedFolder(folderId: string) { this.selectedFolder.set(folderId); }`
Creo un metodo pubblico `setSelectedFolder(folderId: string)` che accetta un parametro `folderId` di tipo stringa.

Questo metodo viene utilizzato per aggiornare il valore del segnale `selectedFolder` con il nuovo `folderId` passato come argomento. 

In questo modo, quando viene chiamato questo metodo, la cartella selezionata viene aggiornata e l'interfaccia utente può reagire di conseguenza per mostrare le email corrispondenti alla nuova cartella selezionata.



## FUNZIONE PER OTTENERE LA CARTELLA SELEZIONATA

`getSelectedFolder() { return this.selectedFolder(); }`
Creo un metodo pubblico `getSelectedFolder()` che restituisce il valore attuale del segnale `selectedFolder`. 

Questo metodo può essere chiamato da altri componenti o servizi per ottenere la cartella attualmente selezionata.

Il metodo utilizza `this.selectedFolder()` per accedere al valore del segnale, che rappresenta la cartella selezionata in quel momento.

Non ha parametri perché restituisce semplicemente il valore attuale del segnale `selectedFolder`, che è una stringa che rappresenta la cartella selezionata.

La differenza tra `getFolders()` e `getSelectedFolder()` è che il primo restituisce l'intera lista delle cartelle, mentre il secondo restituisce solo la cartella attualmente selezionata.



## FILTRO EMAIL

Creo una proprietà computed `filteredEmails` che restituisce un array di email filtrate in base alla cartella selezionata.

La funzione di filtro utilizza uno `switch case` per verificare il valore della cartella selezionata (`folder`) e applica un filtro diverso alle email in base a quel valore. 

Il filtro utilizza il metodo `filter()` per creare un nuovo array di email che soddisfano le condizioni specificate per ogni cartella.

`if (!this.authService.isLoggedIn()) {return [];}`
Prima di applicare il filtro, viene verificato se l'utente è autenticato utilizzando il metodo `isLoggedIn()` del servizio `AuthService`.
Se l'utente non è autenticato, la funzione restituisce un array vuoto, impedendo l'accesso alle email filtrate. 
Questo garantisce che solo gli utenti autenticati possano visualizzare le email filtrate in base alla cartella selezionata.

`.getEmails()()` è una funzione che restituisce un array di email. Il primo set di parentesi () chiama il metodo `getEmails()` del servizio `EmailService`, mentre il secondo set di parentesi () invoca il segnale reattivo che contiene l'array di email. 
In questo modo, otteniamo l'array di email attuale da filtrare in base alla cartella selezionata.


## CASI FILTRO EMAIL:

Ad esempio, se la cartella selezionata è 'starred', il filtro restituirà solo le email che sono contrassegnate come starred e che appartengono alla cartella 'inbox'. 
Se la cartella selezionata è 'important', il filtro restituirà solo le email che hanno l'etichetta 'important'. 
Se la cartella selezionata è 'spam', il filtro restituirà solo le email che appartengono alla cartella 'spam', e così via per le altre cartelle.

Invece se la cartella selezionata è 'inbox', il filtro restituirà tutte le email che non sono contrassegnate come eliminate (`is_deleted !== true`), indipendentemente dalla cartella a cui appartengono.

E nel caso predefinito (default), il filtro restituirà tutte le email che non sono contrassegnate come eliminate e che appartengono alla cartella specificata dal valore di folder.

Trash è un caso particolare, in quanto restituisce tutte le email che sono contrassegnate come eliminate (`is_deleted === true`), indipendentemente dalla cartella a cui appartengono.

Alcuni come 'work' ha due condizioni: restituisce le email che hanno l'etichetta 'work' e che non sono contrassegnate come eliminate (`is_deleted !== true`).

Alcuni nomi di cartelle come 'starred', 'important', 'personal' e 'work' si basano su etichette (`label`) piuttosto che sulla cartella (`folder`) a cui appartengono le email.
Ad esempio, le email contrassegnate come 'starred' o 'important' possono trovarsi in diverse cartelle, ma vengono filtrate in base alla loro etichetta.

Altre cartelle come 'inbox', 'sent', 'drafts', 'spam', 'trash', 'archived' e 'snoozed' si basano sulla cartella (`folder`) a cui appartengono le email, indipendentemente dalle etichette che possono avere.
Ad esempio, le email nella cartella 'inbox' possono avere diverse etichette, ma vengono filtrate in base alla loro appartenenza alla cartella 'inbox'.

Oltre ai casi specifici, il filtro predefinito (default) restituisce tutte le email che non sono contrassegnate come eliminate (`is_deleted !== true`), indipendentemente dalla cartella a cui appartengono. 
L'altra condizione del default è che le email devono appartenere alla cartella specificata dal valore di `folder`, che rappresenta la cartella selezionata dall'utente. 
In questo caso 'inbox' è la cartella selezionata di default, quindi il filtro restituirà tutte le email che non sono contrassegnate come eliminate e che appartengono alla cartella 'inbox'.

Non è necessario un caso per la cartella 'trash' perché le email eliminate vengono filtrate in base alla proprietà `is_deleted`, quindi non è necessario spostarle in una cartella specifica.

In sintesi, questo filtro consente di visualizzare le email in base alla cartella selezionata, applicando condizioni specifiche per ogni cartella per mostrare solo le email rilevanti per quella cartella.

### NB: `break;` serve per interrompere l'esecuzione del blocco di codice all'interno di un'istruzione `switch case`.

### NB: Ho eliminato `computed<EmailInterface[]>` perché TypeScript riesce a inferire il tipo di ritorno della funzione in base al tipo di dati restituito, quindi non è necessario specificarlo esplicitamente.



## RICERCA EMAIL

1. Ho creato una proprietà privata `searchTerm` che è un segnale reattivo contenente una stringa.

Inizializzo il segnale con una stringa vuota, che rappresenta il termine di ricerca iniziale. 

Il tipo `<string>` indica che il segnale conterrà solo valori di tipo stringa. 

Questo segnale può essere utilizzato per tenere traccia del termine di ricerca inserito dall'utente e aggiornare l'interfaccia utente di conseguenza.


2. Ho creato un metodo pubblico `setSearchTerm(term: string)` che accetta un parametro `term` di tipo stringa.
Questo metodo viene utilizzato per aggiornare il valore del segnale `searchTerm` con il nuovo termine di ricerca passato come argomento. 
In questo modo, quando viene chiamato questo metodo, il termine di ricerca viene aggiornato e l'interfaccia utente può reagire di conseguenza per filtrare le email in base al nuovo termine di ricerca.


3. Ho creato un metodo pubblico `getSearchTerm()` che restituisce il valore attuale del segnale `searchTerm`.
Questo metodo può essere chiamato da altri componenti o servizi per ottenere il termine di ricerca attualmente inserito dall'utente. 
Il metodo utilizza `this.searchTerm()` per accedere al valore del segnale, che rappresenta il termine di ricerca in quel momento.
Non ha parametri perché restituisce semplicemente il valore attuale del segnale `searchTerm`, che è una stringa che rappresenta il termine di ricerca inserito dall'utente.


4. Integro la search dentro `filteredEmails`, in modo che le email filtrate siano anche filtrate in base al termine di ricerca inserito dall'utente. Con questo, voglio dire che `filteredEmails` ora tiene conto sia della cartella selezionata che della ricerca. Voglio che la search sia applicata anche ai messaggi filtrati per cartella. E per fare questo, devo accedere alla cartella selezionata e ai messaggi filtrati per cartella. Quindi, `filteredEmails` deve essere una `computed` che dipende da `selectedFolder` e dai messaggi filtrati per cartella.
In questo modo, quando l'utente digita qualcosa nella barra di ricerca, i risultati filtrati verranno aggiornati automaticamente in base alla cartella selezionata e ai criteri di ricerca.


5. Ho creato `search = this.searchTerm()` che è una variabile che contiene il valore attuale del segnale `searchTerm`.


6. Ho MODIFICATO i casi dello `switch case` in modo che le email filtrate siano anche filtrate in base al termine di ricerca inserito dall'utente.
   
Uso `result`, invece di `return`, per poter applicare il filtro search successivamente.


7. Ho AGGIUNTO un controllo `if (!search) return result;` prima di filtrare le email in base al termine di ricerca.
Questo controllo verifica se il termine di ricerca è vuoto o nullo.

Se il termine di ricerca è vuoto o nullo, la funzione restituisce l'array di email filtrate in base alla cartella selezionata senza applicare ulteriori filtri.
In questo modo, se l'utente non ha inserito alcun termine di ricerca, verranno visualizzate tutte le email filtrate in base alla cartella selezionata.


6. Ho MODIFICATO il filtro in modo che le email perché si possano filtrare in base a più parole chiave separate da spazi.
Perciò ho creato `keywords = search.split(' ').filter(k => k.length > 0);` che è una variabile che contiene un array di parole chiave separate da spazi.

### NB: `k` è una variabile che rappresenta ogni parola chiave nell'array keywords.


7. `Fallback` se tutto è disattivato. Se l'array `fields` è vuoto (`if (fields.length === 0)`), significa che nessun filtro è attivo, quindi vengono aggiunti tutti i campi dell'email all'array `fields` (`fields.push(email.subject, email.body, email.sender, email.recipient)`) per garantire che la ricerca funzioni correttamente anche quando nessun filtro è attivo.

8. Concateno i campi selezionati in un'unica stringa e la converto in minuscolo per la ricerca case insensitive, poi verifico che ogni keyword sia presente nella stringa concatenata dei campi selezionati.

`const searchableText = fields.join(' ').toLowerCase();` significa che la ricerca non è case sensitive
e ogni keyword deve essere presente nel testo concatenato dei campi selezionati.
```typescript
   return keywords.every(keyword =>   
        searchableText.includes(keyword)
      )
```



## MENU FILTRI

1. Ho creato un menu filtri per filtrare le email in base a tre criteri: subject, sender e date.


2. Ho creato una proprietà privata `activeFilters` che è un segnale reattivo contenente un oggetto con le proprietà subject, sender e date.


3. Inizializzo il segnale con un oggetto che ha le proprietà `subject` e `sender` impostate su true e la proprietà `date` impostata su false.

### NB: `false` su `date` significa che il filtro per la data non è attivo di `default`, mentre `true` su `subject` e `sender` significa che i filtri per l'oggetto e il mittente sono attivi di default.

Questo segnale può essere utilizzato per tenere traccia dei filtri attivi selezionati dall'utente e aggiornare l'interfaccia utente di conseguenza.


4. Ho creato un metodo pubblico `setFilter(key: keyof ReturnType<typeof this.activeFilters>, value: boolean)` che accetta due parametri: `key` e `value`.

Il parametro `key` è di tipo `keyof ReturnType<typeof this.activeFilters>`, che rappresenta le chiavi dell'oggetto `activeFilters` (subject, sender e date).

Il parametro `value` è di tipo boolean, che rappresenta il valore del filtro (true o false).

Questo metodo viene utilizzato per aggiornare il valore del filtro specificato dalla chiave key con il nuovo valore value passato come argomento.

In questo modo, quando viene chiamato questo metodo, il filtro specificato viene aggiornato e l'interfaccia utente può reagire di conseguenza per applicare o rimuovere il filtro selezionato.


5. Ho creato un metodo pubblico `getFilters()` che restituisce l'oggetto `activeFilters`.

Questo metodo può essere chiamato da altri componenti o servizi per ottenere i filtri attivi selezionati dall'utente.

Il metodo utilizza `this.activeFilters()` per accedere al valore del segnale, che rappresenta i filtri attivi in quel momento.
Non ha parametri perché restituisce semplicemente il valore attuale del segnale `activeFilters`, che è un oggetto con le proprietà subject, sender e date che rappresentano i filtri attivi selezionati dall'utente.

In parole semplici, `setFilter()` serve per impostare un filtro specifico (subject, sender o date) su true o false, mentre `getFilters()` serve per ottenere lo stato attuale di tutti i filtri attivi.


6. Poi, tornando su, nel computed `filteredEmails`, ho aggiunto `const filters = this.activeFilters();` per ottenere i filtri attivi selezionati dall'utente e applicarli al filtro delle email (cioè alle email visualizzate) in base alla cartella selezionata e al termine di ricerca inserito dall'utente. 
In questo modo, le email filtrate saranno anche filtrate in base ai filtri attivi selezionati dall'utente.


7. Successivamente, ho modificato il filtro con una serie di condizioni che verificano se i filtri attivi sono impostati su true o false e aggiungono i campi corrispondenti all'array fields (vedi `FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)`)

`if(filters.subject) fields.push(email.subject);` vuol dire che se il filtro subject è attivo (true), allora il campo subject dell'email viene aggiunto all'array fields.

`if (filters.sender) fields.push(email.sender);` vuol dire che se il filtro sender è attivo (true), allora aggiungo il campo sender alla lista dei campi da cercare.

`if (filters.date) {...}`, se il filtro data è attivo, aggiungo al campo di ricerca la data in vari formati (ISO, anno, mese, giorno, nome del mese in inglese e italiano). Questo permette di cercare le email anche per data.

In questo modo, se un filtro è attivo (true), il campo corrispondente viene aggiunto all'array fields e verrà considerato nella ricerca delle parole chiave.

### NB: `const searchableText = fields.join(' ').toLowerCase();` significa che tutti i campi selezionati dai filtri attivi vengono uniti in una singola stringa e convertiti in minuscolo, in modo da poter cercare le parole chiave in tutti i campi selezionati dai filtri attivi, indipendentemente dal fatto che siano in maiuscolo o minuscolo.


8. ```typescript
  return keywords.every(keyword =>  
        searchableText.includes(keyword)
        )
        // Ritorna true se tutte le keyword sono presenti nel testo concatenato dei campi selezionati, altrimenti false,
       // il che significa che l'email sarà inclusa nel risultato solo se tutte le keyword sono presenti nei campi selezionati.
   ```

Infine, ho modificato il filtro con `keywords.every()` per verificare se tutte le parole chiave sono presenti nel testo da cercare (`searchableText`) e restituire true solo se tutte le parole chiave sono presenti.

In questo modo, le email visualizzate saranno filtrate in base alla cartella selezionata, al termine di ricerca inserito dall'utente e ai filtri attivi selezionati dall'utente.



## Filtro Date (MENU FILTRI)

(vedi `FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)`)

Per quanto riguarda il filtro per la data, ho aggiunto un controllo `if (filters.date)` che verifica se il filtro per la data è attivo (true).
Se il filtro per la data è attivo, viene creato un oggetto `Date` a partire dal `timestamp` dell'email e vengono estratti i vari componenti della data (anno, mese, giorno, ecc.).

Questi componenti vengono poi aggiunti all'array `fields` in modo che possano essere considerati nella ricerca delle parole chiave.

In questo modo, se il filtro per la data è attivo, le email visualizzate saranno filtrate anche in base alla data di invio o ricezione dell'email.

`const date = typeof email.timestamp === 'string' ? new Date(email.timestamp) : email.timestamp;` significa che se il `timestamp` dell'email è una stringa, viene creato un oggetto `Date` a partire da quella stringa, altrimenti viene utilizzato direttamente l'oggetto `Date` presente nel `timestamp`. In parole semplici, questa riga di codice serve a garantire che il `timestamp` dell'email sia sempre un oggetto `Date`, 
indipendentemente dal formato in cui è stato salvato.

`const fullDate = date.toISOString();` significa che viene creato un formato di data completo (YYYY-MM-DD) a partire dall'oggetto `Date`. 

`const year = date.getFullYear().toString();` significa che viene estratto l'anno dall'oggetto `Date` e convertito in stringa.

`const month = (date.getMonth() + 1).toString().padStart(2, '0');` significa che viene estratto il mese dall'oggetto `Date`, aggiunto 1 (perché i mesi partono da 0) e convertito in stringa con due cifre (es. 01, 02, ..., 12).

`const monthRaw = (date.getMonth() + 1).toString();` significa che viene estratto il mese dall'oggetto `Date`, aggiunto 1 e convertito in stringa senza padding (es. 1, 2, ..., 12).

`const day = date.getDate().toString().padStart(2, '0');` significa che viene estratto il giorno dall'oggetto `Date` e convertito in stringa con due cifre (es. 01, 02, ..., 31).

`const dayRaw = date.getDate().toString();` significa che viene estratto il giorno dall'oggetto `Date` e convertito in stringa senza padding (es. 1, 2, ..., 31).

`const monthName = date.toLocaleString('en', { month: 'long' }).toLowerCase();` significa che viene estratto il nome del mese in inglese dall'oggetto `Date` e convertito in minuscolo (es. january, february, ..., december).

`const monthNameIT = date.toLocaleString('it', { month: 'long' }).toLowerCase();` significa che viene estratto il nome del mese in italiano dall'oggetto `Date` e convertito in minuscolo (es. gennaio, febbraio, ..., dicembre).

Infine, tutti questi componenti della data vengono uniti in una singola stringa e aggiunti all'array `fields` in modo che possano essere considerati nella ricerca delle parole chiave.



## SELEZIONARE TUTTE LE EMAIL

Ho creato una proprietà `selectAll` che è un segnale reattivo contenente un booleano.

Inizializzo il segnale con il valore `false`, che rappresenta lo stato iniziale di selezione di tutte le email.

Il tipo `<boolean>` indica che il segnale conterrà solo valori di tipo booleano.

Questo segnale può essere utilizzato per tenere traccia dello stato di selezione di tutte le email e aggiornare l'interfaccia utente di conseguenza.

Ho creato un metodo pubblico `setSelectAll(value: boolean)` che accetta un parametro `value` di tipo booleano.

Questo metodo viene utilizzato per aggiornare il valore del segnale `selectAll` con il nuovo valore passato come argomento.

In questo modo, quando viene chiamato questo metodo, lo stato di selezione di tutte le email viene aggiornato e l'interfaccia utente può reagire di conseguenza per selezionare o deselezionare tutte le email