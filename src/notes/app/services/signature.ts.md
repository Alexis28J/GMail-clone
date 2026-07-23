# COMMENTI

Per il mio progetto, ho deciso di utilizzare il servizio `SignatureService` per gestire la firma dell'email.

Questo servizio utilizza il `localStorage` per salvare e recuperare la firma e lo stato di abilitazione della firma. 

Ho implementato metodi per caricare, salvare e cancellare la firma, garantendo che i dati siano persistenti tra le sessioni dell'applicazione.

Purtroppo, se cambio browser o cancello la cache, i dati salvati nel `localStorage` andranno persi. 

`Mockapi` non mi permette di creare più di 2 resource, quindi il perché che sto usando il `localStorage` per salvare la firma. 

Tuttavia, se in futuro dovessi avere bisogno di una soluzione più robusta e persistente, potrei considerare l'implementazione di un backend o l'utilizzo di un database locale come IndexedDB per gestire le firme in modo più sicuro e affidabile.

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

