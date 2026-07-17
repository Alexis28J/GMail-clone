## AGGIUNTA FUNZIONE MOVE EMAILS

`moveEmails(folder: MovableFolder) {...}`
Ho creato il metodo `moveEmails` per gestire lo spostamento delle email selezionate in una cartella specifica. 

Questo metodo ha come parametro il folder di destinazione (es. 'personal', 'work', 'archived', ecc.)

Inoltre, apre un dialogo di conferma e, se l'utente conferma, chiama il servizio `EmailService` per spostare le email nella cartella desiderata utilizzando il metodo `moveSelectedEmails`.

Successivamente mostra uno `snackbar` per informare l'utente dell'azione completata con successo.


### Perché ho creato questo metodo in `MainPageComponent` invece di farlo direttamente in `ToolbarComponent`?
Ho creato questo metodo in `MainPageComponent` perché il componente `ToolbarComponent` non ha accesso diretto al servizio `EmailService`.

Il componente `ToolbarComponent` è responsabile solo della gestione dell'interfaccia utente della toolbar, mentre la logica di spostamento delle email è gestita dal MainPageComponent e dal servizio EmailService.

In questo modo, il `MainPageComponent` può coordinare le azioni tra la `toolbar` e il servizio `EmailService`, mantenendo una separazione chiara delle responsabilità tra i componenti.


### In che modo si collega questo metodo al ToolbarComponent?  
Il metodo `moveEmails` viene chiamato quando l'utente seleziona un'opzione di spostamento nel `ToolbarComponent`. Il `ToolbarComponent` emette un evento `moveRequested` con il folder selezionato, e il `MainpageComponent` ascolta questo evento e chiama il metodo `moveEmails` con il folder specificato.

--> Nel `mainpage-component.html`, il `ToolbarComponent` ha un `output` (`moveRequested`) che viene legato al metodo `moveEmails` del `MainpageComponent`. Quando l'utente seleziona un'opzione di spostamento nel `ToolbarComponent`, viene emesso l'evento `moveRequested` con il folder selezionato, e il `MainpageComponent` gestisce lo spostamento delle email selezionate in quella cartella specifica.

### NB: `${folder}` per inserire il nome della cartella selezionata dinamicamente 


### MODIFICA

```typescript
  moveEmails(folder: string) {

    const hasSelect = this.allEmails().some(email => email.selected);   // Verifica se ci sono email selezionate nella lista delle email visibili

    if (!hasSelect) {        // Se non ci sono email selezionate, esce dal metodo senza fare nulla
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {
      autoFocus: false,    // Disabilita l'autofocus sul primo elemento del dialogo per evitare che il pulsante "Conferma" venga premuto accidentalmente premendo Invio
      data: {
        message: `Move selected emails to <strong>${folder.toUpperCase()}</strong>?`  //uso dei tag <strong> per rendere il nome della cartella in grassetto nel messaggio di conferma e toUpperCase() per rendere il nome della cartella in maiuscolo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.moveSelectedEmails(folder as MovableFolder);  // folder as MovableFolder perché il metodo moveSelectedEmails accetta solo cartelle che sono di tipo MovableFolder, quindi facciamo un cast del parametro folder a MovableFolder (vedi folders.constants.ts)
        this.currentIndex.set(null);

        this.snackBar.open(`Emails moved to ${folder.toUpperCase()}`, '', {
          duration: 3000,
          panelClass: ['custom-snackbar'] 
        });
      }
    });
  }
```  
Ho modificato il parametro del metodo `moveEmails` da `MovableFolder` a string perché il tipo `MovableFolder` non è più disponibile nel contesto di questo metodo. 

Ora il metodo accetta una stringa che rappresenta l'ID della cartella di destinazione.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## AVAILABLE FOLDERS (FOLDERS DISPONIBILI PER SPOSTAMENTO DELLE EMAIL)

```typescript
  availableFolders = computed(() => {
    const currentFolder = this.folderService.getSelectedFolder()(); 
    //Ottieniamo la cartella corrente selezionata

    return MOVABLE_FOLDERS.filter(folder => folder !== currentFolder); 
    //Filtriamo le cartelle disponibili escludendo quella corrente
  }); 
```
Ho creato un `Computed` per filtrare le cartelle disponibili per lo spostamento delle email, escludendo la cartella corrente.

