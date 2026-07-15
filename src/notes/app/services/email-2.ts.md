## SEGNA COME PREFERITO (SPECIAL)
```typescript
  toggleStar(email: EmailInterface) {

    const starred = !email.starred;

    // il signal viene aggiornato localmente
    this.emailsSignal.update(emails =>
      emails.map(e =>
        e.id === email.id
          ? { ...e, starred } 
          : e
      )
    );

    // si aggiorna anche il mockapi.io con una richiesta HTTP PUT
    this.http.put(
      `${this.apiUrl}/${email.id}`,
      {
        ...email, 
        starred
      }
    ).subscribe();

      }
```      
Questo metodo aggiorna lo stato "starred" di un'email sia localmente nel signal che sul server mockapi.io tramite una richiesta `HTTP PUT`.

### NB: `...e` : significa che mantengo tutte le proprietà dell'email originale, ma sovrascrivo la proprietà `starred` con il nuovo valore.

### NB: `subscribe()` : vuoto perché non ho bisogno di fare nulla con la risposta, ma voglio comunque eseguire la richiesta `HTTP PUT` per aggiornare il mockapi.io



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## REFACTORING

Quindi ho deciso di creare un metodo privato `updateSelectedEmails(changes: Partial<EmailInterface>)` che accetta un oggetto `changes` contenente le modifiche da applicare alle email selezionate. In questo modo, posso riutilizzare questo metodo per eliminare, ripristinare o archiviare le email selezionate, evitando la duplicazione del codice.

### Perché farlo?
Ho tre metodi che fanno praticamente la stessa cosa:
`deleteSelectedEmails()` aggiorna: `is_deleted: true`
`restoreSelectedEmails()` aggiorna: `is_deleted: false`
`archiveSelectedEmails()` aggiorna: `folder: "archived"`

Il resto del codice è identico:
- trova le email selezionate
- esegue una PUT su MockAPI
- aggiorna il signal locale
- deseleziona le email


### 1. Quindi è meglio creare un metodo generico.
L'idea è: "Dammi quali campi vuoi modificare e ci penso io."

Per questo aggiungo: 
```typescript
private updateSelectedEmails(
  changes: Partial<EmailInterface>
) {...
}
```
Normalmente una EmailInterface richiede tutti i campi ma scrivendo `Partial<EmailInterface` diventano tutti opzionali.

Quindi possiamo passare:
```typescript
{
  folder: 'archived'
}
```
oppure:
```typescript
{
  is_deleted: true
}
```
senza dover specificare tutti gli altri campi.


### 2. Recupero le email selezionate
```typescript
const selectedEmails =
  this.emailsSignal().filter(e => e.selected); 
```
Supponiamo che nel signal abbiamo:
```typescript
[
  { id:'1', selected:true },
  { id:'2', selected:false },
  { id:'3', selected:true }
]
```
Dopo il filtro ottieni:
```typescript
[
  { id:'1', selected:true },
  { id:'3', selected:true }
]
```
Solo le email spuntate.


### 3. Ciclo le email
```typescript
selectedEmails.forEach(email => {
});
```
Primo giro: `email.id = "1"`
Secondo giro: `email.id = "3"`


### 4. Chiamare MockAPI
```typescript
this.http.put(
  `${this.apiUrl}/${email.id}`,
  ```
Se: 
```typescript
this.apiUrl =
'https://mockapi.io/emails'
```
e `email.id = "1"`,
diventa `https://mockapi.io/emails/1`


### 5. Preparare l'oggetto aggiornato (PARTE PIù IMPORTANTE)
```typescript
{
  ...email,
  ...changes,
  selected: false
}
```
Supponiamo che l'email sia: 
```typescript
{
  id: '1',
  subject: 'Hello',
  folder: 'inbox',
  selected: true
}
```
e che io abbia chiamato:
```typescript
updateSelectedEmails({
  folder: 'archived'
});
```
Primo spread: `...email`
produce: 
```typescript
{
  id: '1',
  subject: 'Hello',
  folder: 'inbox',
  selected: true
}
```

Secondo spread: `...changes`
sovrascrive: `folder: 'archived'`
ottenendo: 
```typescript
{
  id: '1',
  subject: 'Hello',
  folder: 'archived',
  selected: true
}
```

Infine: `selected: false`
sovrascrive ancora: 
```typescript
{
  id: '1',
  subject: 'Hello',
  folder: 'archived',
  selected: false
}
```

Questo è l'oggetto che verrà salvato.

### NB: Con "spread" si intende che l'oggetto email viene copiato e poi vengono sovrascritti i campi specificati in changes. In questo modo, si mantiene l'integrità dei dati originali dell'email, modificando solo i campi necessari.


