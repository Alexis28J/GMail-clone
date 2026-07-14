import { Injectable, signal } from '@angular/core';
import { EmailInterface } from '../interface/email-interface';
// import { effect } from '@angular/core';
// import { AuthService } from './auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  //// API URL
  private apiUrl =
    'https://6a477fc3abfcbaade1188ff8.mockapi.io/api/gclone/emails';


  private emailsSignal = signal<EmailInterface[]>([]);


  //// PRENDERE LE EMAIL
  getEmails() {
    return this.emailsSignal;
  }


  //// CONSTRUCTOR EFFETTO
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    this.loadEmails(); // Carica le email dal mockapi.io all'avvio del servizio
  };


  ///// CARICA EMAIL DAL MOCKAPI.IO
  loading = signal(false);  // serve per mostrare un indicatore di caricamento durante il recupero delle email
  // false perché all'avvio non stiamo caricando le email, ma le carichiamo subito dopo con loadEmails()

  loadEmails() {

    this.loading.set(true);

    this.http.get<EmailInterface[]>(this.apiUrl)
      .subscribe({
        next: emails => {
          this.emailsSignal.set(emails);

          this.snackBar.open(
            'Updated emails',
            '',
            { duration: 3000, panelClass: ['custom-snackbar'] }
          );
        },
        complete: () => {
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);  //ho aggiunto questo per assicurarmi che l'indicatore di caricamento venga nascosto anche in caso di errore
          this.snackBar.open(
            'Error during refresh',
            '',
            { duration: 3000, panelClass: ['custom-snackbar'] }
          );
        }
      });
  }


  ///// Versione aggiornata "INVIARE UNA NUOVA EMAIL" (con richiesta HTTP POST a mockapi.io)
  sendEmail(email: Partial<EmailInterface>) {

    const newEmail = {
      sender: email.sender || 'Me',
      recipient: email.recipient || '',
      subject: email.subject || '',
      body: email.body || '',
      timestamp: new Date().toISOString(),
      starred: false,
      label: 'Sent',
      folder: 'sent',
      selected: false,
      is_deleted: false
    };
    this.http.post<EmailInterface>(
      this.apiUrl,
      newEmail
    ).subscribe(createdEmail => {
      this.emailsSignal.update(emails => [
        createdEmail,
        ...emails
      ]);
    });

  }


  ///// Versione aggiornata "SALVARE UNA BOZZA DI EMAIL" (con richiesta HTTP POST a mockapi.io)
  saveDraft(email: Partial<EmailInterface>) {
    this.http.post<EmailInterface>(this.apiUrl, {
      sender: email.sender || 'Me',
      recipient: email.recipient || '',
      subject: email.subject || '',
      body: email.body || '',
      timestamp: new Date().toISOString(),
      starred: false,
      label: 'Drafts',
      folder: 'drafts',
      selected: false,
      is_deleted: false
    })
      .subscribe(createdDraft => {
        this.emailsSignal.update(emails => [
          createdDraft,
          ...emails
        ]);
      });
  }


  ///// SELEZIONA / DESELEZIONA EMAIL PER ID (array di ids)
  setSelectedEmails(ids: string[], selected: boolean) {
    this.emailsSignal.update(emails =>
      emails.map(email =>
        ids.includes(email.id) ?
          { ...email, selected }
          : email
      )
    );
  }


  ///// CONTA EMAIL SELEZIONATE
  getSelectedEmailsCount(): number {
    return this.emailsSignal().filter(e => e.selected).length;
  }


  ///// PULIZIA SELEZIONE EMAIL
  clearSelection() {
    this.emailsSignal.update(emails =>
      emails.map(email => ({
        ...email,
        selected: false
      }))
    )
  }


  ///// SELEZIONA / DESELEZIONA EMAIL PER ID (singolo emailId)
  toggleEmailSelection(emailId: string, selected: boolean) {

    this.emailsSignal.update(emails =>
      emails.map(email =>
        email.id === emailId.toString()
          ? { ...email, selected }
          : email
      )
    );

  }


  ///// TOGGLE STAR EMAIL
  toggleStar(email: EmailInterface) {

    const starred = !email.starred;

    // il signal viene aggiornato localmente
    this.emailsSignal.update(emails =>
      emails.map(e =>
        e.id === email.id
          ? { ...e, starred }
          : e
      )
    );

    // si aggiorna anche il mockapi.io con una richiesta HTTP PUT
    this.http.put(
      `${this.apiUrl}/${email.id}`,
      {
        ...email,
        starred
      }
    ).subscribe();
    // subcribe() vuoto perché non ci interessa fare nulla dopo la risposta, 
    // ma è necessario per eseguire la richiesta HTTP
  }


  ///// REFACTORING: 
  // deleteSelectedEmails()  (ELIMINA LE EMAIL SELEZIONATE)
  // restoreSelectedEmails() (RIPRISTINA LE EMAIL SELEZIONATE)
  // archiveSelectedEmails() (ARCHIVIA LE EMAIL SELEZIONATE) 

  private updateSelectedEmails(changes: Partial<EmailInterface>) {

    const selectedEmails = this.emailsSignal().filter(e => e.selected);

    selectedEmails.forEach(email => {
      this.http.put(
        `${this.apiUrl}/${email.id}`,
        {
          ...email,
          ...changes,
          selected: false
        }
      ).subscribe(() => {
        this.emailsSignal.update(emails =>
          emails.map(e =>
            e.id === email.id
              ? {
                ...e,
                ...changes,
                selected: false
              } : e
          )
        );
      });
    });
  }

  deleteSelectedEmails() {
    this.updateSelectedEmails({
      is_deleted: true
    });
  }

  restoreSelectedEmails() {
    this.updateSelectedEmails({
      is_deleted: false
    });
  }

  archiveSelectedEmails() {
    this.moveSelectedEmails('archived');
  }


  ///// SPOSTARE LE EMAIL SELEZIONATE
  moveSelectedEmails(folder: string) {
    this.updateSelectedEmails({
      folder,
      is_deleted: false
    });
  }


  ///// CREARE RISPOSTA EMAIL (REPLY) A PARTIRE DALLA EMAIL ORIGINALE

  // Per primo creo un signal per la bozza di risposta, che può essere un oggetto parziale di EmailInterface o null
  // Questo signal conterrà i dati da precompilare nel dialog. replyDraft è un signal che contiene la bozza di risposta corrente, se presente, altrimenti null
  // replyDraft = signal<Partial<EmailInterface> | null>(null);
  // Partial<EmailInterface> perché non tutte le proprietà sono necessarie per la bozza di risposta
  //| null perché inizialmente non c'è nessuna bozza di risposta
  //(null) indica che non c'è nessuna bozza di risposta attiva


  setReplyEmail(originalEmail: EmailInterface) {   //Funzione per impostare la bozza di risposta a partire dall'email originale

    //this.replyDraft.set({
    this.composeDraft.set({
      recipient: originalEmail.sender,

      subject: originalEmail.subject.startsWith('Re: ')
        ? originalEmail.subject
        : `Re: ${originalEmail.subject}`,

      body: `
      ---------------------------------------------------------------\n
      From: ${originalEmail.sender}
      
      ${originalEmail.body}
      `
    });
  }

  // Pulire il signal
  // Altrimenti succede un problema. 
  // Reply a una mail. Chiudo il dialog. Nuova Compose. Mi ritrovo ancora i dati della reply.
  //clearReplyDraft() {
    //this.replyDraft.set(null);
  //} // ngOnDestroy() del componente ComposeDialog chiama questa funzione per pulire il signal replyDraft quando il dialog viene chiuso, 
  // così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta precedente


  ////////////////////INOLTRARE EMAIL (FORWARD) A PARTIRE DALLA EMAIL ORIGINALE

  // Aggiungo un signal per il forward
  //forwardDraft = signal<Partial<EmailInterface> | null>(null);

  setFordwardEmail(originalEmail: EmailInterface) {

    const date = new Date(originalEmail.timestamp); //timestamp viene visualizzato in un formato leggibile nel dialog, ma viene salvato come stringa ISO nel database. 
    
    //this.forwardDraft.set({
    this.composeDraft.set({

      recipient: '',

      subject: originalEmail.subject.startsWith('Fwd: ')
        ? originalEmail.subject
        : `Fwd: ${originalEmail.subject}`,

      body: ` 
      ---------------------------------------------------------------\n
      Forwarded message 

      From: ${originalEmail.sender}\n
      To: ${originalEmail.recipient}\n
      Date: ${date.toLocaleString()}\n
      Subject: ${originalEmail.subject}\n

      ${originalEmail.body}
      `
    }); // \n va a capo nel dialog ma non nel database, perché il database salva la stringa così com'è, con \n come carattere speciale.
  } 

  //clearForwardDraft() {
    //this.forwardDraft.set(null);
  //}

  //REFACTORING: 1 solo signal per la bozza di email, che può essere una bozza di risposta o una bozza di inoltro.
  // In questo modo non ho bisogno di due signals separati, ma posso usare un solo signal per gestire entrambe le situazioni.
  // Questo semplifica il codice e riduce la duplicazione.
  
  composeDraft = signal<Partial<EmailInterface> | null>(null);

  clearComposeDraft() {
    this.composeDraft.set(null);
  }

}




