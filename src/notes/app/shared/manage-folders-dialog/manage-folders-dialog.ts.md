# COMMENTI

Questo componente gestisce la visualizzazione e la gestione delle cartelle in un dialogo. 

Fornisce funzionalità per rinominare ed eliminare le cartelle, escludendo quelle di sistema dalla visualizzazione. 

Utilizza i servizi di dialogo e snackbar di Angular Material per interazioni con l'utente.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## COMPUTED FOLDERS

```TYPESCRIPT
  folders = computed(() =>
    this.folderService.getFolders()().filter(f => !f.system)
  );
  ```
  Ho creato un computed che filtra le cartelle di sistema, in modo da non mostrarle nella lista delle cartelle gestibili.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO EDIT FOLDERS

`editFolder(folder: FolderInterface) {...}` 

Questo metodo viene chiamato quando l'utente clicca sul pulsante di modifica di una cartella. utilizza il componente `RenameDialog` per aprire un dialog di rinomina.

E quando l'utente conferma, aggiorna il nome della cartella e mostra uno snackbar di conferma.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 ## METODO DELETE FOLDER

 `deleteFolder(folder: FolderInterface) {...}`

Questo metodo viene chiamato quando l'utente clicca sul pulsante di eliminazione di una cartella. Mostra un dialogo di conferma e, se l'utente conferma, elimina la cartella e mostra uno snackbar di conferma.
