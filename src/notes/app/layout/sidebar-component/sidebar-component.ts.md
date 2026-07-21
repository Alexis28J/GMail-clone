
# COMMENTI


- Non ho importato `CommonModule` perché non utilizzo direttive come `ngIf` o `ngFor` in questo componente,
mentre ho importato `MatIconModule` perché utilizzo le icone di Angular Material per rappresentare le voci del menu.


- 
```typescript  
menuItems = [
    { id: 1, name: 'Inbox', icon: 'inbox', count: 10 },
    { id: 2, name: 'Special', icon: 'star' },
    { id: 3, name: 'Sent', icon: 'send' },
    { id: 4, name: 'Drafts', icon: 'drafts', count: 1 },
    { id: 5, name: 'Spam', icon: 'report', count: 3 },
    { id: 6, name: 'Important', icon: 'label_important' },
    { id: 7, name: 'Categories', icon: 'label' },
    { id: 8, name: 'Snoozed', icon: 'snooze' },
    { id: 9, name: 'Trash', icon: 'delete' },
  ];
```
`menuItems` è un array di oggetti che rappresentano le voci del menu laterale. 
Lo inseriamo qui per poterlo utilizzare nel template HTML del componente. 
Ad esempio, ogni oggetto ha un id, un nome, un'icona e un conteggio opzionale di elementi associati a quella voce del menu.


- Invece di utilizzare un array statico di voci del menu, ho deciso di utilizzare il servizio `Folder` per ottenere dinamicamente l'elenco delle cartelle.

In questo modo, il componente `SidebarComponent` può ottenere le cartelle direttamente dal servizio `Folder`, 
che gestisce la logica di recupero delle cartelle e dei dati associati. 
Questo approccio rende il codice più modulare e facilita la gestione dei dati delle cartelle in un unico punto (il servizio `Folder`).


- Poi ho definito un metodo `onFolderSelected(folderId: string)` che viene chiamato quando una cartella viene selezionata.
Questo metodo utilizza il servizio `Folder` per impostare la cartella selezionata, consentendo al componente genitore (`AppComponent`) di reagire a questa selezione e aggiornare l'interfaccia utente di conseguenza.



## AGGIUNTA DELLA FUNZIONALITÀ DI COMPOSIZIONE DELLA MAIL (MODAL DIALOG)

- Ho importato `MatDialog` da Angular Material per gestire la finestra di dialogo di composizione della mail.

- `private dialog = inject(MatDialog)`: ho creato un'istanza del servizio `MatDialog` utilizzando la funzione `inject()` di Angular.

- `openCompose()`: ho definito un metodo `openCompose()` che viene chiamato quando l'utente fa clic sul pulsante "Componi" nel menu laterale.
Questo metodo utilizza il servizio `MatDialog` per aprire la finestra di dialogo di composizione della mail, specificando ComposeDialog come componente da visualizzare nella finestra di dialogo. 
In questo modo, quando l'utente fa clic su "Componi", viene visualizzata la finestra di dialogo per scrivere una nuova email.



## APERTURA DI UN DIALOG QUANDO SI CREA UNA CARTELLA

  ```typescript
  openCreateFolderDialog() {
    const dialogRef = this.dialog.open(CreateFolderDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {  
      if (result) {
        this.folderService.addFolder(result);
      }
    });
  }
  ```

Nel `folderService` ho aggiunto il metodo `addFolder()` che aggiunge una nuova cartella al segnale `foldersSignal`. 
Ora, nel componente `SidebarComponent`, ho creato il metodo `openCreateFolderDialog()` che apre un dialogo per creare una nuova cartella. Quando il dialogo viene chiuso, se l'utente ha inserito un nome per la nuova cartella, viene chiamato il metodo `addFolder` del `folderService` per aggiungere la nuova cartella al segnale `foldersSignal`.

### `afterClosed()` è un metodo che restituisce un `Observable` che emette il valore quando il dialogo viene chiuso.

### `subscribe()` è un metodo che permette di ascoltare gli eventi emessi da un `Observable`. In questo caso, viene utilizzato per ascoltare l'evento di chiusura del dialogo e ottenere il risultato della creazione della cartella.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## GESTIONE LISTA DELLE CARTELLE SYSTEM E CUSTOM

```typescript
  ///////  GESTIONE LISTA DI CARTELLE  ///////

  ///// SIGNAL PER MOSTRARE O NASCONDERE LE CARTELLE
  showMoreFolders = signal(false);


  ///// CARTELLE VISIBILI
  visibleSystemFolders = computed(() => {
    return this.folders()
      .filter(folder => folder.system)
      .slice(0, 4);
  });


  ///// CARTELLE NASCOSTE
  hiddenSystemFolders = computed(() => {
    return this.folders()
      .filter(folder => folder.system)
      .slice(4);
  });


  ///// CARTELLE PERSONALIZZATE
  customFolders = computed(() =>
    this.folders().filter(folder => folder.system !== true)
  );


  ///// CI SONO ALTRE CARTELLE?
  hasMoreFolders = computed(() =>
    this.folders().filter(f => f.system).length > 4
  );
```

