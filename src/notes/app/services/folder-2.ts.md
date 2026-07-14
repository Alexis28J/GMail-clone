## SELEZIONARE TUTTE LE EMAIL

Ho creato una proprietà `selectAll` che è un segnale reattivo contenente un booleano.

Inizializzo il segnale con il valore `false`, che rappresenta lo stato iniziale di selezione di tutte le email.

Il tipo `<boolean>` indica che il segnale conterrà solo valori di tipo booleano.

Questo segnale può essere utilizzato per tenere traccia dello stato di selezione di tutte le email e aggiornare l'interfaccia utente di conseguenza.

Ho creato un metodo pubblico `setSelectAll(value: boolean)` che accetta un parametro `value` di tipo booleano.

Questo metodo viene utilizzato per aggiornare il valore del segnale `selectAll` con il nuovo valore passato come argomento.

In questo modo, quando viene chiamato questo metodo, lo stato di selezione di tutte le email viene aggiornato e l'interfaccia utente può reagire di conseguenza per selezionare o deselezionare tutte le email

Il metodo `selectAll()` è stato RIMOSSO perché non è più necessario. La selezione delle email viene gestita direttamente nel componente `MainpageComponent` (e nel servizio `EmailService`), dove si può selezionare o deselezionare le email individualmente o tutte insieme tramite l'interfaccia utente.

Vedi metodo `toggleEmailSelection()` nel servizio `EmailService` per la gestione della selezione delle email 
e il metodo `getSelectedEmailsCount()` per ottenere il numero di email selezionate.

## 