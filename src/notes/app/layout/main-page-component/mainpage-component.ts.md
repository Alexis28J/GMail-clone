
# COMMENTI


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