1. `showMoreFolders = signal(false);`
`showMoreFolders` è un `signal` che indica se mostrare o meno le cartelle nascoste. Inizialmente è impostato su `false`, quindi le cartelle nascoste non saranno visibili.


2. CARTELLE VISIBILI
```typescript
  visibleSystemFolders = computed(() => {
    return this.folders()
      .filter(folder => folder.system)
      .slice(0, 4);
      })
```
Questo `computed` ritorna le prime 4 cartelle di sistema, che sono quelle visibili di default.

`slice(0, 4)` per mostrare solo le prime 4 cartelle di sistema. I 2 numeri rappresentano l'indice iniziale e finale dell'array da estrarre. In questo caso, estraiamo gli elementi dall'indice 0 all'indice 3 (4 escluso), quindi le prime 4 cartelle di sistema.


3. CARTELLE NASCOSTE
```typescript
  hiddenSystemFolders = computed(() => {
    return this.folders()
      .filter(folder => folder.system)
      .slice(4);
  });
  ```
  Questo `computed` serve per ottenere le cartelle di sistema che non sono visibili nella `sidebar`, ovvero quelle oltre le prime 4. Viene utilizzato per mostrare un pulsante "Mostra altre cartelle" se ci sono più di 4 cartelle di sistema.

  `slice(4)` per ottenere le cartelle a partire dalla quinta. Il numero 4 indica l'indice di partenza, quindi le prime quattro cartelle (0, 1, 2, 3) saranno visibili e le restanti saranno nascoste.


  4. CARTELLE PERSONALIZZATE
 ```typescript
    customFolders = computed(() =>
    this.folders().filter(folder => folder.system !== true)
  );
  ```
  Questo `computed` restituisce solo le cartelle personalizzate, escludendo quelle di sistema.

  `folder.system !== true` significa che la cartella non è di sistema, quindi è personalizzata.


5. CI SONO ALTRE CARTELLE?
```typescript
  hasMoreFolders = computed(() =>  
    this.folders().filter(f => f.system).length > 4  
  );
  ```
Questo `computed` serve per capire se ci sono più di 4 cartelle di sistema, in tal caso mostrerà il pulsante "Mostra altre cartelle".

`true` se ci sono più di 4 cartelle di sistema e quindi ci sono cartelle nascoste.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## REFACTORING GESTIONE LISTA DI FOLDER SYSTEM E CUSTOM

```typescript
  ///// REFACTORING GESTIONE LISTE DI CARTELLE  /////

  ///// SIGNAL PER MOSTRARE O NASCONDERE LE CARTELLE DI SISTEMA E PERSONALIZZATE
  showMoreSystemFolders = signal(false); // Signal per mostrare o nascondere le cartelle di sistema
  showMoreCustomFolders = signal(false); // Signal per mostrare o nascondere le cartelle personalizzate

 // false = cartelle nascoste, true = cartelle visibili
 // vengono inizializzate a false perché all'inizio non vogliamo mostrare le cartelle nascoste


  ///// GRUPPO FOLDER DI SISTEMA
  systemFolderGroup = computed(() => {
    const folders = this.folders()
      .filter(folder => folder.system);

    return {
      visible: folders.slice(0, 4),
      hidden: folders.slice(4),
      hasMore: folders.length > 4
    };
  });


  ///// GRUPPO FOLDER CUSTOM
  customFolderGroup = computed(() => {
    const folders = this.folders()
      .filter(folder => !folder.system)

    return {
      visible: folders.slice(0, 4),
      hidden: folders.slice(4),
      hasMore: folders.length > 4
    }
  });
```

Ho fatto un `refactoring` del codice per gestire meglio la visualizzazione delle cartelle di sistema e personalizzate. 

Ora utilizzo dei `computed properties` per raggruppare le cartelle visibili e nascoste, e dei signal per gestire lo stato di espansione delle liste.

La differenza principale è che ora il codice è più leggibile e modulare, e permette di gestire facilmente l'aggiunta di nuove cartelle senza dover modificare la logica di visualizzazione.

Avrei potuto fare un refactoring ancora più spinto creando un `unico computed` per gestire sia le cartelle di sistema che quelle personalizzate, ma ho preferito mantenerle separate per chiarezza e leggibilità del codice.