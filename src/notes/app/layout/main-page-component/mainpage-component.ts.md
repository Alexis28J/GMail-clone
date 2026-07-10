
# COMMENTI

La differenza tra `EmailService` e `MainpageComponent` è che `EmailService` gestisce la logica di business (cioè le regole e le operazioni sugli email), mentre `MainpageComponent` gestisce l'interfaccia utente e le interazioni dell'utente con gli email. 

`MainpageComponent` utilizza `EmailService` per eseguire azioni come inviare, eliminare, ripristinare, archiviare e spostare email, ma non contiene la logica di business stessa.



## IMPORTAZIONI:

- `CommonModule`: Importato per utilizzare le direttive comuni di Angular come `*ngIf` e `*ngFor`.

- `MatCheckboxModule`: Importato per utilizzare il componente di `checkbox` di Angular Material.

- `MatIconModule`: Importato per utilizzare le icone di Angular Material.

- `ToolbarComponent`, `MailListComponent`, `MailViewerComponent`: Importati per essere utilizzati come componenti figli all'interno del `MainpageComponent`.

- `EmailService`: Importato per accedere ai metodi del servizio email, in particolare `getEmails()`.

- `EmailInterface`: Importato per definire il tipo degli oggetti email utilizzati nel componente.


## DECORATORE @Component:

- `selector: 'app-mainpage-component'`: Definisce il selettore del componente, che può essere utilizzato nei template HTML per includere questo componente.

- `imports: [...]`: Elenca i moduli e i componenti che questo componente utilizza. In questo caso, include `CommonModule`, `MatCheckboxModule`, `MatIconModule`, `ToolbarComponent`, `MailListComponent` e `MailViewerComponent`.

- `templateUrl: './mainpage-component.html'`: Specifica il percorso del file HTML che contiene il template del componente.

- `styleUrls: ['./mainpage-component.scss']`: Specifica il percorso del file SCSS che contiene gli stili del componente.


## PROPRIETÀ DEL COMPONENTE:

- `allEmails: Signal<EmailInterface[]>`: Una proprietà che contiene un segnale (`Signal`) che rappresenta l'elenco di tutte le email. Viene inizializzata con i dati ottenuti dal servizio `EmailService`.

### NB: `Signal` con maiuscola indica che è un tipo generico che può contenere un array di oggetti che seguono l'interfaccia EmailInterface.


- `currentIndex: signal<number | null>`: Una proprietà che rappresenta l'indice dell'email attualmente selezionata. Può essere un numero o null se nessuna email è selezionata.

### NB: `signal` con minuscola indica che è un segnale reattivo che può essere aggiornato e osservato per i cambiamenti.


- `selectedEmail: computed<EmailInterface | null>`: Una proprietà calcolata (`computed`) che restituisce l'email attualmente selezionata in base all'indice corrente. Se non c'è un'email selezionata, restituisce null.



## COSTRUTTORE:

Il costruttore accetta un'istanza di `EmailService` come dipendenza. All'interno del costruttore, viene inizializzata la proprietà `allEmails` chiamando il metodo `getEmails()` del servizio email per ottenere l'elenco delle email.

## Modifica nel COSTRUTTORE
Ho commentato l'iniezione del servizio `EmailService` e la chiamata a `getEmails()` perché ora utilizzo il servizio `Folder` per ottenere le email filtrate in base alla cartella selezionata.

Invece, ho iniettato il servizio `Folder` e inizializzato `allEmails` con `folderService.filteredEmails`, che restituisce le email filtrate in base alla cartella selezionata. 

`allEmails` ora è un segnale che dipende da `filteredEmails`, quindi si aggiornerà automaticamente quando `filteredEmails` cambia.

In questo modo, il componente `MainpageComponent` riceve le email direttamente dal servizio `Folder`, che gestisce la logica di filtraggio delle email in base alla cartella selezionata.

Ho abilitato l'iniezione del servizio `EmailService` per poter utilizzare il metodo `deleteSelectedEmails()` quando si desidera eliminare le email selezionate.



## METODI DEL COMPONENTE:

- `onEmailSelected(email: EmailInterface)`: Questo metodo viene chiamato quando un'email viene selezionata. Trova l'indice dell'email selezionata nell'elenco `allEmails` e aggiorna `currentIndex` con questo indice.

