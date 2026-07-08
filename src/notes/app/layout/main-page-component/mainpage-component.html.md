
# COMMENTI

- `<div class="content">`
Contenitore principale per la lista delle email e il visualizzatore delle email.


- `(nextMail)` e `(prevMail)` sono eventi emessi dal componente ToolbarComponent per navigare tra le email -->


- `[emails]` è una proprietà di input che permette di passare le email al componente MailListComponent. 
Viene messa con le parentesi quadre perché si tratta di un binding di proprietà e non di un evento.
Quando si dice proprietà di input si intende che il valore viene passato dal componente genitore al componente figlio. 


- `[email]` è una proprietà di input che permette di passare l'email selezionata al componente MailViewerComponent.


- `(reply)` e `(forward)` sono eventi emessi dal componente MailViewerComponent per rispondere o inoltrare l'email.


- `(delete)` è un evento emesso dal componente ToolbarComponent per eliminare le email selezionate.
 Si usa le parentesi tonde e non le parentesi quadre perché si tratta di un evento e non di un binding di proprietà.


- `(restore)` è un evento emesso dal componente ToolbarComponent per ripristinare le email selezionate. 
  Si usa le parentesi tonde e non le parentesi quadre perché si tratta di un evento e non di un binding di proprietà.


- `[isTrashView]` è una proprietà di input che indica se la toolbar si trova nella vista del cestino (trash view) o meno.
Si usa le parentesi quadre perché si tratta di un binding di proprietà e non di un evento.


- `(archive)` è un evento emesso dal componente ToolbarComponent per archiviare le email selezionate.
    Si usa le parentesi tonde e non le parentesi quadre perché si tratta di un evento e non di un binding di proprietà.
