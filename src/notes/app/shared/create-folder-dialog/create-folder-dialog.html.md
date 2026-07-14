
Ho creato questo componente per permettere all'utente di creare nuove cartelle. 

In questo modo, l'utente può gestire le proprie cartelle personalizzate in modo semplice e intuitivo.

Nell'html, l'utente può inserire il nome della nuova cartella. Anche un'anteprima in tempo reale è disponibile.


- `maxlength="30"` significa che ho messo come limite massimo di caratteri per il nome della cartella 30 caratteri, in modo da evitare nomi troppo lunghi e poco leggibili.

- `cdkFocusInitial` significa che questo input riceverà automaticamente il focus quando il dialogo viene aperto

- `[(ngModel)]='folderName'` significa che il valore dell'input è legato alla proprietà folderName del componente 

`[(ngModel)]` è una direttiva di Angular che crea un binding bidirezionale tra il valore dell'input e la proprietà folderName del componente.

- `mat-hint` è un suggerimento visivo per l'utente, in questo caso mostra il numero di caratteri inseriti rispetto al massimo consentito

- `align='end'` è per allineare l'hint alla fine del campo di input

