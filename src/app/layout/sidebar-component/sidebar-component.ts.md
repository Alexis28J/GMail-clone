
# COMMENTI


- Non ho importato `CommonModule` perché non utilizzo direttive come `ngIf` o `ngFor` in questo componente,
mentre ho importato `MatIconModule` perché utilizzo le icone di Angular Material per rappresentare le voci del menu.


- `export class SidebarComponent {  menuItems = [....] }`
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