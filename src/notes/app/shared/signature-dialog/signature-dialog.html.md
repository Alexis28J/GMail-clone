# COMMENTI

- 
```HTML
            <mat-hint align="end">
                {{ signature.length }}/1000
            </mat-hint>
``` 

La direttiva `mat-hint` è un suggerimento o un `hint` per l'utente, ad esempio il limite di caratteri.

In questo caso, il `mat-hint` mostra il conteggio dei caratteri e lo fa allineato a destra (`align="end"`).


- 
```HTML
  <mat-slide-toggle [(ngModel)]="enabled" class="enable-toggle">
            Enable signature
        </mat-slide-toggle>
```

La direttiva `[(ngModel)]` lega il valore del toggle alla variabile `"enabled"`. Serve per aggiornare automaticamente lo stato della firma.

La direttiva `mat-slide-toggle` lega il valore del toggle alla variabile `"enabled"`. Serve per aggiornare automaticamente lo stato della firma. 

In sintesi, il `toggle` abilita o disabilita la firma e `ngModel` aggiorna automaticamente la variabile `"enabled"`.