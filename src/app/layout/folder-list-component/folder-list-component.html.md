# COMMENTI

Dentro il template HTML del componente FolderListComponent, utilizziamo un ciclo @for per iterare sui folder ricevuti come input dal componente genitore.

Per ogni folder, creiamo un elemento div con la classe "menu-item" e un evento click che chiama il metodo onSelect passando l'id del folder. 

All'interno di questo div, abbiamo un altro div con la classe "menu-left" che contiene l'icona del folder e il nome del folder. 

Se il folder ha un count, viene visualizzato un elemento span con la classe "count" che mostra il numero di elementi nel folder. 

In sintesi, questo template HTML è responsabile di visualizzare la lista dei folder e di gestire l'interazione dell'utente con i folder. 

Quando un folder viene selezionato, viene chiamato il metodo onSelect del componente, che emette un evento al componente genitore con l'id del folder selezionato.