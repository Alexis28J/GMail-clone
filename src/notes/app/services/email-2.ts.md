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