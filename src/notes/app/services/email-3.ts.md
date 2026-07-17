## CREARE RISPOSTA EMAIL (REPLY) A PARTIRE DALLA EMAIL ORIGINALE

1. `replyDraft = signal<Partial<EmailInterface> | null>(null);`

Per primo creo un `signal` per la bozza di risposta, che può essere un oggetto parziale di `EmailInterface` o `null`

Questo `signal` conterrà i dati da precompilare nel `dialog`. 
`replyDraft` è un `signal` che contiene la bozza di risposta corrente, se presente, altrimenti `null`.
  
### NB: `Partial<EmailInterface>` perché non tutte le proprietà sono necessarie per la bozza di risposta
### NB: `| null` perché inizialmente non c'è nessuna bozza di risposta
### NB: `(null)` indica che non c'è nessuna bozza di risposta attiva


2. 
```TYPESCRIPT
setReplyEmail(originalEmail: EmailInterface) {   

    this.replyDraft.set({
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
  clearReplyDraft() {
   this.replyDraft.set(null);
  } 
```
Funzione per impostare la bozza di risposta a partire dall'email originale

Bisogna pulire il signal, altrimenti succede un problema:
Reply a una mail. Chiudo il dialog. Nuova Compose. Mi ritrovo ancora i dati della reply.

`ngOnDestroy()` del componente ComposeDialog chiama questa funzione per pulire il signal `replyDraft` quando il dialog viene chiuso, così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta precedente.


## MODIFICA - REFACTORING: 1 solo signal per la bozza di email, che può essere una bozza di risposta o una bozza di inoltro.

Ho commentato il signal `replyDraft` perché ho deciso di usare un solo signal `composeDraft` per gestire sia le bozze di risposta che le bozze di inoltro, così da semplificare il codice e ridurre la duplicazione.

In questo modo non ho bisogno di due signals separati, ma posso usare un solo signal per gestire entrambe le situazioni.

`composeDraft = signal<Partial<EmailInterface> | null>(null);`

### `composeDraft` è un signal che contiene la bozza di email (grazie al metodo `set`), che può essere una bozza di risposta o una bozza di inoltro.


```typescript
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
```
Quindi, anche la funzione `setReplyEmail()` è stata modificata per usare `composeDraft` invece di `replyDraft`.


```typescript
  clearComposeDraft() {
    this.composeDraft.set(null); 
  }
```
Inoltre ho creato un solo metodo `clearComposeDraft()` di pulizia del signal `composeDraft`, che viene chiamato sia quando si chiude il `dialog` di risposta, sia quando si chiude il `dialog` di inoltro, così da evitare duplicazioni di codice.

Più precisamente, questa funzione viene chiamata da `onDestroy()` del `ComposeDialog` per pulire il signal `composeDraft` quando il dialog viene chiuso, così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta o inoltro precedente.


## Allora, come si collega `clearComposeDraft()` con `ngOnDestroy()` del `ComposeDialog`?
Quando il `ComposeDialog` viene chiuso, `ngOnDestroy()` viene chiamato automaticamente da `Angular`.
In `ngOnDestroy()`, chiamo `this.emailService.clearComposeDraft()`, che pulisce il signal `composeDraft`.
In questo modo, la prossima volta che apro il `dialog`, non ci saranno dati residui della bozza di risposta o inoltro precedente.


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## INOLTRARE EMAIL (FORWARD) A PARTIRE DALLA EMAIL ORIGINALE

1. 

<!-- `forwardDraft = signal<Partial<EmailInterface> | null>(null);` -->
<!-- Aggiungo un signal per il forward -->

   Uso il signal `composeDraft()` che gestisce anche le bozze di risposta. 

     `composeDraft = signal<Partial<EmailInterface> | null>(null);`


2. 
```typescript
  setForwardEmail(originalEmail: EmailInterface) {

    const date = new Date(originalEmail.timestamp);  

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
    }); 
  }
```
`timestamp` viene visualizzato in un formato leggibile nel dialog, ma viene salvato come stringa ISO nel database.

`\n` va a capo nel dialog ma non nel database, perché il database salva la stringa così com'è, con `\n` come carattere speciale.

