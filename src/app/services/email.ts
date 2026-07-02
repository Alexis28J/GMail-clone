import { Injectable, signal } from '@angular/core';
import { EmailInterface } from '../interface/email-interface';
import { effect } from '@angular/core';
// import { AuthService } from './auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  //  private emailsSignal = signal<EmailInterface[]>(

  //  JSON.parse(localStorage.getItem('emails') || 'null') ||

  stored = JSON.parse(localStorage.getItem('emails') || '[]');

  private emailsSignal = signal<EmailInterface[]>(
    this.stored.length ? this.stored :
      [
        {
          id: 1,
          sender: 'Carlo Bonamico',
          recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
          subject: 'Meeting Reminder',
          body: 'Don\'t forget about our meeting tomorrow at 9 AM. Please be on time.',
          timestamp: new Date('2026-06-14T09:00:00'),
          starred: false,
          label: 'Work',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 2,
          sender: 'Lione Melania',
          recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
          subject: 'Medical Appointment',
          body: 'Your medical appointment is scheduled for June 19 at 15:50 PM. Please arrive 10 minutes early.',
          timestamp: new Date('2026-06-15T08:50:00'),
          starred: true,
          label: 'Personal',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 3,
          sender: 'HR Department',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Document Submission',
          body: 'Please submit the required documents by June 10th. Failure to do so may result in delays.',
          timestamp: new Date('2026-06-10T11:15:00'),
          starred: false,
          label: 'Important',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 4,
          sender: 'Github Support',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Account Verification',
          body: 'Please verify your account by clicking the link in the email. This is necessary to access all features.',
          timestamp: new Date('2026-06-04T14:30:00'),
          starred: true,
          label: 'Work',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 5,
          sender: 'Comune di Genova',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Citizen Service Update',
          body: 'You have a new citizen service update from Comune di Genova. Please review it at your earliest convenience.',
          timestamp: new Date('2026-06-05T10:45:00'),
          starred: false,
          label: 'Personal',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 6,
          sender: 'Amazon',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Order Confirmation',
          body: 'Your order has been confirmed and will be shipped soon. Thank you for shopping with us!',
          timestamp: new Date('2026-06-06T16:20:00'),
          starred: true,
          label: 'Important',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 7,
          sender: 'eBay',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Object Sold',
          body: 'Your item has been sold on eBay. Please proceed with the shipping process.',
          timestamp: new Date('2026-06-07T12:00:00'),
          starred: false,
          label: 'Work',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 8,
          sender: 'Prime Video',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'Subscription Renewal',
          body: 'Your subscription has been renewed successfully. Enjoy your streaming experience!',
          timestamp: new Date('2026-06-08T09:00:00'),
          starred: true,
          label: 'Personal',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 9,
          sender: 'Microsoft',
          recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
          subject: 'Software Update',
          body: 'A new software update is available for your device. Please install it at your earliest convenience.',
          timestamp: new Date('2026-06-09T14:00:00'),
          starred: false,
          label: 'Important',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
        {
          id: 10,
          sender: 'Netflix',
          recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
          subject: 'New Movie Release',
          body: 'A new movie has been released on Netflix. Check it out!',
          timestamp: new Date('2026-06-10T18:30:00'),
          starred: true,
          label: 'Personal',
          folder: 'inbox',
          selected: false,
          is_deleted: false,
        },
      ]
  );


  //// PRENDERE LE EMAIL
  getEmails() {
    return this.emailsSignal;
  }


  /// ELIMINARE LE EMAIL SELEZIONATE
  deleteSelectedEmails() {

    this.emailsSignal.update(emails =>
      emails.map(email => email.selected ?
        { ...email, is_deleted: true, selected: false } : email
      )
    );
  }

  /// CONSTRUCTOR EFFETTO
  //constructor( private authService: AuthService) {
  constructor(private snackBar: MatSnackBar) {
    effect(() => {

      // if(!this.authService.isLoggedIn()){
      //    this.emailsSignal.set([]);
      // }

      localStorage.setItem('emails', JSON.stringify(this.emailsSignal()));
    });
  };

  /// RIPRISTINARE LE EMAIL SELEZIONATE
  restoreSelectedEmails() {
    this.emailsSignal.update(emails =>
      emails.map(email =>
        email.selected ?
          { ...email, is_deleted: false, selected: false }
          : email)
    );
  }


  /// INVIARE UNA NUOVA EMAIL
  sendEmail(email: Partial<EmailInterface>) {

    const newEmail: EmailInterface = {
      id: Date.now(),
      sender: email.sender || 'Me',
      recipient: email.recipient || '',
      subject: email.subject || '',
      body: email.body || '',
      timestamp: new Date(),
      starred: false,
      label: 'Sent',
      folder: 'sent',
      selected: false,
      is_deleted: false,
    };

    this.emailsSignal.update(emails => [newEmail, ...emails]);

  }

  saveDraft(email: Partial<EmailInterface>){

    const newDraft: EmailInterface = {
      id: Date.now(),
      sender: email.sender || 'Me',
      recipient: email.recipient || '',
      subject: email.subject || '',
      body: email.body || '',
      timestamp: new Date(),
      starred: false,
      label: 'Draft',
      folder: 'drafts',
      selected: false,
      is_deleted: false
    };

    this.emailsSignal.update(emails => [newDraft, ...emails]);

  }

}


