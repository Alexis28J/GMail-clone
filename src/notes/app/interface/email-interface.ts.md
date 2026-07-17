# COMMENTI

- `Un'interfaccia` in TypeScript è una struttura che definisce la forma di un oggetto. 
In questo caso, l'interfaccia `EmailInterface` definisce le proprietà che un oggetto email deve avere, come id, sender, recipient, subject, body, timestamp, starred, label, folder e selected.

- `folder` indica la cartella in cui si trova l'email (ad esempio, "inbox", "sent", "drafts", ecc.).

- `selected` è una proprietà opzionale che indica se l'email è selezionata o meno (ad esempio, per operazioni di massa come eliminare o spostare più email contemporaneamente).

- `is_deleted` è una proprietà che indica se l'email è stata eliminata o meno. Questo può essere utile per implementare una funzionalità di "cestino" o "trash" dove le email eliminate vengono spostate invece di essere cancellate definitivamente.


## TRANSIZIONE A MOCKAPI
`MockAPI` genera un id come stringa, quindi è meglio usare `string` invece di `number`.
L'ordine delle proprietà su `mockapi` deve essere lo stesso dell'interfaccia `EmailInterface`, altrimenti mockapi non riesce a mappare correttamente i dati.
Incluso il campo `folder` per indicare la cartella in cui si trova l'email, in modo da poter filtrare le email in base alla cartella (ad esempio, "inbox", "sent", "drafts", ecc.).
Anche i nomi delle proprietà devono essere gli stessi dell'interfaccia `EmailInterface`, altrimenti mockapi non riesce a mappare correttamente i dati.
`Mockapi` non supporta le proprietà opzionali, quindi la proprietà `selected` dovrà essere gestita localmente nel servizio `EmailService`. 
Tuttavia, la proprietà `selected` è ancora presente nell'oggetto email, ma non viene inviata a `mockapi`. Invece, viene gestita localmente nel servizio EmailService per tenere traccia delle email selezionate dall'utente.


## MODIFICA
Ho SOSTITUITO la proprietà `timestamp` di tipo `Date` con una proprietà `timestamp` di tipo `string | number` per consentire una maggiore flessibilità nella gestione dei valori di `timestamp`. 
In questo modo, il `timestamp` può essere rappresentato come una stringa o un numero, a seconda delle esigenze dell'applicazione.