# COMMENTI

Per il mio progetto, ho deciso di utilizzare il servizio `SignatureService` per gestire la firma dell'email.

Questo servizio utilizza il `localStorage` per salvare e recuperare la firma e lo stato di abilitazione della firma. 

Ho implementato metodi per caricare, salvare e cancellare la firma, garantendo che i dati siano persistenti tra le sessioni dell'applicazione.

Purtroppo, se cambio browser o cancello la cache, i dati salvati nel `localStorage` andranno persi. 

`Mockapi` non mi permette di creare più di 2 resource, quindi il perché che sto usando il `localStorage` per salvare la firma. 

Tuttavia, se in futuro dovessi avere bisogno di una soluzione più robusta e persistente, potrei considerare l'implementazione di un backend o l'utilizzo di un database locale come IndexedDB per gestire le firme in modo più sicuro e affidabile.

```TYPESCRIPT
     ///// SIGNAL CHE CONTIENE IL TESTO DELLA FIRMA E LO STATO DI ABILITAZIONE
     signature = signal('');
     enabled = signal(false);


     ///// COSTRUTTORE CHE CARICA LA FIRMA DAL LOCAL STORAGE
     constructor() {
         this.loadSignature();
     }


     ///// METODO PRIVATO CHE CARICA LA FIRMA DAL LOCAL STORAGE
     private loadSignature() {
         const savedSignature = localStorage.getItem('emailSignature');  
         const enabled = localStorage.getItem('emailSignatureEnabled');  

         if (savedSignature) {  
             this.signature.set(savedSignature); 
         }
         this.enabled.set(enabled === 'true'); 
     }


     ///// METODO PUBBLICO CHE SALVA LA FIRMA NEL LOCAL STORAGE
     saveSignature(
         signature: string,
         enabled: boolean
     ) {
         localStorage.setItem( 
             'emailSignature',  
             signature  
         );

         localStorage.setItem(  
             'emailSignatureEnabled',  
             String(enabled)  
         );

         this.signature.set(signature);   
         this.enabled.set(enabled); 
      }


     ///// METODO PUBBLICO CHE ELIMINA LA FIRMA DAL LOCAL STORAGE
     deleteSignature() {
         localStorage.removeItem('emailSignature');   
         localStorage.removeItem('emailSignatureEnabled'); 

         this.signature.set('');  
         this.enabled.set(false); 
     }


     ///// METODO PUBBLICO CHE RESTITUISCE IL TESTO DELLA FIRMA SE ABILITATA, ALTRIMENTI UNA STRINGA VUOTA
     getSignatureText(): string {
         if (!this.enabled()) {  
             return '';
         }
         return this.signature();
     }
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## COSTRUTTORE 

```TYPESCRIPT
    signature = signal('');
    enabled = signal(false);
```
I signal vengono inizializzati prima del costruttore perché devono essere disponibili subito dopo l'istanziazione del servizio, quindi non possono essere inizializzati nel costruttore.


```TYPESCRIPT
   constructor() {
   this.loadSignature();  //Carica la firma e lo stato di abilitazione dal localStorage all'inizializzazione del servizio
   }
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO PRIVATO CHE CARICA LA FIRMA DAL LOCAL STORAGE

```TYPESCRIPT
    private loadSignature() {
        const savedSignature = localStorage.getItem('emailSignature');  // Recupera la firma salvata dal local storage
        const enabled = localStorage.getItem('emailSignatureEnabled');  // Recupera lo stato di abilitazione della firma dal local storage

        if (savedSignature) {  // Se esiste una firma salvata
            this.signature.set(savedSignature);  // Imposta il valore della firma nel signal
        }
        this.enabled.set(enabled === 'true')  // Imposta lo stato di abilitazione nel signal
    }
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO PUBBLICO CHE SALVA LA FIRMA NEL LOCAL STORAGE

```TYPESCRIPT
    saveSignature(
        signature: string,
        enabled: boolean
    ) {
        localStorage.setItem( //imposto la firma nel local storage
            'emailSignature',  //'emailSignature' è la chiave per salvare la firma nel local storage
            signature  // 'signature' è il valore della firma da salvare
        );

        localStorage.setItem(  //imposto lo stato di abilitazione della firma nel local storage
            'emailSignatureEnabled',  //'emailSignatureEnabled' è la chiave per salvare lo stato di abilitazione della firma nel local storage
            String(enabled)  // 'enabled' è il valore dello stato di abilitazione della firma da salvare
        );

        this.signature.set(signature);   //imposto il valore della firma nel signal
        this.enabled.set(enabled);  //imposto il valore dello stato di abilitazione della firma nel signal
    }
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO PUBBLICO CHE ELIMINA LA FIRMA DAL LOCAL STORAGE