Successivamente, nel `toolbar-component.ts` ho aggiunto un `@Input()` chiamato `availableFolders` che riceve questa lista di cartelle disponibili dal componente genitore (`MainPageComponent`). In questo modo, il `toolbar-component` può visualizzare solo le cartelle in cui è possibile spostare le email selezionate, escludendo la cartella corrente.


## MODIFICA di AVAILABLE FOLDERS

 Ho sostituito il `return MOVABLE_FOLDERS.filter(folder => folder !== currentFolder); `
 con il `return this.folderService.getFolders()().filter(...)` per ottenere le cartelle disponibili per lo spostamento delle email, escludendo la cartella corrente.

 La differenza tra queste due versioni è che la prima versione utilizza una costante `MOVABLE_FOLDERS` per filtrare le cartelle disponibili, mentre la seconda versione utilizza il servizio Folder per ottenere dinamicamente le cartelle disponibili e filtrarle in base alla cartella corrente.
 
 In altre parole, la seconda versione è più flessibile e si adatta meglio ai cambiamenti delle cartelle disponibili nel sistema.

 La prima versione è più statica e dipende dalla costante `MOVABLE_FOLDERS`, che potrebbe non riflettere le cartelle effettivamente disponibili nel sistema.

    ```typescript 
    return this.folderService.getFolders()().filter(  
    (
      f    
    ) : f is FolderInterface & { id: MovableFolder } =>  
    // Qui stiamo usando un type guard per assicurare che f sia di tipo FolderInterface con un id di tipo MovableFolder
      MOVABLE_FOLDERS.includes(
        f.id as MovableFolder
      ) && f.id !== currentFolder
   );
```
Se lo esaminiamo linea per linea, la funzione `availableFolders()` fa quanto segue:
1. Recupera la cartella attualmente selezionata tramite `this.folderService.getSelectedFolder()()`.
2. Chiama `this.folderService.getFolders()()` per ottenere l'elenco completo delle cartelle disponibili.
3. Filtra l'elenco delle cartelle per includere solo quelle che soddisfano due condizioni:
  a. La cartella deve essere inclusa nell'array `MOVABLE_FOLDERS` (che contiene le cartelle in cui è consentito spostare le email).
  b. La cartella non deve essere la stessa della cartella attualmente selezionata (`currentFolder`).
4. Restituisce un array di oggetti `FolderInterface` che rappresentano le cartelle disponibili per lo spostamento delle email.


## SECONDA MODIFICA di AVAILABLE FOLDERS

Ho sostituito il filtro sopra con questo nuovo filtro che prende in considerazione anche la proprietà "movable" delle cartelle, così da poter escludere eventuali cartelle che non sono spostabili.

```typescript
    return this.folderService.getFolders()().filter(folder =>
      folder.id !== currentFolder && folder.movable !== false
    ); 
// folder.id !== currentFolder: esclude la cartella corrente, folder.movable !== false: esclude le cartelle che non sono spostabili
```
Quindi la lista dei folders disponibili per lo spostamento delle email è calcolata in base alla cartella attualmente selezionata e ai folders che hanno la proprietà "movable" impostata a true.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## INOLTRA EMAIL

```typescript
  onForward(email: EmailInterface) {
    
    this.emailService.setFordwardEmail(email); // Chiama e setta la bozza di inoltro nel servizio EmailService attraverso il metodo setFordwardEmail, che aggiorna il signal forwardDraft con i dati dell'email da inoltrare.

    this.dialog.open(ComposeDialog, {
      width: '500px'
    })
  }
```
Metodo per inoltrare un'email. Quando l'utente clicca sul pulsante di inoltro, questo metodo viene chiamato con l'email da inoltrare come parametro. 

Il metodo imposta l'email da inoltrare nel servizio `EmailService` e apre il dialogo di composizione email.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## RISPOSTA EMAIL

```typescript
  onReply(email: EmailInterface) {
    this.emailService.setReplyEmail(email);  
    
    ....
  }
```
Questo metodo viene chiamato quando l'utente clicca sul pulsante `"Reply"` in `MailViewerComponent`.
Imposta la bozza di risposta nel servizio `EmailService` e apre il dialog di composizione email.

- `this.emailService.setReplyEmail(email);`
 Imposto il signal `replyDraft` con l'email da rispondere. In parole povere, sto dicendo al servizio `EmailService` che l'email selezionata è quella a cui voglio rispondere. Questo signal sarà poi utilizzato nel componente `ComposeDialog` per precompilare il campo "To" e il corpo della risposta.
 Successivamente, quando il dialog viene chiuso, il signal `replyDraft` verrà pulito automaticamente nel metodo ngOnDestroy del componente ComposeDialog.

 - `this.dialog.open(ComposeDialog, {...})`
 Apro il `dialog` per la composizione della risposta. Utilizzando il signal `replyDraft`, il componente `ComposeDialog` può accedere ai dati della bozza di risposta. 

