import { computed, Injectable, Service, signal } from '@angular/core';
import { FolderInterface } from '../interface/folder-interface';
import { EmailService } from '../services/email'
import { EmailInterface } from '../interface/email-interface';

@Injectable({
    providedIn: 'root'
})

export class Folder {

    constructor(private emailService: EmailService) { }

    private selectedFolder = signal<string>('Inbox');

    private foldersSignal = signal<FolderInterface[]>(
        [
            { id: 'inbox', name: 'Inbox', icon: 'inbox' },
            { id: 'starred', name: 'Special', icon: 'star' },
            { id: 'sent', name: 'Sent', icon: 'send' },
            { id: 'drafts', name: 'Drafts', icon: 'drafts' },
            { id: 'spam', name: 'Spam', icon: 'report' },
            { id: 'important', name: 'Important', icon: 'label_important' },
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

    filteredEmails = computed<EmailInterface[]>(() => {

        const folder = this.selectedFolder();

        const emails = this.emailService.getEmails()();

        switch (folder) {
            case 'starred': return emails.filter(e => e.starred);

            case 'important': return emails.filter(e => e.label === 'Important');

            case 'spam': return emails.filter(e => e.subject.toLowerCase().includes('spam'));

            case 'trash': return [];

            case 'drafts': return [];

            case 'sent': return emails.filter(e => e.sender.includes('Jordy'));

            case 'inbox': default: return emails;
        }
    }
)

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
// filteredEmails = computed<EmailInterface[]>(() => { ... });
// Creo una proprietà pubblica filteredEmails che è un segnale computato contenente un array di oggetti che seguono l'interfaccia EmailInterface. 
// Questo segnale computato viene utilizzato per filtrare le email in base alla cartella selezionata. 
// Il tipo <EmailInterface[]> indica che il segnale conterrà solo valori di tipo array di EmailInterface.

// La funzione passata a computed(), cioè la funzione di callback, viene eseguita ogni volta che il valore del segnale selectedFolder cambia, e restituisce un nuovo array di email filtrate in base alla cartella selezionata. 
// In questo modo, la proprietà filteredEmails si aggiorna automaticamente quando la cartella selezionata cambia, consentendo all'interfaccia utente di visualizzare le email corrispondenti alla cartella selezionata.

// const emails = this.emailService.getEmails()();
// All'interno della funzione di callback del segnale computato, utilizzo this.emailService.getEmails()() per ottenere l'array di email dal servizio EmailService. 
// Il primo set di parentesi () chiama il metodo getEmails() del servizio, che restituisce un segnale contenente l'array di email. 
// Il secondo set di parentesi () serve a ottenere il valore attuale del segnale, cioè l'array di email, in modo da poterlo filtrare in base alla cartella selezionata. 
// In questo modo, posso accedere alle email e applicare i filtri necessari per restituire solo le email corrispondenti alla cartella selezionata.

// switch (folder) { ... }
// Utilizzo un'istruzione switch per determinare quale filtro applicare alle email in base al valore della cartella selezionata (folder). 
// Ogni caso del switch corrisponde a una cartella specifica e applica un filtro diverso all'array di email.
// Ad esempio, se la cartella selezionata è 'starred', restituisco solo le email che hanno la proprietà starred impostata su true.
// e.starred è una proprietà booleana dell'interfaccia EmailInterface che indica se un'email è stata contrassegnata come speciale o importante dall'utente.