```TYPESCRIPT
    deleteSignature() {
        localStorage.removeItem('emailSignature');   // rimuove la firma dal local storage
        localStorage.removeItem('emailSignatureEnabled'); // rimuove lo stato di abilitazione dal local storage

        this.signature.set('');  // resetta il segnale della firma a una stringa vuota
        this.enabled.set(false); // resetta il segnale di abilitazione a false
    }
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO PUBBLICO CHE RESTITUISCE IL TESTO DELLA FIRMA SE ABILITATA, ALTRIMENTI UNA STRINGA VUOTA

```TYPESCRIPT
    getSignatureText(): string {
        if (!this.enabled()) {
            return '';
        }

        return this.signature();
    }
```
Questo metodo serve per ottenere il testo della firma solo se è abilitata. 
Se la firma non è abilitata, restituisce una stringa vuota.
Il metodo viene usato nel componente `ComposeDialog` per inserire la firma nel corpo dell'email solo se l'utente ha scelto di abilitarla.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## MODIFICA METODI PER LA GESTIONE DELLA FIRMA (VERSIONE CHE SUPPORTA PIù FIRME)
### Modifiche: `signatureInterface, signatureService, signatureDialog`

Ho modificato tutta la classe SignatureService in modo che possa gestire più firme e non solo una. 
Ho aggiunto un array di firme, un id della firma attiva e un flag per abilitare/disabilitare le firme. 
Ho anche aggiunto metodi per aggiungere, aggiornare, eliminare e impostare la firma attiva.


- VARIABILI CHE CONTENGONO LO STATO DELLE FIRME

```TYPESCRIPT
    signatures = signal<SignatureInterface[]>([]);
    activeSignatureId = signal<string | null>(null);
    enabled = signal(false);
```
`signatures` è un segnale che contiene un array di oggetti `SignatureInterface`, che rappresentano le firme salvate dall'utente.
`activeSignatureId` è un segnale che contiene l'ID della firma attiva, ovvero quella che verrà utilizzata come firma predefinita.
`enabled` è un segnale booleano che indica se la funzionalità di firma è abilitata o meno.


- COSTRUTTORE CHE INIZIALIZZA LO STATO DELLE FIRME

```TYPESCRIPT
    constructor() {  
        this.load();
    }
```
Questo `costruttore` viene chiamato quando il servizio viene creato. In questo caso, viene utilizzato per caricare lo stato delle firme dal `local storage`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE CARICA LO STATO DELLE FIRME DAL LOCAL STORAGE

```TYPESCRIPT
    private load() {
        // Recupera le firme salvate, l'ID della firma attiva e lo stato di abilitazione dal local storage
        const signatures = localStorage.getItem('emailSignatures');
        const activeId = localStorage.getItem('activeSignatureId');
        const enabled = localStorage.getItem('emailSignatureEnabled');

        // Se le firme salvate esistono, aggiorna lo stato delle firme con il valore recuperato dal local storage
        // In altre parole, se ci sono firme salvate nel local storage, le carica nello stato delle firme (il che significa che il servizio le utilizzerà come firme disponibili).
        if (signatures) {
            this.signatures.set(
                JSON.parse(signatures)
            );
        }

        // Se l'ID della firma attiva esiste, aggiorna lo stato dell'ID della firma attiva con il valore recuperato dal local storage
        if (activeId) {
            this.activeSignatureId.set(activeId);
        }

        // Altrimenti, aggiorna lo stato di abilitazione con il valore recuperato dal local storage (convertito in booleano)
        this.enabled.set(
            enabled === 'true'
        );
    }
```
Questo metodo viene chiamato nel costruttore per inizializzare lo stato delle firme quando il servizio viene creato.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE SALVA LO STATO DELLE FIRME NEL LOCAL STORAGE

    ```TYPESCRIPT
    private persist() {

        localStorage.setItem(  // Sul localStorage, salvo lo stato delle firme 
            'emailSignatures',  // trasformando le firme in una stringa JSON e salvandole con la chiave 'emailSignatures',  
            JSON.stringify(this.signatures())  
        );

        localStorage.setItem(  // Salva l'ID della firma attiva nel local storage con la chiave 'activeSignatureId'
            'activeSignatureId',
            this.activeSignatureId() ?? ''
        );

        localStorage.setItem(  // Salva lo stato dell'abilitazione della firma nel local storage
            'emailSignatureEnabled',
            String(this.enabled())
        );
    }
