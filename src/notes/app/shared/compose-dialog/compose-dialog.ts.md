
# COMMENTI

Importiamo i moduli necessari da Angular e il servizio `EmailService`. 

Utilizziamo il decoratore `@Component` per definire il componente `ComposeDialog`, specificando il selettore, i moduli importati, il template e lo stile associati al componente.

`MatDialogRef` è un servizio fornito da `Angular Material` che ci consente di interagire con la finestra di dialogo. In questo caso, lo utilizziamo per chiudere la finestra di dialogo quando l'utente invia un'email o fa clic sul pulsante "Chiudi".

`CommonModule` e `FormsModule` sono moduli di Angular che forniscono funzionalità comuni e supporto per la gestione dei moduli e dei dati del modulo. Li importiamo per poter utilizzare le funzionalità di binding dei dati e la gestione dei moduli nel nostro componente.



## INVIARE UNA NUOVA EMAIL

La funzione `send()` viene chiamata quando l'utente fa clic sul pulsante "Invia" nella finestra di dialogo di composizione dell'email. 
All'interno di questa funzione, utilizziamo il servizio `EmailService` per inviare una nuova email. 

Usiamo il metodo `sendEmail()` del servizio, passando un oggetto che contiene le proprietà recipient, subject e body, che vengono impostate in base ai valori inseriti dall'utente nei campi del modulo.

Creiamo un oggetto email che contiene le proprietà recipient, subject e body, che vengono impostate in base ai valori inseriti dall'utente nei campi del modulo.

Successivamente, chiamiamo il metodo `sendEmail()` del servizio `EmailService`, passando l'oggetto email come argomento. Infine, chiudiamo la finestra di dialogo utilizzando `this.dialogRef.close()`.

La funzione `close()` viene chiamata quando l'utente fa clic sul pulsante "Chiudi" nella finestra di dialogo di composizione dell'email.
All'interno di questa funzione, chiudiamo semplicemente la finestra di dialogo utilizzando `this.dialogRef.close()`.
Aggiungiamo questo metodo per consentire all'utente di chiudere la finestra di dialogo senza inviare un'email, se lo desidera.


`private dialogRef = inject(MatDialogRef<ComposeDialog>);`
In questo modo, possiamo utilizzare `this.dialogRef` per accedere alle funzionalità della finestra di dialogo, come la chiusura della finestra stessa.

`MatDialogRef<ComposeDialog>` significa che il riferimento alla finestra di dialogo è specifico per il componente `ComposeDialog`, consentendoci di interagire con quella particolare istanza della finestra di dialogo.


Ho aggiunto un controllo nella funzione `close()` per verificare se l'utente ha inserito del testo nei campi recipient, subject o body.

Se almeno uno di questi campi contiene del testo, viene chiamato il metodo `saveDraft()` del servizio `EmailService` per salvare la bozza dell'email.

Inoltre, viene visualizzato un messaggio di notifica "Draft saved" utilizzando il servizio `MatSnackBar`, che mostra un breve messaggio all'utente per confermare che la bozza è stata salvata correttamente.

In questo modo, se l'utente chiude la finestra di dialogo senza inviare l'email ma ha inserito del testo, la bozza verrà salvata automaticamente. 


Se, invece, tutti i campi sono vuoti, la finestra di dialogo si chiuderà senza salvare nulla.
`send()` non salva la bozza, ma invia l'email e chiude la finestra di dialogo. E' importante perché l'utente potrebbe voler inviare l'email senza salvarla come bozza.
Evita duplicazioni e confusione tra l'invio dell'email e il salvataggio della bozza. In questo modo, l'utente ha un controllo chiaro su cosa accade quando fa clic su "Invia" o "Chiudi".


Ho aggiunto un controllo nella funzione `send()` per verificare se il campo recipient è vuoto.

Se il campo `recipient` è vuoto, viene visualizzato un messaggio di notifica "Please enter a recipient" utilizzando il servizio `MatSnackBar`.
In questo modo, l'utente riceve un feedback immediato e chiaro che deve inserire un destinatario prima di poter inviare l'email.

Se il campo `recipient` contiene del testo, l'email viene inviata normalmente e viene visualizzato un messaggio di conferma "Email sent" per informare l'utente che l'email è stata inviata con successo.


La funzione `send()` invia l'email e chiude la finestra di dialogo, mentre la funzione `close()` salva la bozza (se necessario) e chiude la finestra di dialogo.

### NB: `''` indica che non vogliamo un'azione specifica nel messaggio di notifica, come un pulsante "Annulla" o "Chiudi". 
### In questo caso, il messaggio di notifica sarà visualizzato per un breve periodo di tempo e poi scomparirà automaticamente.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## COLLEGAMENTO CON IL SIGNAL COMPOSE DRAFT (EMAIL SERVICE) (REPLY E FORWARD)

