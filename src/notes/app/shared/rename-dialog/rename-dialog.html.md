Non è necessario mettere `(click)='close()'` perché `mat-dialog-close` gestisce automaticamente la chiusura del dialogo. 

Non è necessario mettere neanche `(click)='save()'` perché `mat-dialog-close` gestisce automaticamente la chiusura del dialogo e restituisce il valore specificato `mat-dialog-close` usa le parentesi quadre perché il valore da restituire è dinamico cioè dipende dal valore di `folderName`. 

Invece, se fosse un valore statico, non servirebbero le parentesi quadre.
Ci sono casi in cui potrei voler aggiungere logica personalizzata prima di chiudere il dialogo o semplicemente usare `mat-dialog-close`.