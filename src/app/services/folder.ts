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


  filteredEmails = computed(() => {

    if (!this.authService.isLoggedIn()) {
      return [];
    }

    const folder = this.selectedFolder();
    const emails = this.emailService.getEmails()();

    switch (folder) {

      case 'starred':
        return emails.filter(e => e.starred && !e.is_deleted);

      case 'important':
        return emails.filter(e => e.label === 'Important' && !e.is_deleted);

      case 'spam':
        return emails.filter(e => e.folder === 'spam');

      case 'trash':
        return emails.filter(e => e.is_deleted === true);

      case 'drafts':
        return emails.filter(e => e.folder === 'drafts');

      case 'sent':
        return emails.filter(e => e.folder === 'sent');

      case 'personal':
        return emails.filter(e => e.label === 'Personal' && !e.is_deleted);

      case 'work':
        return emails.filter(e => e.label === 'Work' && !e.is_deleted);

      case 'archived':
        return emails.filter(e => e.folder === 'archived');

      case 'snoozed':
        return emails.filter(e => e.folder === 'snoozed');

      case 'inbox':
        return emails.filter(e => !e.is_deleted);

      default: return emails.filter(e => !e.is_deleted);
    }
  });
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


//NB: Ho eliminato computed<EmailInterface[]> perché TypeScript riesce a inferire il tipo di ritorno della funzione in base al tipo di dati restituito, quindi non è necessario specificarlo esplicitamente.