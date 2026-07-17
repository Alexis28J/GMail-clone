import { Injectable, signal } from '@angular/core';
import { EmailInterface } from '../interface/email-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    this.loadEmails(); // Carica le email dal mockapi.io all'avvio del servizio
  };


  ///// API URL
  private apiUrl =
    'https://6a477fc3abfcbaade1188ff8.mockapi.io/api/gclone/emails';


  ///// SIGNAL CHE CONTERRA' LE EMAIL
  private emailsSignal = signal<EmailInterface[]>([]);


  ///// PRENDERE LE EMAIL
  getEmails() {
    return this.emailsSignal;
  }


  ///// CARICA EMAIL DAL MOCKAPI.IO
  loading = signal(false);

  loadEmails() {
    this.loading.set(true);

    this.http.get<EmailInterface[]>(this.apiUrl)
      .subscribe({
        next: emails => {
          const normalizedEmails = emails.map(email => ({
            ...email,
            timestamp:
              typeof email.timestamp === 'number'
                ? email.timestamp * 1000
                : email.timestamp
          }))

          this.emailsSignal.set(normalizedEmails);

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
          this.loading.set(false);
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


  ///// SELEZIONA / DESELEZIONA EMAIL PER ID (array di ids) (per selezionare più email contemporaneamente)
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
  }


  ///// REFACTORING: 
  // deleteSelectedEmails()  (ELIMINA LE EMAIL SELEZIONATE)
  // restoreSelectedEmails() (RIPRISTINA LE EMAIL SELEZIONATE)
  // archiveSelectedEmails() (ARCHIVIA LE EMAIL SELEZIONATE) 

  ///// FUNZIONE PRIVATA CHE AGGIORNA LE EMAIL SELEZIONATE CON LE MODIFICHE PASSATE COME PARAMETRO
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

  ///// FUNZIONI PUBBLICHE CHE CHIAMANO LA FUNZIONE PRIVATA updateSelectedEmails() CON LE MODIFICHE CORRISPONDENTI:

  ///// ELIMINA LE EMAIL SELEZIONATE
  deleteSelectedEmails() {
    this.updateSelectedEmails({
      is_deleted: true
    });
  }

  ///// RIPRISTINA LE EMAIL SELEZIONATE
  restoreSelectedEmails() {
    this.updateSelectedEmails({
      is_deleted: false
    });
  }

  ///// SPOSTARE LE EMAIL SELEZIONATE
  moveSelectedEmails(folder: string) {
    this.updateSelectedEmails({
      folder,
      is_deleted: false
    });
  }

  ///// ARCHIVIA LE EMAIL SELEZIONATE
  archiveSelectedEmails() {
    this.moveSelectedEmails('archived');
  }


  ///////////////////////////////////REPLY E FORWARD EMAIL///////////////////////////////////////////////

  ///// SIGNAL CHE CONTERRA' LA BOZZA DI EMAIL (REPLY O FORWARD)
  composeDraft = signal<Partial<EmailInterface> | null>(null);


  ///// CREARE RISPOSTA EMAIL (REPLY) A PARTIRE DALLA EMAIL ORIGINALE
  setReplyEmail(originalEmail: EmailInterface) {

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


  ///// INOLTRARE EMAIL (FORWARD) A PARTIRE DALLA EMAIL ORIGINALE
  setForwardEmail(originalEmail: EmailInterface) {

    const date = new Date(originalEmail.timestamp);

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
    });
  }


  ///// PULIZIA SIGNAL composeDraft (evita residui di dati)
  clearComposeDraft() {
    this.composeDraft.set(null);
  }

}
