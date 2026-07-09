
# BLOCCHI DI CODICE INUTILIZZATI DEL SERVIZIO EMAIL (email.ts)  


## QUESTI PEZZI SONO STATI SOSTITUITI NEL SERVIZIO EMAIL (email.ts) CON LE VERSIONI AGGIORNATE CHE UTILIZZANO LE RICHIESTE HTTP A MOCKAPI.IO, MA HO DECISO DI MANTENERE QUESTO CODICE COMMENTATO COME RIFERIMENTO.


## 1. ALL'INIZIO DEL PROGETTO, IL SERVIZIO EMAIL ERA UN SERVIZIO LOCALE CHE GESTIVA LE EMAIL IN MEMORIA (UTILIZZANDO SIGNALS) E LE SALVAVA NEL LOCAL STORAGE. IL CODICE ERA COMMENTATO PERCHE' ORA SI UTILIZZA UN'API ESTERNA (MOCKAPI.IO) PER GESTIRE LE EMAIL, MA IL CODICE LOCALE E' STATO MANTENUTO COME RIFERIMENTO.

```typescript
 export class EmailService {

   private emailsSignal = signal<EmailInterface[]>(

   JSON.parse(localStorage.getItem('emails') || 'null') ||


  stored = JSON.parse(localStorage.getItem('emails') || '[]')
    .map((email: EmailInterface) => ({
      ...email,
      selected: false
    }));

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
          label: 'Work',
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
          starred: false,
          label: 'Personal',
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
 }
  ```

////////////////////////////////////////////////////////////////////////////////////////////////////////////

## 2. ELIMINARE LE EMAIL SELEZIONATE (VERSIONE LOCALE SENZA RICHIESTA HTTP)

  ```typescript 
  deleteSelectedEmails() {
    this.emailsSignal.update(emails =>
      emails.map(email => email.selected ?
        { ...email, is_deleted: true, selected: false } : email
      )
    );
  }
  ```

///////////////
HO DECISO DI COMMENTARE QUESTO PEZZO DI CODICE PERCHE' HO AGGIORNATO LA FUNZIONE "`deleteSelectedEmails()`".
HO FATTO UN REFACTORING DEL CODICE E ORA UTILIZZO UNA FUNZIONE PRIVATA "`updateSelectedEmails()`" CHE GESTISCE LE MODIFICHE DELLE EMAIL SELEZIONATE, INVECE DI RIPETERE IL CODICE IN OGNI FUNZIONE PUBBLICA (`deleteSelectedEmails()`, `restoreSelectedEmails()`, `archiveSelectedEmails()`).
QUESTO RENDERÀ IL CODICE PIÙ PULITO E MENO RIPETITIVO.

## Versione aggiornata "ELIMINARE LE EMAIL SELEZIONATE" (con richiesta HTTP PUT a mockapi.io)
  
  ```typescript
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
  ```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## 3. CONFIGURAZIONE DEL SERVIZIO EMAIL (VERSIONE LOCALE SENZA RICHIESTA HTTP)

ALL'INIZIO SI USAVA `AUTH SERVICE` PER GESTIRE L'AUTENTICAZIONE, MA POI SI E' DECISO DI USARE 
UN'API ESTERNA (MOCKAPI.IO) PER GESTIRE LE EMAIL, QUINDI IL CODICE LOCALE E' STATO COMMENTATO.

```typescript
constructor( private authService: AuthService) {
    effect(() => {
      // if(!this.authService.isLoggedIn()){  
      // }

      localStorage.setItem('emails', JSON.stringify(this.emailsSignal()));  
    });
    
}
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## 4. RIPRISTINARE LE EMAIL SELEZIONATE (VERSIONE LOCALE SENZA RICHIESTA HTTP E VERSIONE AGGIORNATA CON RICHIESTA HTTP PUT A MOCKAPI.IO) 

  ## RIPRISTINARE LE EMAIL SELEZIONATE (versione locale senza richiesta HTTP)
  
  ```typescript
  restoreSelectedEmails() {
    this.emailsSignal.update(emails =>
      emails.map(email =>
        email.selected ?
          { ...email, is_deleted: false, selected: false }
          : email)
    );
  }
  ```

/////////////
HO DECISO DI COMMENTARE QUESTO PEZZO DI CODICE PERCHE' HO AGGIORNATO LA FUNZIONE "`restoreSelectedEmails()`" 
HO FATTO UN REFACTORING DEL CODICE E ORA UTILIZZO UNA FUNZIONE PRIVATA "`updateSelectedEmails()`" CHE GESTISCE LE MODIFICHE DELLE EMAIL SELEZIONATE,
INVECE DI RIPETERE IL CODICE IN OGNI FUNZIONE PUBBLICA (`deleteSelectedEmails()`, `restoreSelectedEmails()`, `archiveSelectedEmails()`).
QUESTO RENDERÀ IL CODICE PIÙ PULITO E MENO RIPETITIVO.

## Versione aggiornata "RIPRISTINARE LE EMAIL SELEZIONATE" (con richiesta HTTP PUT a mockapi.io)

```typescript
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
  ```


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## 5. INVIARE UNA NUOVA EMAIL (versione locale senza richiesta HTTP)

  ```typescript
  sendEmail(email: Partial<EmailInterface>) {

    const newEmail: EmailInterface = {
      id: Date.now().toString(),
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
  ```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
## 6. SALVARE UNA BOZZA DI EMAIL (versione locale senza richiesta HTTP)

    ```typescript
    saveDraft(email: Partial<EmailInterface>) {
  
      const newDraft: EmailInterface = {
        id: Date.now().toString(),  // come mockapi genera un id come stringa, quindi è meglio usare string invece di number. 
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
    ```


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


## 7. ARCHIVIA EMAIL (versione con richiesta HTTP PUT a mockapi.io)

  ```typescript 
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
  ```