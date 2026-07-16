
# COMMENTI

- `.compose-btn { font-weight: 500; }`
Per rendere il testo più leggibile e in evidenza


- `compose-btn:hover {box-shadow: 0 1px 3px rgb(222, 175, 175);}`
Aggiunge un'ombra al pulsante per farlo risaltare


- `padding: 0 16px 0 24px;`
Primo valore: `padding-top`, secondo valore: `padding-right`, terzo valore: `padding-bottom`, quarto valore: `padding-left`


- `.menu-item:hover {  background-color: rgb(248, 221, 221);}`
Aggiunge un effetto hover al menu-item per farlo risaltare


- `.menu-item e . menu-left `
Sono stati commentati perché le proprietà sono state trasferite in folder-list-component.scss per evitare conflitti di stile.            
 

- `flex-shrink: 0;` previene che l'header si riduca quando lo spazio è limitato


- 
```SCSS
.sidebar-content {
    flex: 1; 
    overflow-y: auto;

    // nasconde la scrollbar in tutti i browser
    -ms-overflow-style: none; /* Internet Explorer e Edge */
    scrollbar-width: none; /* Firefox */
}

.sidebar-content::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Opera */
}
```
Il `flex: 1` permette al contenuto di occupare tutto lo spazio disponibile tra l'header e il footer.

`overflow-y: auto;` permette lo scroll verticale quando il contenuto supera l'altezza disponibile.


-  
```scss
.toggle-btn {
    width: 100%;

    display: flex;
    align-items: center;
    gap: 8px;

    padding: 8px 16px;  //padding verticale e orizzontale

    border: none;
    border-radius: 8px;
    background: transparent;

    cursor: pointer;

    color: #5f6368;
    font-size: 14px;
    
    border-bottom: solid 2px transparent; 
}
```

Il bottone tendeva a spostarsi verso il basso quando veniva cliccato, quindi ho imposto un bordo trasparente per evitare questo comportamento

`border-bottom: solid 2px transparent;`

funziona perché il bordo trasparente occupa lo stesso spazio del bordo colorato che appare al click.