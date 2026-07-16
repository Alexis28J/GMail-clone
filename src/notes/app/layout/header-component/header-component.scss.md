
- `padding: 0 16px;` -> 0px verticale, 16px orizzontale

- `background: transparent;` -> Rimuove il bordo e lo sfondo del pulsante

- `cursor: pointer;` -> Cambia il cursore quando si passa sopra il pulsante

- `flex: 1;` -> Occupa tutto lo spazio disponibile tra sinistra e destra

- `padding: 4px 16px;` -> 4px verticale, 16px orizzontale
 
- `.search-icon { padding-left: 8px; ...}`
Aggiunge uno spazio tra l'icona e il bordo sinistro della casella di ricerca

- `.icon-btn:hover {background-color: rgb(248, 221, 221);}`
Aggiunge un `effetto hover` per i pulsanti delle icone, cambiando il colore di sfondo quando si passa sopra.


- 
```scss
::ng-deep .filter-menu {  
    background-color: rgb(248, 240, 240);
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}


::ng-deep .mat-mdc-menu-panel {
    background-color: rgb(248, 240, 240) !important;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}


::ng-deep .filter-menu {
    background-color: rgb(248, 240, 240);
    padding: 0 16px;
    margin-bottom: 12px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 180px;
}


::ng-deep .filter-title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 16px;
    color: #555;
}


::ng-deep .filter-menu label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
}


.filter-menu input[type="checkbox"] {
    accent-color: rgb(242, 210, 210);
 }
```


Angular Material mette lo sfondo sul panel interno (`.mat-mdc-menu-panel`), quindi per sicurezza:
`::ng-deep .mat-mdc-menu-panel {...}`
`::ng-deep` serve perché mat-menu vive fuori dal tuo componente e quindi non eredita gli stili del tuo componente. 
Senza `::ng-deep`, gli stili definiti nel tuo componente non si applicherebbero al `mat-menu`.

`::ng-deep` è un selettore speciale in `Angular` che permette di applicare stili CSS a componenti figli, anche se questi componenti sono isolati dal punto di vista dello stile. In pratica, consente di "forzare" l'applicazione di stili a elementi che altrimenti non sarebbero accessibili a causa dell'incapsulamento dei componenti.

In realtà, l'uso di `::ng-deep` è deprecato, ma serve per applicare stili ai componenti figli di `Angular Material` che vivono fuori dal componente corrente.

Per componenti come:

- MatMenu
- MatDialog
- MatSnackBar
- MatTooltip

gli stili dovrebbero essere definiti globalmente. Quindi l'HO FATTO.

### Qual'è la differenza tra usare lo `style globale` e `lo style locale`? 
Lo `style globale` viene applicato a tutti i componenti dell'applicazione, mentre lo `style locale` viene applicato solo al componente specifico in cui è definito.
Sebbene voglio applicare lo style solo al componente specifico, ho dovuto usare lo style globale perché il componente del menu dei filtri è un componente figlio del componente header e quindi non posso applicare lo style locale al componente header. 
In parole povere, il componente header non può accedere allo style locale del componente menu dei filtri perché quest'ultimo è un componente figlio del primo.