## NB: Ogni volta che si chiude il dialog, il signal viene pulito grazie al metodo `clearComposeDraft()` e dal lifecycle hook di `Angular`, `OnDestroy()` che si trova nel `ComposeDialogComponent`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 ## ELIMINAZIONE DEFINITIVA DAL CESTINO

 ```typescript
  actualDeleteSelectedEmails() {

    const selectedEmails =   
      this.emailsSignal().filter(      // seleziona solo le email selezionate e che sono nel cestino
        email => email.selected && email.is_deleted
      );

    selectedEmails.forEach(email => {   // Per ogni email selezionata e contrassegnata come eliminata,
      this.http.delete(      // invia una richiesta HTTP DELETE a mockapi.io
        `${this.apiUrl}/${email.id}`
      ).subscribe(() => {
        this.emailsSignal.update(emails => // Una volta completata la richiesta di eliminazione,
          emails.filter(e => e.id !== email.id)  //  aggiorna il signal emailsSignal rimuovendo l'email eliminata dall'elenco delle email.
        )  // In questo modo, l'interfaccia utente rifletterà immediatamente la rimozione dell'email senza dover ricaricare tutte le email dal server.
      })
    })

  }
  ```

   Ho creato questa funzione per eliminare definitivamente le email selezionate, che sono già state spostate nel cestino `(is_deleted = true)`.

   Dopo aver creato il metodo `actualDeleteSelectedEmails()`, ho aggiunto il metodo `onActualDelete()` nel `MainpageComponent` per gestire l'evento di eliminazione definitiva delle email selezionate. 
   Questo metodo viene chiamato quando l'utente conferma (click su "procede") l'eliminazione permanente delle email dal cestino. 
   
   Successivamente, ho aggiornato il `ToolbarComponent` per emettere l'evento `actualDelete` al `MainpageComponent` quando l'utente clicca sul pulsante "Delete permanently" nel `toolbar`. In questo modo, il flusso di eliminazione definitiva delle email selezionate è completo e funzionale.


## REFACTORING

```typescript
  private removeSelectedEmails() {  //Lo stesso codice che c'era in actualDeleteSelectedEmails()

    const selectedEmails =
      this.emailsSignal().filter(
        email => email.selected && email.is_deleted
      );

    selectedEmails.forEach(email => {
      this.http.delete(
        `${this.apiUrl}/${email.id}`
      ).subscribe(() => {
        this.emailsSignal.update(emails =>
          emails.filter(e => e.id !== email.id)
        )
      })
    })

  }
```
Ho deciso di fare un refactoring della funzione `"actualDeleteSelectedEmails()"` in una funzione privata `"removeSelectedEmails()"`, in modo da poterla richiamare anche da altre funzioni pubbliche (ad esempio per la cancellazione definitiva delle email selezionate) e altre funzioni che posso implementare in futuro (ad esempio per la cancellazione definitiva delle email ma fatta dal mail viewer). 


```typescript
  actualDeleteSelectedEmails() {
    this.removeSelectedEmails();
  }
```
Quindi, la funzione `actualDeleteSelectedEmails()` chiama la funzione privata `removeSelectedEmails()` per eliminare definitivamente le email selezionate dal `mockapi.io` e dal `signal`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## MARCA LE EMAIL SELEZIONATE COME SPAM

```typescript
  markSelectedEmailsAsSpam() {
    this.moveSelectedEmails('spam');
  }
```

Ho creato una funzione separata per marcare le email come `spam`, in quanto potrebbe essere utile avere un'azione specifica per questa operazione, distinta dallo spostamento in una cartella generica.

Questa funzione chiama la funzione `moveSelectedEmails()` con il parametro `'spam'`, che rappresenta la cartella in cui le email selezionate verranno spostate.

La funzione `moveSelectedEmails()` chiama a sua volta la funzione `privata updateSelectedEmails()` per aggiornare le email selezionate con le modifiche necessarie, in questo caso impostando la cartella su `'spam'` e assicurandosi che l'attributo `is_deleted` sia impostato su `false`.

Poi su `mainpage-component.ts`, ho creato una funzione che chiama questa funzione (`markSelectedEmailsAsSpam()`) per spostare le email selezionate nella cartella `spam`, oltre a mostrare un messaggio di conferma tramite snackbar. In questo modo, quando l'utente seleziona una o più email e clicca sul pulsante `"Segnala come spam"`, le email vengono spostate nella cartella spam e l'utente riceve un feedback visivo dell'azione completata con successo.

Successivamente, su `toolbar-component.ts`, ho messo un evento al componente padre (`MainPageComponent`) per eliminare le email selezionate in modo definitivo, chiamando la funzione privata `removeSelectedEmails()` del servizio `EmailService`.
E nel suo template, ho collegato al pulsante "Mark as spam" la funzione `onAsSpam()` che emette l'evento `asSpam` al componente padre.

Finalmente, nel `mainpage-component.html`, nel selettore di `app-toolbar-component`, ho aggiunto l'evento `(asSpam)="onMarkAsSpam()"` per gestire la segnalazione delle email come `spam`.




