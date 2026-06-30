import { computed, Injectable, signal } from '@angular/core';
import { FolderInterface } from '../interface/folder-interface';
import { EmailService } from '../services/email'
import { EmailInterface } from '../interface/email-interface';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class Folder {

  constructor(private emailService: EmailService, private authService: AuthService) { }

  private selectedFolder = signal<string>('inbox');

  private foldersSignal = signal<FolderInterface[]>(
    [
      { id: 'inbox', name: 'Inbox', icon: 'inbox' },
      { id: 'starred', name: 'Special', icon: 'star' },
      { id: 'snoozed', name: 'Snoozed', icon: 'watch_later' },
      { id: 'sent', name: 'Sent', icon: 'send' },
      { id: 'drafts', name: 'Drafts', icon: 'drafts' },
      { id: 'spam', name: 'Spam', icon: 'report' },
      { id: 'important', name: 'Important', icon: 'label_important' },
      { id: 'personal', name: 'Personal', icon: 'person' },
      { id: 'archived', name: 'Archived', icon: 'archive' },
      { id: 'work', name: 'Work', icon: 'work' },
      { id: 'trash', name: 'Trash', icon: 'delete' },
    ]
  );

  getFolders() {
    return this.foldersSignal;
  }

  setSelectedFolder(folderId: string) {
    this.selectedFolder.set(folderId);
  }

  getSelectedFolder() {
    return this.selectedFolder;
  }


  // TROVARE MESSAGGI
  private searchTerm = signal<string>('');

  setSearchTerm(term: string) {
    this.searchTerm.set(term.toLowerCase().trim());
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  //Integro la search dentro filteredEmails


  filteredEmails = computed(() => {

    if (!this.authService.isLoggedIn()) {
      return [];
    }

    const folder = this.selectedFolder();
    const emails = this.emailService.getEmails()();
    const search = this.searchTerm();
    const filters = this.activeFilters();

    let result: EmailInterface[];

    switch (folder) {

      case 'starred':
        //return emails.filter(e => e.starred && !e.is_deleted);
        result = emails.filter(e => e.starred && !e.is_deleted);
        break;

      case 'important':
        //return emails.filter(e => e.label === 'Important' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Important' && !e.is_deleted);
        break;

      case 'spam':
        //return emails.filter(e => e.folder === 'spam');
        result = emails.filter(e => e.folder === 'spam');
        break;

      case 'trash':
        //return emails.filter(e => e.is_deleted === true);
        result = emails.filter(e => e.is_deleted === true);
        break;

      case 'drafts':
        //return emails.filter(e => e.folder === 'drafts');
        result = emails.filter(e => e.folder === 'drafts');
        break;

      case 'sent':
        //return emails.filter(e => e.folder === 'sent');
        result = emails.filter(e => e.folder === 'sent');
        break;

      case 'personal':
        //return emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        break;

      case 'work':
        //return emails.filter(e => e.label === 'Work' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Work' && !e.is_deleted);
        break;

      case 'archived':
        //return emails.filter(e => e.folder === 'archived');
        result = emails.filter(e => e.folder === 'archived');
        break;

      case 'snoozed':
        //return emails.filter(e => e.folder === 'snoozed');
        result = emails.filter(e => e.folder === 'snoozed');
        break;

      case 'inbox':
      //return emails.filter(e => !e.is_deleted);

      //default: return emails.filter(e => !e.is_deleted);

      default: result = emails.filter(e => !e.is_deleted);

    }

    // FILTRO SEARCH 
    // if (!search) return result;

    // return result.filter(email =>
    //   email.subject.toLowerCase().includes(search) ||
    //   email.sender.toLowerCase().includes(search) ||
    //   email.body.toLowerCase().includes(search) ||
    //   email.recipient.toLowerCase().includes(search)
    // );


    // FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)
    if (!search) return result;

    const keywords = search.split(' ').filter(k => k.length > 0);

    // return result.filter(email => {

    //   const fields = [
    //     email.subject,
    //     email.body,
    //     email.sender,
    //     email.recipient
    //   ].join(' ').toLowerCase();


    //   // return keywords.every(keyword => 
    //   //   searchableText.includes(keyword));

    //   return keywords.some(keyword =>
    //     fields.includes(keyword));

    // });

    return result.filter(email => {

      const fields: string[] = [];

      if (filters.subject) fields.push(email.subject);
      if (filters.sender) fields.push(email.sender);

      //if (filters.date) fields.push(email.timestamp.toString()); 
      if (filters.date) {
        const date = typeof email.timestamp === 'string' ? new Date(email.timestamp) : email.timestamp; 

        const fullDate = date.toISOString(); // 2026-06-14
        const year = date.getFullYear().toString(); // 2026

        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 06
        const monthRaw = (date.getMonth() + 1).toString(); // 6

        const day = date.getDate().toString().padStart(2, '0'); // 14
        const dayRaw = date.getDate().toString(); // 14
      
        const monthName = date.toLocaleString('en', { month: 'long' }).toLowerCase(); // june
        const monthNameIT = date.toLocaleString('it', { month: 'long' }).toLowerCase(); // giugno

        fields.push(`${fullDate} ${year} ${month} ${monthRaw} ${day} ${dayRaw} ${monthName} ${monthNameIT}`);

      }


      // fallback se tutto è disattivato

      if (fields.length === 0) {

        fields.push(email.subject, email.body, email.sender, email.recipient);

      }

      const searchableText = fields.join(' ').toLowerCase();

      return keywords.every(keyword =>
        searchableText.includes(keyword)
      )

    });

  });

  // MENU FILTRI
  private activeFilters = signal({
    subject: true,
    sender: true,
    date: false
  });


  setFilter(key: keyof ReturnType<typeof this.activeFilters>, value: boolean) {
    this.activeFilters.update(f => ({ ...f, [key]: value }));
  }

  getFilters() {
    return this.activeFilters;
  }



}



/////////////////////////////////////////////////////////////COMMENTI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Una classe in Angular è un costrutto che rappresenta un'entità o un concetto all'interno dell'applicazione. 
// Può essere utilizzata per definire componenti, servizi, direttive, pipe e altro ancora. 

// Le classi in Angular sono spesso decorate con decoratori specifici (come @Component, @Injectable, ecc.) per indicare il loro ruolo e comportamento all'interno dell'applicazione. 
// Ad esempio, una classe decorata con @Component rappresenta un componente UI, mentre una classe decorata con @Injectable rappresenta un servizio che può essere iniettato in altri componenti o servizi.

// NON può avere più di un decoratore, ma può implementare più interfacce. 
// Le classi in Angular possono avere proprietà, metodi e costruttori per gestire lo stato e il comportamento dell'entità che rappresentano. 
// Possono anche estendere altre classi per ereditare funzionalità comuni. In sintesi, una classe in Angular è un costrutto fondamentale che consente di organizzare e strutturare il codice dell'applicazione in modo modulare e riutilizzabile.

// private vuol dire che la proprietà selectedFolder è accessibile solo all'interno della classe Folder e non può essere modificata direttamente da altre classi o componenti.


//////////////////////////////////////////PASSAGGI///////////////////////////////////////////////////////////

// Creo la classe Folder e la dichiaro come un servizio iniettabile utilizzando il decoratore @Injectable. 
// Questo permette ad altri componenti o servizi di utilizzare la classe Folder come dipendenza, consentendo l'accesso alle sue proprietà e metodi.


// Creo il constructor della classe Folder per iniettare il servizio EmailService. In questo modo, la classe Folder può accedere ai metodi e alle proprietà del servizio EmailService per ottenere le email e gestire le cartelle associate.
// emailService è un nome che ho scelto io, ma deve essere lo stesso nome della classe che sto importando (per non creare conflitti), in questo caso EmailService.
// Inoltre, ho aggiunto anche il servizio AuthService per poter verificare se l'utente è autenticato prima di filtrare le email in base alla cartella selezionata.


///// FOLDER SELEZIONATO
// private selectedFolder = signal<string>('Inbox');
// Creo una proprietà privata selectedFolder che è un segnale reattivo contenente una stringa. 
// Inizializzo il segnale con il valore 'Inbox', che rappresenta la cartella selezionata di default. 
// Il tipo <string> indica che il segnale conterrà solo valori di tipo stringa. 
// Questo segnale può essere utilizzato per tenere traccia della cartella attualmente selezionata e aggiornare l'interfaccia utente di conseguenza.


///// LISTA CARTELLE   
// private foldersSignal = signal<FolderInterface[]>([ ... ]);
// Creo una proprietà privata foldersSignal che è un segnale reattivo contenente un array di oggetti che seguono l'interfaccia FolderInterface. 
// Questo array rappresenta la lista delle cartelle gestite dal servizio. Ogni oggetto nell'array contiene informazioni come id, name, icon e count (opzionale) per ogni cartella.

// Il tipo <FolderInterface[]> indica che il segnale conterrà solo valori di tipo array di FolderInterface.


///// FUNZIONE PER OTTENERE LE CARTELLE
// getFolders() { return this.foldersSignal(); }
// Creo un metodo pubblico getFolders() che restituisce l'array di cartelle. 
// Questo metodo può essere chiamato da altri componenti o servizi per ottenere la lista delle cartelle. 
// Il metodo utilizza this.foldersSignal() per accedere ai dati delle cartelle, che sono gestiti come un segnale reattivo.


///// FUNZIONE PER SELEZIONARE UNA CARTELLA
// setSelectedFolder(folderId: string) { this.selectedFolder.set(folderId); }
// Creo un metodo pubblico setSelectedFolder(folderId: string) che accetta un parametro folderId di tipo stringa. 
// Questo metodo viene utilizzato per aggiornare il valore del segnale selectedFolder con il nuovo folderId passato come argomento. 
// In questo modo, quando viene chiamato questo metodo, la cartella selezionata viene aggiornata e l'interfaccia utente può reagire di conseguenza per mostrare le email corrispondenti alla nuova cartella selezionata.


///// FUNZIONE PER OTTENERE LA CARTELLA SELEZIONATA
// getSelectedFolder() { return this.selectedFolder(); }
// Creo un metodo pubblico getSelectedFolder() che restituisce il valore attuale del segnale selectedFolder. 
// Questo metodo può essere chiamato da altri componenti o servizi per ottenere la cartella attualmente selezionata. 
// Il metodo utilizza this.selectedFolder() per accedere al valore del segnale, che rappresenta la cartella selezionata in quel momento.
// Non ha parametri perché restituisce semplicemente il valore attuale del segnale selectedFolder, che è una stringa che rappresenta la cartella selezionata.



///// FILTRO EMAIL
// Creo una proprietà computed filteredEmails che restituisce un array di email filtrate in base alla cartella selezionata.
// La funzione di filtro utilizza uno switch case per verificare il valore della cartella selezionata (folder) e applica un filtro diverso alle email in base a quel valore. 
// Il filtro utilizza il metodo filter() per creare un nuovo array di email che soddisfano le condizioni specificate per ogni cartella.

// if (!this.authService.isLoggedIn()) {return [];}
// Prima di applicare il filtro, viene verificato se l'utente è autenticato utilizzando il metodo isLoggedIn() del servizio AuthService.
// Se l'utente non è autenticato, la funzione restituisce un array vuoto, impedendo l'accesso alle email filtrate. 
// Questo garantisce che solo gli utenti autenticati possano visualizzare le email filtrate in base alla cartella selezionata.

// .getEmails()() è una funzione che restituisce un array di email. Il primo set di parentesi () chiama il metodo getEmails() del servizio EmailService, mentre il secondo set di parentesi () invoca il segnale reattivo che contiene l'array di email. 
// In questo modo, otteniamo l'array di email attuale da filtrare in base alla cartella selezionata.

// CASI:
// Ad esempio, se la cartella selezionata è 'starred', il filtro restituirà solo le email che sono contrassegnate come starred e che appartengono alla cartella 'inbox'. 
// Se la cartella selezionata è 'important', il filtro restituirà solo le email che hanno l'etichetta 'important'. 
// Se la cartella selezionata è 'spam', il filtro restituirà solo le email che appartengono alla cartella 'spam', e così via per le altre cartelle. 
// Invece se la cartella selezionata è 'inbox', il filtro restituirà tutte le email che non sono contrassegnate come eliminate (is_deleted !== true), indipendentemente dalla cartella a cui appartengono.
// E nel caso predefinito (default), il filtro restituirà tutte le email che non sono contrassegnate come eliminate e che appartengono alla cartella specificata dal valore di folder.
// Trash è un caso particolare, in quanto restituisce tutte le email che sono contrassegnate come eliminate (is_deleted === true), indipendentemente dalla cartella a cui appartengono.
// Alcuni come 'work' ha due condizioni: restituisce le email che hanno l'etichetta 'work' e che non sono contrassegnate come eliminate (is_deleted !== true).

// Alcuni nomi di cartelle come 'starred', 'important', 'personal' e 'work' si basano su etichette (label) piuttosto che sulla cartella (folder) a cui appartengono le email.
// Ad esempio, le email contrassegnate come 'starred' o 'important' possono trovarsi in diverse cartelle, ma vengono filtrate in base alla loro etichetta.
// Altre cartelle come 'inbox', 'sent', 'drafts', 'spam', 'trash', 'archived' e 'snoozed' si basano sulla cartella (folder) a cui appartengono le email, indipendentemente dalle etichette che possono avere.
// Ad esempio, le email nella cartella 'inbox' possono avere diverse etichette, ma vengono filtrate in base alla loro appartenenza alla cartella 'inbox'.

// Oltre ai casi specifici, il filtro predefinito (default) restituisce tutte le email che non sono contrassegnate come eliminate (is_deleted !== true), indipendentemente dalla cartella a cui appartengono.

// Non è necessario un caso per la cartella 'trash' perché le email eliminate vengono filtrate in base alla proprietà is_deleted, quindi non è necessario spostarle in una cartella specifica.
// In sintesi, questo filtro consente di visualizzare le email in base alla cartella selezionata, applicando condizioni specifiche per ogni cartella per mostrare solo le email rilevanti per quella cartella.


// NB: Ho eliminato computed<EmailInterface[]> perché TypeScript riesce a inferire il tipo di ritorno della funzione in base al tipo di dati restituito, quindi non è necessario specificarlo esplicitamente.


// Ho creato una proprietà privata searchTerm che è un segnale reattivo contenente una stringa.
// Inizializzo il segnale con una stringa vuota, che rappresenta il termine di ricerca iniziale. 
// Il tipo <string> indica che il segnale conterrà solo valori di tipo stringa. 
// Questo segnale può essere utilizzato per tenere traccia del termine di ricerca inserito dall'utente e aggiornare l'interfaccia utente di conseguenza.

// Ho creato un metodo pubblico setSearchTerm(term: string) che accetta un parametro term di tipo stringa.
// Questo metodo viene utilizzato per aggiornare il valore del segnale searchTerm con il nuovo termine di ricerca passato come argomento. 
// In questo modo, quando viene chiamato questo metodo, il termine di ricerca viene aggiornato e l'interfaccia utente può reagire di conseguenza per filtrare le email in base al nuovo termine di ricerca.

// Ho creato un metodo pubblico getSearchTerm() che restituisce il valore attuale del segnale searchTerm.
// Questo metodo può essere chiamato da altri componenti o servizi per ottenere il termine di ricerca attualmente inserito dall'utente. 
// Il metodo utilizza this.searchTerm() per accedere al valore del segnale, che rappresenta il termine di ricerca in quel momento.
// Non ha parametri perché restituisce semplicemente il valore attuale del segnale searchTerm, che è una stringa che rappresenta il termine di ricerca inserito dall'utente.

// Integro la search dentro filteredEmails, in modo che le email filtrate siano anche filtrate in base al termine di ricerca inserito dall'utente.
// Ho creato search = this.searchTerm() che è una variabile che contiene il valore attuale del segnale searchTerm.
// Ho modificato i casi dello switch case in modo che le email filtrate siano anche filtrate in base al termine di ricerca inserito dall'utente.

// break; serve per interrompere l'esecuzione del blocco di codice all'interno di un'istruzione switch case.

// Ho aggiunto un controllo if (!search) return result; prima di filtrare le email in base al termine di ricerca.
// Questo controllo verifica se il termine di ricerca è vuoto o nullo.
// Se il termine di ricerca è vuoto o nullo, la funzione restituisce l'array di email filtrate in base alla cartella selezionata senza applicare ulteriori filtri.
// In questo modo, se l'utente non ha inserito alcun termine di ricerca, verranno visualizzate tutte le email filtrate in base alla cartella selezionata.

// Ho modificato il filtro in modo che le email perché si possano filtrare in base a più parole chiave separate da spazi.
// Perciò ho creato keywords = search.split(' ').filter(k => k.length > 0); che è una variabile che contiene un array di parole chiave separate da spazi.
// const fields = [...].join(' ').toLowerCase(); è una variabile che contiene una stringa che unisce i campi subject, body, sender e recipient di ogni email in minuscolo.
// Questo permette di cercare le parole chiave in tutti i campi dell'email, indipendentemente dal fatto che siano in maiuscolo o minuscolo.

// k è una variabile che rappresenta ogni parola chiave nell'array keywords.
// La differenza tra keywords.every() e keywords.some() è che il primo restituisce true solo se tutte le parole chiave sono presenti nel testo da cercare, 
// mentre il secondo restituisce true se almeno una delle parole chiave è presente nel testo da cercare.



/// MENU FILTRI
// Ho creato una proprietà privata activeFilters che è un segnale reattivo contenente un oggetto con le proprietà subject, sender e date.
// Inizializzo il segnale con un oggetto che ha le proprietà subject e sender impostate su true e la proprietà date impostata su false.
// false su date significa che il filtro per la data non è attivo di default, mentre true su subject e sender significa che i filtri per l'oggetto e il mittente sono attivi di default.
// Questo segnale può essere utilizzato per tenere traccia dei filtri attivi selezionati dall'utente e aggiornare l'interfaccia utente di conseguenza.

// Ho creato un metodo pubblico setFilter(key: keyof ReturnType<typeof this.activeFilters>, value: boolean) che accetta due parametri: key e value.
// Il parametro key è di tipo keyof ReturnType<typeof this.activeFilters>, che rappresenta le chiavi dell'oggetto activeFilters (subject, sender e date).
// Il parametro value è di tipo boolean, che rappresenta il valore del filtro (true o false).
// Questo metodo viene utilizzato per aggiornare il valore del filtro specificato dalla chiave key con il nuovo valore value passato come argomento.
// In questo modo, quando viene chiamato questo metodo, il filtro specificato viene aggiornato e l'interfaccia utente può reagire di conseguenza per applicare o rimuovere il filtro selezionato.

// Ho creato un metodo pubblico getFilters() che restituisce l'oggetto activeFilters.
// Questo metodo può essere chiamato da altri componenti o servizi per ottenere i filtri attivi selezionati dall'utente.
// Il metodo utilizza this.activeFilters() per accedere al valore del segnale, che rappresenta i filtri attivi in quel momento.
// Non ha parametri perché restituisce semplicemente il valore attuale del segnale activeFilters, 
// che è un oggetto con le proprietà subject, sender e date che rappresentano i filtri attivi selezionati dall'utente.

// In parole semplici, setFilter() serve per impostare un filtro specifico (subject, sender o date) su true o false, 
// mentre getFilters() serve per ottenere lo stato attuale di tutti i filtri attivi.

// Poi, nel computed filteredEmails, ho aggiunto const filters = this.activeFilters(); per ottenere i filtri attivi selezionati dall'utente 
// e applicarli al filtro delle email (cioè alle email visualizzate) in base alla cartella selezionata e al termine di ricerca inserito dall'utente. 
// In questo modo, le email filtrate saranno anche filtrate in base ai filtri attivi selezionati dall'utente.

// Successivamente, ho modificato il filtro con una serie di condizioni che verificano se i filtri attivi sono impostati su true o false e aggiungono i campi corrispondenti all'array fields.
// In questo modo, se un filtro è attivo (true), il campo corrispondente viene aggiunto all'array fields e verrà considerato nella ricerca delle parole chiave.

// const searchableText = fields.join(' ').toLowerCase(); significa che tutti i campi selezionati dai filtri attivi vengono uniti in una singola stringa e convertiti in minuscolo,
// in modo da poter cercare le parole chiave in tutti i campi selezionati dai filtri attivi, indipendentemente dal fatto che siano in maiuscolo o minuscolo.

// Infine, ho modificato il filtro con keywords.every() per verificare se tutte le parole chiave sono presenti nel testo da cercare (searchableText) e restituire true solo se tutte le parole chiave sono presenti.
// In questo modo, le email visualizzate saranno filtrate in base alla cartella selezionata, al termine di ricerca inserito dall'utente e ai filtri attivi selezionati dall'utente.

//Filtro Date
// Per quanto riguarda il filtro per la data, ho aggiunto un controllo if (filters.date) che verifica se il filtro per la data è attivo (true).
// Se il filtro per la data è attivo, viene creato un oggetto Date a partire dal timestamp dell'email e vengono estratti i vari componenti della data (anno, mese, giorno, ecc.).
// Questi componenti vengono poi aggiunti all'array fields in modo che possano essere considerati nella ricerca delle parole chiave.
// In questo modo, se il filtro per la data è attivo, le email visualizzate saranno filtrate anche in base alla data di invio o ricezione dell'email.

// const date = typeof email.timestamp === 'string' ? new Date(email.timestamp) : email.timestamp; significa che se il timestamp dell'email è una stringa, viene creato un oggetto Date a partire da quella stringa, 
// altrimenti viene utilizzato direttamente l'oggetto Date presente nel timestamp. In parole semplici, questa riga di codice serve a garantire che il timestamp dell'email sia sempre un oggetto Date, 
// indipendentemente dal formato in cui è stato salvato.

// const fullDate = date.toISOString(); significa che viene creato un formato di data completo (YYYY-MM-DD) a partire dall'oggetto Date. 

// const year = date.getFullYear().toString(); significa che viene estratto l'anno dall'oggetto Date e convertito in stringa.

// const month = (date.getMonth() + 1).toString().padStart(2, '0'); significa che viene estratto il mese dall'oggetto Date, aggiunto 1 (perché i mesi partono da 0) e convertito in stringa con due cifre (es. 01, 02, ..., 12).

// const monthRaw = (date.getMonth() + 1).toString(); significa che viene estratto il mese dall'oggetto Date, aggiunto 1 e convertito in stringa senza padding (es. 1, 2, ..., 12).

// const day = date.getDate().toString().padStart(2, '0'); significa che viene estratto il giorno dall'oggetto Date e convertito in stringa con due cifre (es. 01, 02, ..., 31).

// const dayRaw = date.getDate().toString(); significa che viene estratto il giorno dall'oggetto Date e convertito in stringa senza padding (es. 1, 2, ..., 31).

// const monthName = date.toLocaleString('en', { month: 'long' }).toLowerCase(); significa che viene estratto il nome del mese in inglese dall'oggetto Date e convertito in minuscolo (es. january, february, ..., december).

// const monthNameIT = date.toLocaleString('it', { month: 'long' }).toLowerCase(); significa che viene estratto il nome del mese in italiano dall'oggetto Date e convertito in minuscolo (es. gennaio, febbraio, ..., dicembre).

// Infine, tutti questi componenti della data vengono uniti in una singola stringa e aggiunti all'array fields in modo che possano essere considerati nella ricerca delle parole chiave.