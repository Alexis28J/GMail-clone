# COMMENTI

- `.Btn-noBorder:hover`
Aggiunge un effetto hover per i pulsanti delle icone


- `border-radius: 50%;`
Rende i pulsanti circolari 


- `.btn-container { gap: 20px;`
Spazio tra i pulsanti


- `flex-wrap: wrap;`
Permette ai pulsanti di andare a capo se lo spazio è insufficiente


- `justify-content: space-between;` 
Distribuisce i pulsanti in modo uniforme con spazio tra di loro
  

- `.btn-group {gap: 20px;` 
Spazio tra i pulsanti all'interno del gruppo


- `border-right: 1px solid #e0e0e0;`
Linea di separazione tra i gruppi di pulsanti


- `padding-right: 20px;`
Spazio a destra del gruppo di pulsanti


- `.spacer {flex: 1;`
Significa che l'elemento occupa tutto lo spazio disponibile, spingendo gli altri elementi verso i bordi del contenitore


## ANIMAZIONE ROTAZIONE ICONA REFRESH

- `.rotating {animation: spin 1s linear infinite;}` 
spin: significa che l'animazione deve essere eseguita in modo continuo, senza interruzioni.
linear: indica che l'animazione deve essere eseguita a velocità costante, senza accelerazioni o decelerazioni.
infinite: indica che l'animazione deve essere eseguita all'infinito, senza limiti di tempo.

- `@keyframes spin {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}`
@keyframes è una regola CSS che definisce un'animazione. In questo caso, l'animazione è chiamata "spin" e specifica che l'elemento deve ruotare da 0 gradi a 360 gradi.