Inizialmente avevo 2 signal separati per Reply e Forward e li avevo collegato con il ComposeDialogComponent.

`replyDraft = this.emailService.replyDraft;` :  collegamento al signal replyDraft del servizio EmailService
`forwardDraft = this.emailService.forwardDraft;` : collegamento al signal forwardDraft del servizio EmailService

Tuttavia, per rendere più pulito il codice, ho deciso di creare uno solo che gestisca entrambi.

`composeDraft = this.emailService.composeDraft;`: collegamento al `signal composeDraft` del servizio `EmailService` 
 Significa che ogni volta che il valore di `composeDraft` cambia nel servizio `EmailService`, anche il valore di `composeDraft` in `ComposeDialog` cambierà automaticamente.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## IMPLEMENTAZIONE DEL LIFECYCLE HOOK ON DESTROY DI ANGULAR

1. 

Ho aggiunto un costruttore per creare un effetto che reagisce ai cambiamenti del signal `replyDraft`.

Ogni volta che `replyDraft` cambia, l'effetto aggiorna i campi del dialogo di composizione email (recipient, subject, body) con i valori della bozza di risposta. Se `replyDraft` è null, non fa nulla.

In Angular moderno normalmente si usa `effect()` nel costruttore:
In questo modo non ho bisogno di usare `ngOnInit()`, `ngOnChanges()` né altri lifecycle hooks, perché l'effetto si attiva automaticamente quando il signal cambia.

L'effetto viene creato una sola volta quando il componente viene istanziato, e non viene ricreato ad ogni render del template, evitando comportamenti indesiderati.

In questo caso l'effetto serve a sincronizzare i campi del dialogo di composizione email con i valori della bozza di risposta, senza sovrascrivere i valori dei campi quando l'utente sta scrivendo una nuova email.
In parole povere, l'effetto serve a "leggere" i valori della bozza di risposta e a "scriverli" nei campi del dialogo di composizione email, ma solo quando la bozza di risposta cambia, e non quando l'utente sta scrivendo una nuova email.


```typescript
constructor() {
    effect(() => {
    //I signal replyDraft e forwardDraft sono stati sostituiti, quindi non servono più
    // const draft = this.replyDraft() ?? this.forwardDraft();  // Prendo il valore corrente del signal replyDraft o forwardDraft. Se entrambi sono null, draft sarà null.
    // if (!draft) return;  // Se replyDraft è null, esci dall'effetto senza fare nulla

    const draft = this.emailService.composeDraft();  // Prendo il valore corrente del signal composeDraft. Se è null, draft sarà null.

    if (!draft) return;  // Se composeDraft è null, esci dall'effetto senza fare nulla

    this.recipient = draft.recipient ?? '';  // ?? significa che se draft.recipient è undefined o null, allora assegna una stringa vuota
    this.subject = draft.subject ?? '';
    this.body = draft.body ?? '';
      });
}
```

In sintesi, questo effetto osserva il signal `composeDraft` del servizio `EmailService`. Ogni volta che il valore di `composeDraft` cambia (ad esempio, quando l'utente seleziona "Reply" o "Forward" su un'email), l'effetto viene eseguito e aggiorna i campi del dialogo di composizione email con i valori della bozza di risposta o inoltro. Se `composeDraft` è `null`, significa che non c'è alcuna bozza da caricare, quindi i campi rimangono vuoti.

La differenza tra l'`effect` e il `computed` è che l'effect non restituisce un valore, ma esegue un'azione ogni volta che i signals a cui fa riferimento cambiano.
In questo caso, l'`action` è aggiornare i campi del dialogo di composizione email con i valori della bozza di risposta.

L'uso del `constructor` qui serve a garantire che `l'effetto` sia creato una sola volta e non ricreato ad ogni render del template, evitando comportamenti indesiderati.
Ad esempio, se l'effetto fosse creato ad ogni render, potrebbe sovrascrivere i valori dei campi del dialogo di composizione email anche quando l'utente sta scrivendo una nuova email, causando perdita di dati.


2. 

Importo `OnDestroy` per poter utilizzare il `lifecycle hook ngOnDestroy`, che viene chiamato quando il componente viene distrutto (cioè quando il `dialog` viene chiuso). 

In questo caso, lo utilizzo per pulire il `signal composeDraft` quando il dialog viene chiuso, così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta o inoltro precedente.

```typescript
ngOnDestroy() {
    this.emailService.clearComposeDraft();
}
```

RIPETO:
`OnDestroy` è un `lifecycle hook di Angular` che viene chiamato quando il componente viene distrutto, cioè rimosso dal DOM. 
In questo caso, viene usato per pulire il `signal replyDraft` quando il dialog viene chiuso.

`this.emailService.clearComposeDraft()`; 
Pulisco il signal composeDraft quando il componente viene distrutto (cioè quando il dialog viene chiuso), così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta o inoltro precedente.