- `nextEmail()`: Questo metodo viene chiamato per selezionare l'email successiva nell'elenco. Se c'è un'email successiva disponibile, aggiorna currentIndex incrementandolo di 1.

- `previousEmail()`: Questo metodo viene chiamato per selezionare l'email precedente nell'elenco. Se c'è un'email precedente disponibile, aggiorna currentIndex decrementandolo di 1.

### NB: Non passo il parametro email a `nextEmail()` e `previousEmail()` perché questi metodi operano sull'indice corrente (`currentIndex`) dell'email selezionata, piuttosto che su un'email specifica. 

### NB: L'indice corrente viene utilizzato per determinare quale email è attualmente selezionata e quindi per navigare tra le email nell'elenco `allEmails`.

- `onForward(email: EmailInterface)`: Questo metodo viene chiamato quando si desidera inoltrare un'email. Attualmente, stampa l'email da inoltrare nella console.

- `onReply(email: EmailInterface)`: Questo metodo viene chiamato quando si desidera rispondere a un'email. Attualmente, stampa l'email a cui rispondere nella console.

- `onDeleteSelected()`: Questo metodo viene chiamato quando si desidera eliminare le email selezionate. Chiama il metodo `deleteSelectedEmails()` del servizio `EmailService` per spostare le email selezionate nella cartella "trash" e deselezionarle. 
Dopo aver eliminato le email, imposta `currentIndex` su null per deselezionare qualsiasi email attualmente visualizzata.



## PROMPT DI CONFERMA

1)     ```typescript
       const confirmed = confirm('Are you sure you want to delete this email?');
       if (!confirmed) return;
       ```
        
Nel metodo `onDeleteSelected()`, viene utilizzato il prompt di conferma `confirm()` per chiedere all'utente se è sicuro di voler eliminare l'email selezionata.

Se l'utente conferma l'eliminazione (cliccando su "OK"), il metodo procede con l'eliminazione delle email selezionate. 
Se l'utente annulla l'eliminazione (cliccando su "Cancel"), il metodo esce senza eseguire alcuna azione, lasciando le email selezionate intatte.
E' un modo semplice per prevenire eliminazioni accidentali, dando all'utente la possibilità di confermare o annullare l'azione di eliminazione.


2)     ```typescript
       const dialogRef = this.dialog.open(ConfirmDialog, {
       data: {
         message: 'Are you sure to want to delete these mails?'
       }
     });```

In alternativa, viene utilizzato un dialogo di conferma personalizzato (`ConfirmDialog`) per chiedere all'utente se è sicuro di voler eliminare le email selezionate.

Viene aperto un dialogo modale con un messaggio personalizzato. L'utente può confermare o annullare l'eliminazione delle email.
Dopo che il dialogo viene chiuso, viene verificato il risultato. 
Se l'utente conferma l'eliminazione (result === true), il metodo procede con l'eliminazione delle email selezionate e deseleziona qualsiasi email attualmente visualizzata impostando currentIndex su null.

### NB: `autoFocus: false`: Impedisce che il dialogo acquisisca automaticamente il focus quando viene aperto, migliorando l'esperienza utente.



## ELIMINAZIONE EMAIL SELEZIONATE

`onDeleteSelected()`: Questo metodo viene chiamato quando si desidera eliminare le email selezionate. Chiama il metodo `deleteSelectedEmails()` del servizio `EmailService` per spostare le email selezionate nella cartella "trash" e deselezionarle.

Dopo aver eliminato le email, imposta `currentIndex` su null per deselezionare qualsiasi email attualmente visualizzata.
Viene visualizzato un messaggio di conferma utilizzando `MatSnackBar` per informare l'utente che le email sono state eliminate con successo.

### NB: Mettere in grassetto la parola DELETE nel messaggio del dialogo di conferma, per evidenziare l'azione di eliminazione delle email selezionate.
Se faccio questo: message: 'Are you sure to want to `<b>`DELETE`</b>` these messages?', non funziona perché il messaggio viene visualizzato come testo normale e non come HTML.
Per risolvere questo problema, posso utilizzare il binding `[innerHTML]` nel template del dialogo di conferma per interpretare il messaggio come HTML.
Quindi nel template del dialogo di conferma, modifico la riga `<mat-dialog-content>{{data.message}}</mat-dialog-content>` in `<mat-dialog-content [innerHTML]="data.message"></mat-dialog-content>`.



