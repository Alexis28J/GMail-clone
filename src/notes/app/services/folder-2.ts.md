## SELEZIONARE TUTTE LE EMAIL

Ho creato una proprietà `selectAll` che è un segnale reattivo contenente un booleano.

Inizializzo il segnale con il valore `false`, che rappresenta lo stato iniziale di selezione di tutte le email.

Il tipo `<boolean>` indica che il segnale conterrà solo valori di tipo booleano.

Questo segnale può essere utilizzato per tenere traccia dello stato di selezione di tutte le email e aggiornare l'interfaccia utente di conseguenza.

Ho creato un metodo pubblico `setSelectAll(value: boolean)` che accetta un parametro `value` di tipo booleano.

Questo metodo viene utilizzato per aggiornare il valore del segnale `selectAll` con il nuovo valore passato come argomento.

In questo modo, quando viene chiamato questo metodo, lo stato di selezione di tutte le email viene aggiornato e l'interfaccia utente può reagire di conseguenza per selezionare o deselezionare tutte le email


## MODIFICA METODO "SELEZIONARE TUTTE LE EMAIL"
Il metodo `selectAll()` è stato RIMOSSO perché non è più necessario. La selezione delle email viene gestita direttamente nel componente `MainpageComponent` (e nel servizio `EmailService`), dove si può selezionare o deselezionare le email individualmente o tutte insieme tramite l'interfaccia utente.

Vedi metodo `toggleEmailSelection()` nel servizio `EmailService` per la gestione della selezione delle email 
e il metodo `getSelectedEmailsCount()` per ottenere il numero di email selezionate.



## TRANSIZIONE A MOCKAPI.IO

 ```typescript
  private systemFolders: FolderInterface[] = [
    { id: 'inbox', name: 'Inbox', icon: 'inbox', movable: true, system: true },
    { id: 'starred', name: 'Special', icon: 'star', movable: false, system: true },
    { id: 'snoozed', name: 'Snoozed', icon: 'watch_later', movable: false, system: true },
    { id: 'sent', name: 'Sent', icon: 'send', movable: false, system: true },
    { id: 'drafts', name: 'Drafts', icon: 'drafts', movable: false, system: true },
    { id: 'spam', name: 'Spam', icon: 'report', movable: false, system: true },
    { id: 'important', name: 'Important', icon: 'label_important', movable: false, system: true },
    { id: 'personal', name: 'Personal', icon: 'person', movable: false, system: true },
    { id: 'archived', name: 'Archived', icon: 'archive', movable: false, system: true },
    { id: 'work', name: 'Work', icon: 'work', movable: false, system: true },
    { id: 'trash', name: 'Trash', icon: 'delete', movable: false, system: true },
  ];

 private foldersSignal = signal<FolderInterface[]>([]);

 private folderApiUrl =
    'https://6a477fc3abfcbaade1188ff8.mockapi.io/api/gclone/folder';
 ```

Ho commentato la parte che inizializzava le cartelle di sistema direttamente nel `signal`, perché ora le carico da `API` e aggiungo le cartelle di sistema in `loadFolders()`.

- Ho iniettato, nel constructor, il servizio `HttpClient` per fare richieste `HTTP` all'`API`. In questo caso, lo userò per recuperare le cartelle personalizzate dell'utente dal backend.

Adesso sto usando un `mockAPI.io` per simulare le cartelle personalizzate. In futuro, dovrei sostituire questo URL con l'endpoint reale del backend.

In questo modo, le cartelle personalizzate saranno persistenti e non verranno perse al refresh della pagina.

E a differenza di salvare le cartelle in `localStorage`, che non è sicuro e non è condiviso tra dispositivi, usare un backend permette di avere le cartelle sincronizzate tra più dispositivi e utenti.


- `systemFolders` è un array di oggetti che rappresentano le cartelle di sistema predefinite, come "Inbox", "Starred", "Sent", ecc. Ogni oggetto ha proprietà come `id`, `name`, `icon`, `movable` e `system`. Queste cartelle sono considerate parte integrante del sistema e non possono essere modificate o eliminate dall'utente.


- `foldersSignal` ora è un segnale che contiene un array di oggetti `FolderInterface`, inizialmente vuoto. 
Questo segnale verrà popolato con le cartelle di sistema e quelle personalizzate caricate dall'API.


