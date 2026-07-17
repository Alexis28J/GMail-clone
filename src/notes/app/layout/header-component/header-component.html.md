
# COMMENTI

- mat-icon è un componente di Angular Material che permette di visualizzare icone. In questo caso, viene utilizzato il set di icone "material-symbols-outlined".


- matTooltip è una direttiva di Angular Material che permette di visualizzare un tooltip quando l'utente passa il mouse sopra un elemento.


- fontSet è un attributo di mat-icon che permette di specificare il set di icone da utilizzare. In questo caso, viene utilizzato il set "material-symbols-outlined". 


- mat-menu è un componente di Angular Material che permette di creare un menu a discesa. In questo caso, viene utilizzato per il menu utente. 


- mat-menu-item è un componente di Angular Material che rappresenta un elemento all'interno di un mat-menu.


- #userMenu è un riferimento locale al mat-menu, utilizzato per collegare il menu al pulsante che lo apre.


- Nell'input di ricerca, utilizzo l'evento (input) per chiamare il metodo onSearch() del componente HeaderComponent, passando il valore dell'input come argomento.

`$event` significa l'evento che ha attivato la funzione, in questo caso l'evento di input dell'elemento input. 
`.target` si riferisce all'elemento che ha generato l'evento, in questo caso l'input di testo.
`.value` è il valore corrente dell'input di testo. 
 Quindi, `$event.target.value` rappresenta il testo che l'utente ha digitato nell'input di ricerca. 

### NB: tolgo (input) se voglio usare SOLO il click della lente.
### NB: `(input)="onSearch(searchInput.value)"` -> ricerca live + click. Live typing tipo Gmail e l'icona di ricerca funziona comunque -->

La differenza tra `(input)="onSearch($event.target.value)"` e `(input)="onSearch(searchInput.value)"` è che nel primo caso si passa l'evento (in questo caso l'evento di input) al componente, mentre nel secondo caso si utilizza un riferimento locale (#searchInput) per accedere direttamente al valore dell'input. 

In parole semplici, il primo metodo è più generico, mentre il secondo è più diretto e leggibile. 


- Ho modificato l'input di ricerca per utilizzare un riferimento locale #searchInput invece di `(input)="onSearch($event.target.value)"`. Questo permette di accedere al valore dell'input direttamente nel template senza dover passare l'evento al componente.

`(keyup.enter)="onSearch(searchInput.value)"` serve per eseguire la ricerca quando l'utente preme il tasto Invio.

Quindi con il riferimento locale #searchInput e con l'evento (keyup.enter), possiamo eseguire la ricerca premendo Invio o cliccando sull'icona di ricerca.


- Ho AGGIUNTO `[checked]="..."` a ciascun checkbox per legarlo allo stato dei filtri nel servizio Folder. 
Questo permette di mantenere sincronizzato lo stato dei checkbox con i filtri attivi nel servizio.
Cio significa che quando lo stato dei filtri cambia nel servizio, i checkbox nel template vengono aggiornati automaticamente. 


## MODIFICA

```HTML
<input type="text" placeholder="Search" #searchInput (input)="onSearch(searchInput.value)" (keyup.enter)="onSearch(searchInput.value)" />
```

La differenza tra `(input)` e `(keyup.enter)` è che `(input)` viene attivato ad ogni modifica del valore dell'input, mentre `(keyup.enter)` viene attivato solo quando si preme il tasto Invio.
In questo modo, l'utente può scegliere se avviare la ricerca ad ogni modifica del campo di input o solo premendo Invio.

Questo tipo di approccio migliora l'esperienza utente. E' più flessibile.