///////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////


//import { Injectable, signal } from '@angular/core';
//Importiamo il decoratore Injectable da Angular, che ci permette di dichiarare la classe come un servizio iniettabile in altri componenti o servizi.


//@Injectable({ providedIn: 'root'})
//Il decoratore Injectable indica che questa classe può essere iniettata come dipendenza in altri componenti o servizi. 
//L'opzione providedIn: 'root' significa che il servizio sarà disponibile a livello globale nell'applicazione.


//export class EmailService { ... }
//Dichiariamo la classe EmailService, che rappresenta un servizio che gestisce le email. Questa classe conterrà i dati delle email e i metodi per accedervi.
//export indica che questa classe può essere importata e utilizzata in altri file del progetto.

// private emailsSignal = signal<EmailInterface[]>([ ... ]);
// Definiamo una proprietà privata emailsSignal che è un segnale reattivo contenente un array di oggetti che seguono l'interfaccia EmailInterface. 
// Questo array rappresenta la lista delle email gestite dal servizio. Ogni oggetto nell'array contiene informazioni come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.

// JSON.parse(localStorage.getItem('emails') || 'null') || significa che stiamo cercando di recuperare le email salvate nel localStorage (memoria locale) del browser. 
// Se non ci sono email salvate, utilizziamo un array predefinito di email come fallback (valore di riserva). 
// Questo ci permette di avere un set iniziale di email anche se l'utente non ha ancora interagito con l'applicazione.

// Ho commentato la proprietà emailsSignal e ho aggiunto la proprietà stored per recuperare le email salvate nel localStorage.
// La proprietà stored contiene le email salvate nel localStorage o un array vuoto se non ci sono email salvate.
// Ho modificato la proprietà emailsSignal per inizializzarla con le email salvate nel localStorage se presenti, altrimenti utilizza l'array predefinito di email.    


//// PRENDERE LE EMAIL
// getEmails() {
// return this.emailsSignal();
// }
//Definiamo un metodo pubblico getEmails() che restituisce l'array di email. Questo metodo può essere chiamato da altri componenti o servizi per ottenere la lista delle email.
//Il metodo utilizza this.emailsSignal() per accedere ai dati delle email, che sono gestiti come un segnale reattivo.


//// ELIMINARE LE EMAIL SELEZIONATE
// deleteSelectedEmails() { ... }
// Definiamo un metodo pubblico deleteSelectedEmails() che viene chiamato quando l'utente vuole eliminare le email selezionate.
// All'interno di questo metodo, utilizziamo this.emailsSignal.update() per aggiornare lo stato del segnale reattivo. 
// La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui le email selezionate (email.selected) vengono modificate per avere is_deleted impostato su true 
// e selected impostato su false, mentre le altre email rimangono invariate.

////folder trash non è necessario perché le email eliminate vengono filtrate in base alla proprietà is_deleted, quindi non è necessario spostarle in una cartella specifica.

// In sintesi, questo servizio gestisce un elenco di email e fornisce metodi per accedere a queste email e per spostare le email selezionate nella cartella "trash".

// Se l'email è selezionata, creo un nuovo oggetto email con la cartella impostata su "trash", selected impostato su false e is_deleted impostato su true.
// ... email : i puntini rappresentano un array di oggetti email, ognuno con proprietà come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.

