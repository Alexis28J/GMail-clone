import { Injectable, signal } from '@angular/core';
import { EmailInterface } from '../interface/email-interface';
// import { effect } from '@angular/core';
// import { AuthService } from './auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { email } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  //  private emailsSignal = signal<EmailInterface[]>(

  //  JSON.parse(localStorage.getItem('emails') || 'null') ||


  // stored = JSON.parse(localStorage.getItem('emails') || '[]')
  //   .map((email: EmailInterface) => ({
  //     ...email,
  //     selected: false
  //   }));

  // private emailsSignal = signal<EmailInterface[]>(
  //   this.stored.length ? this.stored :
  //     [
  //       {
  //         id: 1,
  //         sender: 'Carlo Bonamico',
  //         recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
  //         subject: 'Meeting Reminder',
  //         body: 'Don\'t forget about our meeting tomorrow at 9 AM. Please be on time.',
  //         timestamp: new Date('2026-06-14T09:00:00'),
  //         starred: false,
  //         label: 'Work',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 2,
  //         sender: 'Lione Melania',
  //         recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
  //         subject: 'Medical Appointment',
  //         body: 'Your medical appointment is scheduled for June 19 at 15:50 PM. Please arrive 10 minutes early.',
  //         timestamp: new Date('2026-06-15T08:50:00'),
  //         starred: true,
  //         label: 'Work',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 3,
  //         sender: 'HR Department',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Document Submission',
  //         body: 'Please submit the required documents by June 10th. Failure to do so may result in delays.',
  //         timestamp: new Date('2026-06-10T11:15:00'),
  //         starred: false,
  //         label: 'Important',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 4,
  //         sender: 'Github Support',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Account Verification',
  //         body: 'Please verify your account by clicking the link in the email. This is necessary to access all features.',
  //         timestamp: new Date('2026-06-04T14:30:00'),
  //         starred: false,
  //         label: 'Personal',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 5,
  //         sender: 'Comune di Genova',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Citizen Service Update',
  //         body: 'You have a new citizen service update from Comune di Genova. Please review it at your earliest convenience.',
  //         timestamp: new Date('2026-06-05T10:45:00'),
  //         starred: false,
  //         label: 'Personal',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 6,
  //         sender: 'Amazon',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Order Confirmation',
  //         body: 'Your order has been confirmed and will be shipped soon. Thank you for shopping with us!',
  //         timestamp: new Date('2026-06-06T16:20:00'),
  //         starred: true,
  //         label: 'Important',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 7,
  //         sender: 'eBay',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Object Sold',
  //         body: 'Your item has been sold on eBay. Please proceed with the shipping process.',
  //         timestamp: new Date('2026-06-07T12:00:00'),
  //         starred: false,
  //         label: 'Work',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 8,
  //         sender: 'Prime Video',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'Subscription Renewal',
  //         body: 'Your subscription has been renewed successfully. Enjoy your streaming experience!',
  //         timestamp: new Date('2026-06-08T09:00:00'),
  //         starred: true,
  //         label: 'Personal',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 9,
  //         sender: 'Microsoft',
  //         recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
  //         subject: 'Software Update',
  //         body: 'A new software update is available for your device. Please install it at your earliest convenience.',
  //         timestamp: new Date('2026-06-09T14:00:00'),
  //         starred: false,
  //         label: 'Important',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //       {
  //         id: 10,
  //         sender: 'Netflix',
  //         recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
  //         subject: 'New Movie Release',
  //         body: 'A new movie has been released on Netflix. Check it out!',
  //         timestamp: new Date('2026-06-10T18:30:00'),
  //         starred: true,
  //         label: 'Personal',
  //         folder: 'inbox',
  //         selected: false,
  //         is_deleted: false,
  //       },
  //     ]
  // );


  /// API URL
  private apiUrl =
    'https://6a477fc3abfcbaade1188ff8.mockapi.io/api/gclone/emails';


  private emailsSignal = signal<EmailInterface[]>([]);


  //// PRENDERE LE EMAIL
  getEmails() {
    return this.emailsSignal;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// ELIMINARE LE EMAIL SELEZIONATE
  // deleteSelectedEmails() {

  //   this.emailsSignal.update(emails =>
  //     emails.map(email => email.selected ?
  //       { ...email, is_deleted: true, selected: false } : email
  //     )
  //   );
  // }

  // Versione aggiornata (con richiesta HTTP PUT a mockapi.io)
  deleteSelectedEmails() {

    const selectedEmails = this.emailsSignal().filter(e => e.selected);

    selectedEmails.forEach(email => {
      this.http.put(
        `${this.apiUrl}/${email.id}`,  // URL dell'API per aggiornare l'email specifica
        {
          ...email,
          is_deleted: true,
          selected: false
        }
      ).subscribe(() => {
        this.emailsSignal.update(emails =>
          emails.map(e => e.id === email.id ?
            { ...e, is_deleted: true, selected: false } : e));
      });
    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// CONSTRUCTOR EFFETTO
  //constructor( private authService: AuthService) {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    // effect(() => {
    //   // if(!this.authService.isLoggedIn()){  
    //   // }

    //   localStorage.setItem('emails', JSON.stringify(this.emailsSignal()));  
    // });

    this.loadEmails(); // Carica le email dal mockapi.io all'avvio del servizio
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// RIPRISTINARE LE EMAIL SELEZIONATE
  // restoreSelectedEmails() {
  //   this.emailsSignal.update(emails =>
  //     emails.map(email =>
  //       email.selected ?
  //         { ...email, is_deleted: false, selected: false }
  //         : email)
  //   );
  // }

  // Versione aggiornata (con richiesta HTTP PUT a mockapi.io)
  restoreSelectedEmails() {

    const selectedEmails = this.emailsSignal().filter(e => e.selected);

    selectedEmails.forEach(email => {

      this.http.put(
        `${this.apiUrl}/${email.id}`,
        {
          ...email,
          is_deleted: false,
          selected: false
        }
      ).subscribe(() => {
        this.emailsSignal.update(emails =>
          emails.map(e => e.id === email.id ?
            { ...e, is_deleted: false, selected: false } : e)
        )
      })

    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// INVIARE UNA NUOVA EMAIL
  // sendEmail(email: Partial<EmailInterface>) {

  //   const newEmail: EmailInterface = {
  //     id: Date.now().toString(),
  //     sender: email.sender || 'Me',
  //     recipient: email.recipient || '',
  //     subject: email.subject || '',
  //     body: email.body || '',
  //     timestamp: new Date(),
  //     starred: false,
  //     label: 'Sent',
  //     folder: 'sent',
  //     selected: false,
  //     is_deleted: false,
  //   };
  //   this.emailsSignal.update(emails => [newEmail, ...emails]);
  // }

  /// Versione aggiornata (con richiesta HTTP POST a mockapi.io)
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// SALVARE UNA BOZZA DI EMAIL
  // saveDraft(email: Partial<EmailInterface>) {

  //   const newDraft: EmailInterface = {
  //     id: Date.now().toString(),  // come mockapi genera un id come stringa, quindi è meglio usare string invece di number. 
  //     sender: email.sender || 'Me',
  //     recipient: email.recipient || '',
  //     subject: email.subject || '',
  //     body: email.body || '',
  //     timestamp: new Date(),
  //     starred: false,
  //     label: 'Draft',
  //     folder: 'drafts',
  //     selected: false,
  //     is_deleted: false
  //   };

  //   this.emailsSignal.update(emails => [newDraft, ...emails]);

  // }

  // Versione aggiornata (con richiesta HTTP POST a mockapi.io)
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
      is_delete: false
    })
      .subscribe(createdDraft => {
        this.emailsSignal.update(emails => [
          createdDraft,
          ...emails
        ]);
      });
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// SELEZIONA / DESELEZIONA EMAIL PER ID (array di ids)
  setSelectedEmails(ids: string[], selected: boolean) {
    this.emailsSignal.update(emails =>
      emails.map(email =>
        ids.includes(email.id) ?
          { ...email, selected }
          : email
      )
    );
  }


  /// CONTA EMAIL SELEZIONATE
  getSelectedEmailsCount(): number {
    return this.emailsSignal().filter(e => e.selected).length;
  }


  /// PULIZIA SELEZIONE EMAIL
  clearSelection() {
    this.emailsSignal.update(emails =>
      emails.map(email => ({
        ...email,
        selected: false
      }))
    )
  }


  /// SELEZIONA / DESELEZIONA EMAIL PER ID (singolo emailId)
  toggleEmailSelection(emailId: string, selected: boolean) {

    this.emailsSignal.update(emails =>
      emails.map(email =>
        email.id === emailId.toString()
          ? { ...email, selected }
          : email
      )
    );

  }

  /// CARICA EMAIL DAL MOCKAPI.IO
  loading = signal(false);

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
          this.snackBar.open(
            'Error during refresh',
            '',
            { duration: 3000, panelClass: ['custom-snackbar'] }
          );
        }
      });
  }


  /// TOGGLE STAR EMAIL
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
    ).subscribe();  // subcribe() vuoto perché non ci interessa fare nulla dopo la risposta, ma è necessario per eseguire la richiesta HTTP
  }


  /// ARCHIVIA EMAIL
  archiveSelectedEmails() {

    const selectedEmails = this.emailsSignal().filter(e => e.selected);

    selectedEmails.forEach(email => {
      this.http.put(
        `${this.apiUrl}/${email.id}`, {
        ...email,
        folder: 'archived',
        selected: false
      }
      ).subscribe(() => {
        this.emailsSignal.update(emails =>
          emails.map(e =>
            e.id === email.id
              ? {
                ...e,
                folder: 'archived',
                selected: false
              } : e
          )
        );
      })
    })

  }

}