### NB: Il `dialog` di risposta di default è più piccolo rispetto al `dialog` di composizione email, quindi lo apriamo con una larghezza maggiore per dare più spazio all'utente per scrivere la risposta.

- 
```typescript 
const dialogRef = this.dialog.open(ComposeDialog, { 
      width: '500px'
    }); 
    dialogRef.afterClosed().subscribe(() => {
    this.emailService.clearReplyDraft();   
    })
```    
In un primo momento ho usato il metodo `clearReplyDraft()` per pulire il signal `replyDraft` dopo la chiusura del `dialog`, ma ho deciso di spostare quella logica nel metodo `ngOnDestroy` del componente `ComposeDialog`, così che venga pulito automaticamente quando il `dialog` viene chiuso, evitando di doverlo fare manualmente qui.


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## CANCELLAZIONE DEFINITIVA DI UN'EMAIL

```typescript 
  onActualDelete() {
    const hasSelect =
      this.allEmails().some(email => email.selected && email.is_deleted);  // verifica se ci sono email selezionate e si trovano in "Trash"

    if (!hasSelect) {
      return
    }

    const dialogRef = this.dialog.open(
      ConfirmDialog, {
      autoFocus: false,
      data: {
        message: 'Are you sure to <strong>PERMANENTLY DELETE</strong> these messages?'
      }
    }
    );

    // Se l'utente conferma la cancellazione, chiama il metodo actualDeleteSelectedEmails() del servizio EmailService per eliminare definitivamente le email selezionate
    dialogRef.afterClosed().subscribe(result => {  
      if (result === true) {
        this.emailService.actualDeleteSelectedEmails();
        this.currentIndex.set(null);

        this.snackBar.open(
          'Emails permanently deleted',
          '',
          {
            duration: 3000,
            panelClass: ['custom-snackbar']
          }
        );
      }
    });
  }
```  

Su `emailService`, ho creato la funzione `actualDeleteSelectedEmails()` per eliminare definitivamente le email selezionate, che sono già state spostate nel cestino `(is_deleted = true)`.

Dopo aver creato quel metodo, ho aggiunto il metodo `onActualDelete()` nel `MainpageComponent` per gestire l'evento di eliminazione definitiva delle email selezionate. 
Questo metodo viene chiamato quando l'utente conferma (click su "procede") l'eliminazione permanente delle email dal cestino. 

Successivamente, ho aggiornato il `ToolbarComponent` per emettere l'evento `actualDelete` al `MainpageComponent` quando l'utente clicca sul pulsante "Delete permanently" nel `toolbar`. In questo modo, il flusso di eliminazione definitiva delle email selezionate è completo e funzionale.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## MARCA COME SPAM LE EMAIL SELEZIONATE

```typescript 
  onMarkAsSpam() {

    const hasSelect = this.allEmails().some(email => email.selected);   // verifica se ci sono email selezionate

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {
      autoFocus: false,
      data: {
        message: 'Are you sure to want to <strong>MARK AS SPAM</strong> these messages?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.markSelectedEmailsAsSpam();
        this.currentIndex.set(null);

        this.snackBar.open('Emails marked as SPAM', '', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
      }
    });

  }
```

  Ho creato una funzione `onMarkAsSpam()` che mostra un dialog di conferma prima di marcare le email selezionate come spam. Se l'utente conferma, viene chiamato il metodo `markSelectedEmailsAsSpam()` del servizio `emailService` e viene mostrato uno `snackbar` di conferma.

  Successivamente, ho aggiornato il `ToolbarComponent` per emettere l'evento `actualDelete` al `MainpageComponent` quando l'utente clicca sul pulsante "Delete permanently" nel `toolbar`. In questo modo, il flusso di eliminazione definitiva delle email selezionate è completo e funzionale.
  E nel suo template, ho collegato al pulsante "Mark as spam" la funzione `onAsSpam()` che emette l'evento `asSpam` al componente padre.

  Finalmente, nel `mainpage-component.html`, nel selettore di `app-toolbar-component`, ho aggiunto l'evento `(asSpam)="onMarkAsSpam()"` per gestire la segnalazione delle email come `spam`.