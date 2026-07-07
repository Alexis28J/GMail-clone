
# COMMENTI

- `height: calc(100vh - 64px);`  
Calcola l'altezza del contenitore principale sottraendo l'altezza dell'header (64px) dall'altezza totale della finestra (100vh).

Questo permette al contenitore principale di occupare tutto lo spazio disponibile sotto l'header, adattandosi dinamicamente alle dimensioni della finestra del browser.


- `overflow-y: auto;`
Aggiunge una barra di scorrimento verticale se il contenuto supera l'altezza del contenitore.


- `.mail-viewer-container {width: 60%; }`
Prende il 60% della larghezza del contenitore principale "content".