### 6. Aggiorno il signal local
Quando mockapi risponde correttamente, aggiorno il signal localmente. 
In parole povere, quando la richiesta `HTTP PUT` va a buon fine, aggiorno il signal localmente per riflettere le modifiche apportate al server.

```typescript
.subscribe(() => {
this.emailsSignal.update(emails =>
```
emails rappresenta tutto l'array
Per ESEMPIO: 
```typescript
[
  { id:'1', folder:'inbox' },
  { id:'2', folder:'inbox' },
  { id:'3', folder:'inbox' }
]
```

### 7. Cercare l'email modificata

`emails.map(e => `:  esamina ogni elemento

`e.id === email.id`: se trova quella giusta allora la sostituisce


### 8. Applicare le modifiche
```typescript
{
  ...e,
  ...changes,
  selected:false
}
```
Quindi:
```typescript
{
  id:'1',
  folder:'inbox',
  selected:true
}
```
diventa: 
```typescript
{
  id:'1',
  folder:'archived',
  selected:false
}
```


 ## MODIFICA METODO ARCHIVIA EMAIL

 ```typescript
   archiveSelectedEmails() {
    this.moveSelectedEmails('archived');
  }
  ```
 Ho creato la funzione `moveSelectedEmails(folder: MovableFolder)` per spostare le email selezionate in una cartella specifica. In questo modo, la funzione `archiveSelectedEmails()` può semplicemente chiamare `moveSelectedEmails('archived')` per spostare le email selezionate nella cartella "archived". Questo evita la duplicazione del codice e rende il servizio più modulare e manutenibile.
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## SPOSTARE LE EMAIL SELEZIONATE IN UNA CARTELLA SPECIFICA (es. "work", "personal", "spam", ecc.)

  ## METODO GENERICO PER SPOSTARE LE EMAIL SELEZIONATE IN UNA CARTELLA SPECIFICA 

  ```typescript
  moveSelectedEmails(targetFolder: string) {
    this.updateSelectedEmails({
      folder: targetFolder,  
      is_deleted: false
    });
  }
  ```
### NB: `targetFolder` è la cartella di destinazione, ad esempio "work", "personal", "spam", ecc.

Questo metodo può essere utilizzato per spostare LE email selezionate in qualsiasi cartella specificata, e può essere richiamato da altre parti del codice, come ad esempio il componente della toolbar, 
per implementare la funzionalità di spostamento delle email in una cartella specifica.

Questo metodo sfrutta il metodo privato `updateSelectedEmails` per aggiornare la proprietà `folder` delle email selezionate, spostandole nella cartella `target` specificata. Inoltre, imposta `is_deleted` su false per assicurarsi che le email non siano contrassegnate come eliminate durante lo spostamento.


## PICCOLA MODIFICA del metodo "SPOSTARE LE EMAIL SELEZIONATE"

  ```typescript
  moveSelectedEmails(folder: MovableFolder) {
    this.updateSelectedEmails({
      folder: targetFolder,  
      is_deleted: false
    });
  }
  ```
Dopo aver creato il file `folders.constants.ts`, ho importato il tipo `MovableFolder` in `email.ts` e ho modificato il tipo del parametro della funzione `moveSelectedEmails` da `string` a `MovableFolder`.

Ho modificato il tipo del parametro da `string` a `MovableFolder` per garantire che solo le cartelle definite in `MOVABLE_FOLDERS` possano essere utilizzate come destinazione per lo spostamento delle email selezionate.

Successivamente, ho aggiornato il metodo `moveTo` nel componente `ToolbarComponent` per utilizzare il tipo `MovableFolder` come parametro, garantendo così la coerenza tra il servizio e il componente.


## SECONDA PICCOLA MODIFICA 

```typescript
  moveSelectedEmails(folder: string) {
    this.updateSelectedEmails({
      folder,  // significa che la proprietà folder delle email selezionate viene aggiornata con il valore passato come parametro
      is_deleted: false
    });
  }
```
Di nuovo, da MovableFolder a string, perché non voglio limitare le cartelle a quelle definite in `MOVABLE_FOLDERS`, ma voglio permettere di spostare le email in qualsiasi cartella, anche quelle personalizzate dall'utente. 

Per questo motivo, ho modificato il tipo del parametro della funzione `moveSelectedEmails` da `MovableFolder` a `string`, consentendo così una maggiore flessibilità nello spostamento delle email selezionate in qualsiasi cartella desiderata.

Inoltre, ho aggiornato il metodo `moveTo` nel componente `ToolbarComponent` per accettare un parametro di tipo `string`, garantendo così la coerenza tra il servizio e il componente.

`MovableFolder` è utile per limitare le cartelle a quelle definite in `MOVABLE_FOLDERS`, ma in questo caso voglio permettere di spostare le email in qualsiasi cartella, anche quelle personalizzate dall'utente.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