- ### Allora perché ho creato un array separato per le cartelle di sistema? 
La ragione principale è che voglio distinguere tra le cartelle di sistema predefinite e le cartelle personalizzate create dall'utente.

Le cartelle di sistema hanno proprietà specifiche, come `"movable: false"`, che indicano che non possono essere spostate o modificate dall'utente. Al contrario, le cartelle personalizzate possono avere proprietà diverse e possono essere gestite in modo più flessibile.

`systemFolders` non viene modificato direttamente (cioè non viene aggiornato con nuove cartelle), mentre 
`foldersSignal` contiene tutte le cartelle, comprese quelle di sistema e quelle personalizzate. In questo modo, posso mantenere separate le due categorie di cartelle e gestirle in modo appropriato all'interno dell'applicazione.

RICORDA: Anche se le cartelle di sistema sono incluse in `foldersSignal`, queste non possono essere modificate o eliminate dall'utente, perché hanno la proprietà `"movable: false"`, mentre le cartelle personalizzate possono essere aggiunte, modificate o rimosse. Questo approccio consente di avere un controllo più preciso sulle cartelle e di garantire che le cartelle di sistema rimangano intatte.


- In SINTESI, `foldersSignal` contiene tutte le cartelle, sia quelle di sistema che quelle personalizzate, mentre `systemFolders` contiene solo le cartelle di sistema. 
Infine `folderApiUrl` è l'URL dell'API che permette di recuperare le cartelle personalizzate dell'utente.



## CARTELLE CUSTOM (PERSONALIZZATE)
```typescript
  addFolder(name: string) {

    const exists = this.foldersSignal().some(folder => folder.name.toLowerCase() === name.toLowerCase());
    if (exists) {
     console.error(`Folder with name "${name}" already exists.`);
     return;
    }

    this.http.post<FolderInterface>( // fa una richiesta POST 
      this.folderApiUrl,             // all'API
      {                              // per creare una cartella personalizzata
        name,
        icon: 'folder'
      }
    ).subscribe(folder => {  // uso subscribe per aggiornare la signal dopo la creazione della cartella
      this.foldersSignal.update(folders => [
        ...folders,  // significa che stiamo prendendo tutti gli elementi dell'array folders e li stiamo copiando nel nuovo array, e poi aggiungiamo il nuovo oggetto
        folder  // sta per la cartella appena creata che viene restituita dall'API
      ]);
    });
  }
```
Per prima cosa, ho aggiunto questo metodo `addFolder(name: string)` che verifica se esiste già una cartella con lo stesso nome (ignorando maiuscole e minuscole). Se esiste, stampa un messaggio di errore nella `console` e non fa nulla. Se non esiste, invia una richiesta `POST` all'`API` per creare la nuova cartella e aggiorna la `signal` delle cartelle con la nuova cartella ricevuta dalla risposta dell'`API`.



## CARICA CARTELLE DI SISTEMA E PERSONALIZZATE DA API
```TYPESCRIPT
  loadFolders() {  
    
    this.http.get<FolderInterface[]>( // fa una richiesta GET all'API per ottenere sia le cartelle di sistema che quelle personalizzate
      this.folderApiUrl              // URL dell'API per le cartelle
    )
      .subscribe(customFolders => {  // dopo aver ricevuto le cartelle personalizzate, aggiorno il signal con le cartelle di sistema e quelle personalizzate

        this.foldersSignal.set([     // aggiorno il signal con le cartelle di sistema e quelle personalizzate
          ...this.systemFolders,     // cartelle di sistema
          ...customFolders           // cartelle personalizzate
        ]);

      });

  }
```
Ho creato questo metodo `loadFolders()` per caricare (recuperare) le cartelle di sistema e quelle personalizzate da un'`API`. Le cartelle di sistema sono definite staticamente, mentre le cartelle personalizzate vengono recuperate tramite una chiamata `HTTP GET` all'`endpoint` specificato in `folderApiUrl`. Una volta ottenute le cartelle personalizzate, vengono combinate con le cartelle di sistema e aggiornate nel signal `foldersSignal`.

Finalmente, ho messo il metodo `loadFolders()` nel costruttore per caricare le cartelle di sistema e personalizzate al momento della creazione del servizio. 
In questo modo, quando il servizio `Folder` viene istanziato, le cartelle saranno immediatamente disponibili per l'uso.