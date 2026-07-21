## APRIRE LA DIALOG PER GESTIRE I FOLDER CUSTOM

```typescript
  openManageFolders() {
    this.dialog.open(
      ManageFoldersDialog,
      {
        autoFocus: false,
        width: '500px',
      }
    );
  }
  ```

Ho aggiunto il metodo `openManageFolders` per aprire la dialog di gestione dei folder custom. 

Questo metodo utilizza il servizio `MatDialog` per aprire la dialog `ManageFoldersDialog`, che permette all'utente di aggiungere, modificare o eliminare i folder personalizzati.

Inoltre, ho impostato l'opzione `autoFocus` a `false` per evitare che il focus venga automaticamente impostato sul primo elemento della dialog, e ho specificato una larghezza di 500px per la dialog. 

Inoltre, su `toolbar-component.ts`, ho aggiunto un nuovo output chiamato `"manageFolders"` che emette un evento quando l'utente clicca sul pulsante per gestire i folder. Questo evento viene catturato nel componente principale (mainpage-component.ts) e apre la dialog per gestire i folder custom.

Sul `mainpage-component.html`, ho collegato l'evento `"manageFolders"` del componente `toolbar-component` al metodo `"openManageFolders()"` del componente principale, in modo che quando l'utente clicca sul pulsante per gestire i folder, venga aperta la dialog corrispondente.