## RIPRISTINO EMAIL SELEZIONATE

```typescript
  isTrashView: computed(() => {
 return this.folderService.getSelectedFolder()() === 'trash';
})
```

La proprietà `isTrashView` è una proprietà calcolata (`computed`) che restituisce true se la cartella selezionata è "trash" e false altrimenti.
Viene utilizzata per determinare se l'utente si trova nella visualizzazione della cartella "trash". 
Se `isTrashView` è true, significa che l'utente sta visualizzando le email nella cartella "trash", altrimenti sta visualizzando le email in un'altra cartella.

`getSelectedFolder()()`: Questo metodo viene chiamato per ottenere la cartella attualmente selezionata. Restituisce un segnale (`Signal`) che rappresenta la cartella selezionata.

### NB: La doppia chiamata ()() serve per ottenere il valore del segnale restituito da `getSelectedFolder()`. 
### In parole semplici, la prima chiamata ottiene il segnale, mentre la seconda chiamata ottiene il valore corrente del segnale.


`onRestoreSelected()`: Questo metodo viene chiamato quando si desidera ripristinare le email selezionate dalla cartella "trash" alla loro cartella originale.
Chiama il metodo `restoreSelectedEmails()` del servizio `EmailService` per ripristinare le email selezionate e deselezionarle. 
Dopo aver ripristinato le email, imposta `currentIndex` su null per deselezionare qualsiasi email attualmente visualizzata.
Alla fine del metodo, viene visualizzato un messaggio di conferma utilizzando `MatSnackBar` per informare l'utente che le email sono state ripristinate con successo.



## CONDIZIONE DI SELEZIONE EMAIL 

```typescript
       const hasSelect = this.allEmails().some(email => email.selected);
        if(!hasSelect){
        return;
        }                        
```

Nel metodo `onDeleteSelected()`, viene verificato se ci sono email selezionate prima di procedere con l'eliminazione.
Viene utilizzato il metodo `some()` per controllare se almeno un'email nell'elenco `allEmails` ha la proprietà `selected` impostata su true.
Se non ci sono email selezionate (`hasSelect` è false), il metodo esce senza eseguire alcuna azione, impedendo l'eliminazione accidentale di email non selezionate.



## AGGIUNTA FUNZIONE "ON SEND EMAIL"

Ho aggiunto la funzione `onSendEmail(email: Partial<EmailInterface>)` che viene chiamata quando si desidera inviare un'email.

La funzione accetta un oggetto email parziale `(Partial<EmailInterface>)` come parametro, che rappresenta l'email da inviare.

All'interno della funzione, viene chiamato il metodo `sendEmail(email)` del servizio `EmailService` per inviare l'email.

Dopo aver inviato l'email, viene visualizzato un messaggio di conferma utilizzando MatSnackBar per informare l'utente che l'email è stata inviata con successo.



## AGGIUNTA FUNZIONE "LOGOUT"

Ho importato il servizio `AuthService` e il `Router` per gestire il logout dell'utente e la navigazione alla pagina di login.

Nel construttore, ho iniettato il servizio `AuthService` e il `Router` come dipendenze.

Ho aggiunto la funzione `logout()` che chiama il metodo `logout()` del servizio `AuthService` per effettuare il logout dell'utente corrente.

Dopo aver effettuato il logout, viene utilizzato il router per navigare alla pagina di login (`this.router.navigate(['/login'])`). 

In questo modo, l'utente viene reindirizzato alla pagina di login dopo aver effettuato il logout.



## AGGIUNTA FUNZIONE ON ARCHIVE

Ho aggiunto la funzione `onArchive()` che viene chiamata quando si desidera archiviare le email selezionate.

All'interno della funzione, viene chiamato il metodo `archiveSelectedEmails()` del servizio `EmailService` per archiviare le email selezionate.

In questo modo, le email selezionate vengono spostate nella cartella "archived" e deselezionate.



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



## AVAILABLE FOLDERS ('FOLDERS DISPONIBILI PER SPOSTAMENTO DELLE EMAIL)

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