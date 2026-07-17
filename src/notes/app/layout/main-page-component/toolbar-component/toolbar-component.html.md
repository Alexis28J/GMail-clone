
# COMMENTI

- In `Angular Material`, `matTooltipPosition` è una direttiva che ti permette di definire l'area dello schermo in cui compare il fumetto informativo (`tooltip`) rispetto all'elemento con cui l'utente interagisce. 
Essa serve a prevenire sovrapposizioni e garantire che il testo rimanga sempre leggibile. 

- `(change)` serve a catturare l'evento di cambiamento della checkbox e a chiamare il metodo toggleSelectAll passando l'evento come argomento.

- `(change) = "toggleSelectAll($event)"` serve per cambiare lo stato di selezione globale delle email in base all'interazione dell'utente con la checkbox nella toolbar.

- `(click) = "onRestore()"` serve per emettere l'evento di ripristino delle email selezionate. 
Ma a condizione che isTrashView sia true, il pulsante di ripristino sarà visibile e abilitato. 

- `[matMenuTriggerFor]` è l'attributo che collega il pulsante al menu corrispondente che in questo caso è `moveMenu`. 

- `#moveMenu` è il riferimento locale al menu che viene utilizzato da `[matMenuTriggerFor]`. Quindi collega il pulsante al menu corrispondente.

- `matMenu` è un riferimento locale al menu stesso. Sia `moveMenu` che `matMenu` fanno riferimento allo stesso menu. Sono nomi che posso scegliere liberamente. 

-  Il ciclo `@for` genera dinamicamente i bottoni per le cartelle disponibili grazie all'`input` `availableFolders` di `ToolbarComponent`.

- `[indeterminate]` provviene dal componente `MatCheckbox` di `Angular Material` ed è un stato che indica che solo alcuni elementi sono selezionati.

-     
```html
            @if(!isTrashView){
            <button mat-icon-button class="Btn-noBorder" matTooltip="Delete" matTooltipPosition="below"
                (click)="onDelete()">
                <mat-icon>delete</mat-icon>
            </button>
            }  
```

Ho messo una condizione per la cancellazione logica, il quale previene la visualizzazione del pulsante "Delete" se siamo nella vista del cestino.



- 
```html
            @if (isTrashView) {
            <button mat-icon-button class="Btn-noBorder" matTooltip="Restore" matTooltipPosition="below"
                (click)="onRestore()">
                <mat-icon>restore_from_trash</mat-icon>
            </button>
            }
        </div>
```        
        
Ho messo una condizione per il ripristino delle email, il quale previene la visualizzazione del pulsante "Restore" se non siamo nella vista del cestino.



- 
```html
            @if(isTrashView){
            <button mat-icon-button  class="Btn-noBorder" matTooltip="Delete permanently" (click)="onActualDelete()">
                <mat-icon>delete_forever</mat-icon>
            </button>

            }
```

Ho messo una condizione per l'eliminazione permanente (cancellazione fisica) delle email, il quale previene la visualizzazione del pulsante se non siamo nella vista del cestino