```
Questo metodo viene chiamato ogni volta che viene aggiunta, aggiornata o eliminata una firma, oppure quando viene impostata la firma di default o quando viene attivata/disattivata la firma.

In parole semplici, ogni volta che lo stato delle firme cambia, viene salvato nel `local storage`.

Non confondere questo metodo con il metodo `save()` della classe SignatureDialog, che salva solo la firma selezionata. Questo metodo salva lo stato di tutte le firme.

In questo modo, lo stato delle firme viene sempre salvato nel `local storage` e non viene perso al refresh della pagina.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE AGGIUNGE UNA NUOVA FIRMA

```TYPESCRIPT
    addSignature(
        name: string,
        content: string
    ) {
        const signature: SignatureInterface = {  // Crea un oggetto SignatureInterface con un ID univoco generato da crypto.randomUUID()
            id: crypto.randomUUID(),
            name,
            content
        }

        this.signatures.update(  // Aggiorna lo stato delle firme aggiungendo la nuova firma
            signatures => [...signatures, signature] // ...signatures: copia tutte le firme esistenti, signature: aggiunge la nuova firma
        ); // in parole semplici, copia l'array esistente e aggiunge la nuova firma

        if (!this.activeSignatureId()) {  // Se non c'è una firma attiva
            this.activeSignatureId.set(signature.id); // Impostiamo la nuova firma come attiva se non ce n'è già una
        }
        
        this.persist();  // Persistiamo (cioè salviamo) lo stato aggiornato delle firme
    }
```

Questo metodo aggiunge una nuova firma e la imposta come firma attiva se non ce n'è già una.

### `crypto.randomUUID()` è un metodo di `JavaScript` che genera un identificatore univoco casuale.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE AGGIORNA UNA FIRMA ESISTENTE

```TYPESCRIPT
    updateSignature(signature: SignatureInterface) {

        this.signatures.update(  // Aggiorna la lista delle firme
            signatures =>
                signatures.map(s =>  // Mappa le firme esistenti, cioè crea una copia, 
                    s.id === signature.id  // e aggiorna quella corrispondente all'ID della firma passata come parametro
                        ? signature  
                        : s)
        );

        this.persist();  // Salva le modifiche nel local storage
    }
```
Questo metodo prende un oggetto `SignatureInterface` come parametro e aggiorna la firma corrispondente nella lista delle firme. Utilizza il metodo `update` del segnale `signatures` per mappare le firme esistenti e sostituire quella con l'id corrispondente con la nuova firma passata come parametro. Infine, chiama il metodo `persist` per salvare lo stato aggiornato nel `local storage`.

### NB: `signature.id ? signature : s` - significa che se l'id della firma corrisponde a quello passato come parametro, allora aggiorna la firma con i nuovi valori, altrimenti mantiene la firma originale

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE ELIMINA UNA FIRMA ESISTENTE

```TYPESCRIPT
    deleteSignature(id: string) {
        this.signatures.update(  // Aggiorna la lista delle firme
            signatures =>
                signatures.filter(  // Filtra le firme per rimuovere quella con l'id specificato
                    s => s.id !== id  // Restituendo solo le firme che non hanno l'id specificato
                )
        );

        if (this.activeSignatureId() === id) { // se la firma eliminata era quella attiva, impostiamo la prima firma come attiva
            const first = this.signatures()[0];

            this.activeSignatureId.set(
                first?.id ?? null  // Se non ci sono firme, impostiamo a null
            );
        }

        this.persist();   // salva lo stato aggiornato delle firme nel local storage
    }
```
Questo metodo elimina una firma esistente dall'elenco delle firme. Se la firma eliminata era quella attiva, imposta la prima firma disponibile come attiva. Infine, salva lo stato aggiornato nel local storage.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE IMPOSTA LA FIRMA DI DEFAULT

```TYPESCRIPT
    setActiveSignature(id: string) {
        this.activeSignatureId.set(id); // Imposta l'ID della firma attiva
        this.persist();  // Salva lo stato aggiornato nel local storage
    }
```

Questo metodo imposta la firma di default selezionata dall'utente. Viene salvata nel local storage e utilizzata come firma predefinita per le email.

Questo metodo viene chiamato quando l'utente seleziona una firma come predefinita nella finestra di dialogo delle firme. Nel mio caso, basta solo cliccare sulla firma desiderata e questa diventa automaticamente la firma di default. Non è necessario un pulsante separato per confermare la selezione.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE ATTIVA/DISATTIVA LA FIRMA

```TYPESCRIPT
    setEnabled(enabled: boolean) {
        this.enabled.set(enabled);  // Imposta lo stato della firma abilitata/disabilitata. Cioè, se enabled è true, la firma sarà abilitata; se è false, sarà disabilitata.
        this.persist();   // Salva lo stato nel local storage
    }
```
Questo metodo imposta lo stato della firma attiva (abilitata o disabilitata) e salva lo stato nel local storage.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE RESTITUISCE IL TESTO DELLA FIRMA ATTIVA

```TYPESCRIPT
    getSignatureText(): string {
        if (!this.enabled()) {  // Se la firma non è abilitata, restituisci una stringa vuota
            return '';
        }

        const active = this.signatures().find(  // Quello che fa è trovare la firma attiva 
            s => s.id === this.activeSignatureId() // nella lista delle firme in base all'ID della firma attiva. 
        );

        return active?.content ?? '';  // Se trova la firma, restituisce il contenuto della firma attiva o una stringa vuota se non esiste
    }
```
Questo metodo restituisce il contenuto della firma attiva se la firma è abilitata, altrimenti restituisce una stringa vuota.