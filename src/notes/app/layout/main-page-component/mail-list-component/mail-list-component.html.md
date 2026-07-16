# COMMENTI

- `(click)` è un evento che viene attivato quando un elemento viene cliccato. In questo caso, viene utilizzato per selezionare un'email.

L'evento `(click)` nel `mail-list-component` viene utilizzato per selezionare un'email e aggiornare lo stato di selezione.
   
Chiama la funzione `selectEmail(email)` che a sua volta chiama `toggleSelection(email)` per aggiornare lo stato di selezione dell'email (entrambe funzioni presenti in mail-list-component.ts). 

Infine, la funzione `setSelectedEmails` di emailService viene chiamata per aggiornare l'elenco delle email selezionate nel servizio.



- `[class.selected]` è una direttiva che aggiunge o rimuove la classe CSS "selected" in base al valore booleano dell'espressione.

In questo caso, viene utilizzata per applicare la classe "selected" all'email quando la proprietà "selected" dell'email è vera (vedi EmailService).


- `[checked]` è una direttiva che imposta lo stato del checkbox in base al valore booleano dell'espressione.
In altre parole, se l'espressione è vera, il checkbox sarà selezionato, altrimenti sarà deselezionato.


- `(change)` è un evento che viene attivato quando il valore del checkbox cambia. In questo caso, viene utilizzato per aggiornare lo stato di selezione dell'email.


- `stopPropagation()` è un metodo che impedisce la propagazione dell'evento corrente nell'albero del DOM. 
In questo caso, impedisce che il clic sul checkbox selezioni anche l'email. 
Perché vogliamo che l'email venga selezionata solo quando si clicca direttamente su di essa, non quando si clicca sul checkbox.


- Ho commentato il codice del checkbox per utilizzare `[(ngModel)]` al posto di `[checked]` e `(change)`. 
Perché `[(ngModel)]` permette di legare direttamente il valore del checkbox alla proprietà "selected" dell'email, semplificando la gestione dello stato di selezione. 


- Ho sostituito `[(ngModel)]` con `[checked]` e `(change)` per utilizzare MatCheckboxChange e gestire correttamente l'evento di selezione.


- Ho inserito `[innerHTML]="highlight(email.sender)"` per evidenziare le parole chiave nel mittente dell'email.
Le parole chiave vengono evidenziate utilizzando il tag `<mark>` definito nel CSS.


- `<mat-checkbox></mat-checkbox>` è un componente `Angular Material` per i checkbox. Serve per avere checkbox stilizzati secondo il tema `Material Design`.

```html
  <!-- <input type="checkbox" (click)="$event.stopPropagation()" [checked]="isSelected(email)"
    (change)="toggleSelection(email)" /> -->

  <!-- <input type="checkbox" (click)="$event.stopPropagation()" [(ngModel)]="email.selected" /> -->
  <!-- <mat-checkbox (click)="$event.stopPropagation()" [(ngModel)]="email.selected"></mat-checkbox> -->
```
Ho sostituito `l'input checkbox` con i `mat-checkbox` di Angular Material, questo mi permette di avere uno stile coerente con il resto dell'applicazione.


- Anche `mat-icon` è un componente `Angular Material` e serve per visualizzare icone. In questo caso viene usato per la stellina dei preferiti. 

Pertanto anche questo blocco è stato sostituito:
```html
    <!-- <span class="star" (click)="toggleStar(email); $event.stopPropagation()">
      {{ email.starred ? '⭐' : '☆' }}</span> -->
```

- Un'altra modifica che ho fatto, è sostituire il metodo di evidenziazione con `[innerHTML]`.
  Prima con `<div class="email-subject">{{email.subject}}</div>` /  `<div class="email-sender">{{email.sender}}</div>` il testo veniva visualizzato normalmente, non evidenziava le parole chiave.
  Ora utilizza `[innerHTML]` per evidenziare le parole chiave. 
