///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## SPOSTA LE EMAIL SELEZIONATE IN UNA CARTELLA SPECIFICA (es. "work", "personal", "spam", ecc.)

1. Ho aggiunto il metodo `moveTo` al componente `ToolbarComponent` per consentire lo spostamento delle email selezionate in una cartella specifica. Questo metodo utilizza il servizio `EmailService` per eseguire l'operazione di spostamento.

`this.emailService.moveSelectedEmails(targetFolder);`  
Chiama il metodo `moveSelectedEmails` del servizio `EmailService` per spostare le email selezionate nella cartella target specificata.


2. Ho MODIFICATO il parametro della funzione da "`targetFolder: string`" a "`folder: MovableFolder`" per garantire che il tipo di cartella sia corretto e conforme alle costanti definite in "`folders.constants.ts`".


3. `@Output() moveRequested = new EventEmitter<MovableFolder>();`
Perché `ToolbarComponent` emetta un evento, per prima cosa, ho creato un `@Output` chiamato `moveRequested` che emette un evento di tipo `MovableFolder`. Questo evento sarà utilizzato per comunicare al componente genitore (`MainPageComponent`) che l'utente desidera spostare le email selezionate in una cartella specifica.

### Ho modificato da `EventEmitter<MovableFolder>` a `EventEmitter<string>` per evitare problemi di compatibilità con il tipo di cartella passato come argomento.
`MovableFolder` è un tipo specifico che potrebbe non essere compatibile con il tipo di cartella passato come argomento, quindi ho deciso di utilizzare `string` per garantire la compatibilità.
Vedo che il tipo di cartella passato come argomento è una stringa, quindi l'uso di `EventEmitter<string>` è più appropriato in questo caso.


4. Dopo aver creato  l'output `moveRequested`, ho implementato il metodo `moveTo` che emette l'evento `moveRequested` con la cartella specificata come argomento. Questo metodo sarà chiamato quando l'utente seleziona una cartella di destinazione per spostare le email selezionate.


5.  `moveTo(folder: string) {this.emailService.moveSelectedEmails(targetFolder);}`
Ho COMMENTATO `this.emailService.moveSelectedEmails(targetFolder);` perché voglio che sia `MainPageComponent` a gestire lo spostamento delle email selezionate in una cartella specifica, non `ToolbarComponent`. 

`moveTo` solo deve emettere un evento a `MainPageComponent` per spostare le email selezionate in una cartella specifica. `MainPageComponent` gestirà lo spostamento delle email selezionate in una cartella specifica.

`ToolbarComponent` emette un evento a `MainPageComponent` e `MainPageComponent` gestisce lo spostamento delle email selezionate in una cartella specifica.

In sintesi, ho eliminato la logica di spostamento delle email direttamente nel `ToolbarComponent` con la logica di spostamento delegata al componente genitore (`MainPageComponent`) tramite l'emissione dell'evento moveRequested.


6. Finalmente nel `toolbar-component.html`, ho aggiunto un nuovo pulsante per spostare le email selezionate in una cartella specifica. Questo pulsante utilizza il metodo `moveTo()` per emettere un evento con la cartella di destinazione selezionata.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## FOLDER DISPONIBILI PER SPOSTAMENTO DELLE EMAIL (`Mainpage-component.ts`)

`@Input() availableFolders: MovableFolder[] = [];`
Ho aggiunto un input per ricevere la lista delle cartelle disponibili per lo spostamento delle email

Questo `input` sarà utilizzato per popolare il menu a tendina "Sposta in" con le cartelle disponibili.

In questo modo, il componente `ToolbarComponent` può ricevere dinamicamente la lista delle cartelle disponibili dal `computed` `availableFolders` del componente genitore (`MainpageComponent`) e aggiornare il menu a tendina di conseguenza.

Successivamente, in `mainpage-component.html` aggiungo l'attributo `[availableFolders]="availableFolders()"` al componente `<app-toolbar-component>` per passare la lista delle cartelle disponibili come input.


## MODIFICA delL'INPUT AVAILABLE FOLDERS (metodo FOLDER DISPONIBILI PER SPOSTAMENTO EMAIL)

 ```typescript
  @Input() availableFolders: {
    id: MovableFolder;
    name: string;
    icon: string;
  }[] = [];
 ```
Ho aggiunto in input per ricevere la lista delle cartelle disponibili da MainPageComponent (metodo `availableFolders`).

Questo `input` è di tipo array di oggetti che contengono `id`, `name` e `icon` delle cartelle disponibili per lo spostamento delle email.

l'`id` è di tipo `MovableFolder`, che è un tipo definito in `folders.constants.ts` e rappresenta le cartelle in cui è possibile spostare le email (ad esempio, inbox, archived, trash, ecc.).

Se avesse mantenuto il tipo `EmailInterface`, avrebbe dovuto importarlo da `email.ts`, ma non lo fa, quindi lo sostituisce con void. 
In altre parole, non passa alcun dato, ma solo un evento che indica che l'azione è stata richiesta.


## SECONDA MODIFICA INPUT AVAILABLE FOLDERS

`@Input() availableFolders: FolderInterface[] = [];`

Ho modificato l'input `availableFolders` da `MovableFolder[]` a `FolderInterface[]` per poter passare direttamente l'array di cartelle filtrate da `MainPageComponent` (vedi `MainPageComponent.ts: this.availableFolders = this.folderService.getFolders().filter(f => f.movable);`)
  
In parole semplici, invece di passare solo le cartelle che possono essere spostate (`MovableFolder[]`), ora passo tutte le cartelle disponibili (`FolderInterface[]`) e poi filtro quelle che possono essere spostate direttamente nel componente `toolbar-component`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

### MODIFICHE IN ALTRI COMPONENTI

Successivamente, nel toolbar-component.html, ho sostituito il codice di MENU `"SPOSTA EMAIL"` per un ciclo for.

Il ciclo `@for` genera dinamicamente i bottoni per le cartelle disponibili grazie all'`input` `availableFolders` di `ToolbarComponent`.

Nel `folderInterface`, ho modificato il tipo di id da string a `folderId` che è di tipo `MovableFolder`, perciò anche su `toolbar-component.ts` ho cambiato il tipo di `availableFolders` da `string` a `MovableFolder`.
Altrimenti avrei avuto un errore di tipo incompatibile tra i due tipi.