# COMMENTI

## VERSIONE SINGOLA FIRMA (METODO FIRMA DIGITALE)

```HTML
<div class="signature-dialog"> 

<!-- TITOLO -->
 <h2 mat-dialog-title class="signature-title">
        <mat-icon>draw</mat-icon>
        <span>Email Signatures</span>
</h2>


<mat-dialog-content> 

<!-- DESCRIZIONE DELLA FUNZIONALITÀ -->
<p class="description">
            This signature will automatically be appended to new emails, replies and forwarded messages.
        </p>


<!-- AREA DI TESTO PER LA FIRMA -->
<mat-form-field appearance="outline">

            <mat-label>Signature</mat-label>

            <textarea matInput rows="6" [(ngModel)]="signature">
            </textarea>

<!-- Limite di caratteri -->
<mat-hint align="end">
                {{ signature.length }}/1000
            </mat-hint>

        </mat-form-field>


<!-- ANTEPRIMA DELLA FIRMA -->
<div class="preview-section">

            <h3>Preview</h3>

            <div class="preview-box">
                {{ signature }}
            </div>

        </div>

<!-- Toggle per abilitare la firma -->
<mat-slide-toggle [(ngModel)]="enabled" class="enable-toggle">
            Enable signature
        </mat-slide-toggle>

    </mat-dialog-content>


<!-- PULSANTI DELETE E SAVE -->
<mat-dialog-actions align="end">

        <button mat-stroked-button color="warn" (click)="delete()" class="delete-btn">
            Delete
        </button>

        <button mat-flat-button color="primary" (click)="save()" class="save-btn">
            Save
        </button>

    </mat-dialog-actions>

</div>
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## VERSIONE VARI FIRME (METODO FIRMA DIGITALE)


`(change)="setDefault(signature.id!)` significa che quando il radio button cambia, viene chiamata la funzione setDefault con l'id della firma selezionata. 

Ho messo `!` per indicare che `signature.id` non è null. Invece di mettere `!`, avrei potuto fare un controllo di nullità. Ad esempio: `(change)="setDefault(signature.id ?? 0)"` che significa usare 0 se `signature.id` è null. 

Invece di mettere `!`, avrei potuto fare un controllo di nullità. Ad esempio: `(change)="setDefault(signature.id ?? 0)"`che significa usare 0 se signature.id è null. 