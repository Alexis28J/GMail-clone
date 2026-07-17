# COMMENTI


## MOSTRA ERRORE LIVE:  
Serve per mostrare un messaggio di errore in tempo reale quando le password non corrispondono


## VISIBILITÀ DELLA PASSWORD: 
Serve per mostrare o nascondere la password. Ho deciso di utilizzare le icone di Material Icons per rappresentare lo stato della visibilità della password


## INDICATORE DI FORZA DELLA PASSWORD E DELLE REGOLE: 
Serve per mostrare la forza della password inserita dall'utente. In questo caso, viene considerata "Weak" se la lunghezza della password è inferiore a 6 caratteri e "Strong" altrimenti.

-     
```html
            <!-------------------------  INDICATORE DI FORZA DELLA PASSWORD e DELLE REGOLE  -------------------->
            <!-- <p>
            Strength:
            {{ password.length < 6 ? 'Weak' : 'Strong' }} </p> -->
```

Ho commentato la parte precedente e ho aggiunto una nuova implementazione utilizzando i metodi getPasswordStrength() e getPasswordStrengthColor() del componente.
In questo modo, la forza della password viene calcolata dinamicamente in base alla lunghezza della password inserita dall'utente.
- Inoltre, ho aggiunto delle regole visive per indicare se la password soddisfa determinati criteri, come la presenza di lettere maiuscole, minuscole, numeri e caratteri speciali.


## DISABILITA IL PULSANTE DI REGISTRAZIONE SE I CAMPI NON SONO COMPLETI: 
Serve per impedire all'utente di registrarsi se non ha compilato tutti i campi obbligatori.
`[disabled]="!email || !password || !confirmPassword"` significa che il pulsante sarà disabilitato finché uno dei campi obbligatori non è compilato.
`[disabled]` è un binding di proprietà in Angular che permette di collegare una proprietà del componente a un attributo HTML.