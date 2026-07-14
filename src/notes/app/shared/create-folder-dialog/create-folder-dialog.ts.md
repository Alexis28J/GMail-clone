Ho creato questo componente per permettere all'utente di creare nuove cartelle. 

In questo modo, l'utente può gestire le proprie cartelle personalizzate in modo semplice e intuitivo.


1. `folderName` è la variabile che conterrà il nome della cartella inserito dall'utente.


2. Inietto il servizio `MatDialogRef` che è un servizio che rappresenta il riferimento al dialogo aperto. Viene utilizzato per chiudere il dialogo e passare i dati al componente chiamante.


3. Metodo `save()` per salvare il nome della cartella e chiudere il dialogo.

`if(!this.folderName.trim()){` - verifica se il nome della cartella è vuoto o contiene solo spazi bianchi.
`return }` - non chiude il dialogo se il nome della cartella è vuoto. 

`this.dialogRef.close(this.folderName)`- chiude la finestra di dialogo e restituisce il nome della cartella al componente genitore.


4. Metodo `close()` per chiudere la finestra di dialogo senza salvare il nome della cartella.

`this.dialogRef.close();` - significa che l'utente ha annullato l'operazione senza fornire un nome di cartella valido