// La differenza tra update e set è che update permette di modificare solo alcune proprietà dell'oggetto, mentre set sostituisce completamente l'oggetto con uno nuovo. In questo caso, utilizziamo update per modificare solo le email selezionate senza perdere le altre email nell'array.
// La differenza tra update e computed è che update permette di modificare lo stato del segnale reattivo, mentre computed crea un nuovo segnale basato su uno o più segnali esistenti. In questo caso, utilizziamo update per modificare lo stato delle email senza creare un nuovo segnale.


//// CONSTRUCTOR EFFETTO
// constructor() { ... } 
// Ho aggiunto un costruttore alla classe EmailService che contiene l'effetto per salvare le email nel localStorage. Il costruttore viene eseguito quando il servizio viene istanziato (es. all'avvio dell'applicazione), garantendo che l'effetto sia attivo fin dall'inizio.
// L'effetto salva le email nel localStorage ogni volta che lo stato del segnale emailsSignal cambia. Questo garantisce che le modifiche alle email vengano persistite tra le sessioni dell'utente.
// effect() è una funzione che permette di eseguire del codice ogni volta che uno o più segnali reattivi cambiano. In questo caso, stiamo salvando le email nel localStorage ogni volta che emailsSignal cambia.
// In questo modo, ogni volta che lo stato delle email cambia, le modifiche vengono salvate automaticamente nel localStorage, consentendo all'utente di mantenere le email anche dopo aver chiuso e riaperto l'applicazione.

// Ho commentato la parte che verifica se l'utente è autenticato prima di salvare le email nel localStorage, poiché non è necessario per il funzionamento del servizio. Inoltre, il servizio EmailService non ha accesso diretto al servizio AuthService, quindi non può verificare lo stato di autenticazione dell'utente.
// Tuttavia, se si desidera implementare questa funzionalità in futuro, è possibile decommentare quella parte e utilizzare il servizio AuthService per verificare lo stato di autenticazione dell'utente.
// Ho aggiunto il servizio MatSnackBar al costruttore per mostrare un messaggio di conferma quando le email vengono ripristinate. Questo fornisce un feedback visivo all'utente, migliorando l'esperienza utente.


// RIPRISTINARE LE EMAIL SELEZIONATE
// restoreSelectedEmails() { ... }
// Definiamo un metodo pubblico restoreSelectedEmails() che viene chiamato quando l'utente vuole ripristinare le email selezionate dalla cartella "trash".
// All'interno di questo metodo, utilizziamo this.emailsSignal.update() per aggiornare lo stato del segnale reattivo. 
// La funzione di aggiornamento prende l'array corrente di email e restituisce un nuovo array in cui le email selezionate (email.selected) vengono modificate per avere is_deleted impostato su false 
// e selected impostato su false, mentre le altre email rimangono invariate.


// INVIARE UNA NUOVA EMAIL
// sendEmail(email: Partial<EmailInterface>) { ... }
// Definiamo un metodo pubblico sendEmail() che viene chiamato quando l'utente vuole inviare una nuova email.
// Il metodo accetta un oggetto email di tipo Partial<EmailInterface>, il che significa che può contenere solo alcune delle proprietà definite nell'interfaccia EmailInterface.
// All'interno del metodo, creiamo un nuovo oggetto newEmail di tipo EmailInterface, impostando le proprietà necessarie come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.
// L'id viene generato utilizzando Date.now(), che restituisce il numero di millisecondi trascorsi dal 1 gennaio 1970. Questo garantisce un identificatore unico per ogni email inviata.
// Le altre proprietà vengono impostate in base ai valori forniti nell'oggetto email passato al metodo o a valori predefiniti se non sono presenti.


// SALVARE UNA BOZZA DI EMAIL
// saveDraft(email: Partial<EmailInterface>) { ... }
// Definiamo un metodo pubblico saveDraft() che viene chiamato quando l'utente vuole salvare una bozza di email.
// Il metodo accetta un oggetto email di tipo Partial<EmailInterface>, simile al metodo sendEmail().
// All'interno del metodo, creiamo un nuovo oggetto newDraft di tipo EmailInterface, impostando le proprietà necessarie come id, sender, recipient, subject, body, timestamp, starred, label, folder, selected e is_deleted.
// L'id viene generato utilizzando Date.now(), garantendo un identificatore unico per ogni bozza salvata.
// Le altre proprietà vengono impostate in base ai valori forniti nell'oggetto email passato al metodo o a valori predefiniti se non sono presenti. 
// La cartella viene impostata su "drafts" e la label su "Draft" per indicare che si tratta di una bozza.