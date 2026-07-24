# COMMENTI 

Questo componente rappresenta un dialogo per la gestione della `firma dell'email`. Utilizza il servizio `SignatureService` per salvare, eliminare e recuperare la firma e lo stato di abilitazione. Il dialogo contiene un `campo di input` per la firma e un `toggle` per abilitare o disabilitare la firma.

```TYPESCRIPT
  ///// VARIABILI CHE CONTENGONO IL TESTO DELLA FIRMA E LO STATO DI ABILITAZIONE
  signature = '';
  enabled = false;


  ///// COSTRUTTORE CHE INIETTA IL SERVIZIO DELLA FIRMA
  constructor(
    private signatureService: SignatureService
  ) {
       this.signature = this.signatureService.signature();
       this.enabled = this.signatureService.enabled();
    }


   ///// SALVA LA FIRMA E LO STATO DEL TOGGLE
   save() {
     this.signatureService.saveSignature(  
       this.signature,
       this.enabled
     );
   }


   ///// ELIMINA LA FIRMA E LO STATO DEL TOGGLE
   delete() {
     this.signatureService.deleteSignature(); 
     this.signature = '';
     this.enabled = false;
   }
```


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## COSTRUTTORE

```TYPESCRIPT
signature = '';
enabled = false;
```

Le variabili vengono inizializzate per primo perché il costruttore viene eseguito prima del caricamento del template, quindi se non vengono inizializzate, il template non le trova e genera un errore.

```TYPESCRIPT
  constructor(
    private signatureService: SignatureService
  ) {
    this.signature = this.signatureService.signature();  
    this.enabled = this.signatureService.enabled(); 
  }
```
Imposto il valore della firma dal servizio. Prendo il valore della firma dal servizio e lo assegno alla variabile locale `"signature"`.

Imposto il valore dello stato di abilitazione dal servizio. Prendo il valore dello stato di abilitazione dal servizio e lo assegno alla variabile locale `"enabled"`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## SALVA LA FIRMA E LO STATO DEL TOGGLE

```TYPESCRIPT
  save() {
    this.signatureService.saveSignature(  // salva la firma e lo stato del toggle nel servizio della firma
      this.signature,
      this.enabled
    );
  }
```


## ELIMINA LA FIRMA E LO STATO DEL TOGGLE

```TYPESCRIPT
  delete() {
    this.signatureService.deleteSignature();  // elimina la firma e lo stato del toggle dal servizio della firma
    this.signature = '';
    this.enabled = false;
  }
```
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## MODIFICA METODI PER LA GESTIONE DELLA FIRMA DIGITALE (VERSIONE CHE SUPPORTA VARI FIRME)
### Modifiche: `signatureInterface, signatureService, signatureDialog`


## VARIABILI CHE CONTENGONO LO STATO DELLA FIRMA SELEZIONATA

```TYPESCRIPT
  selectedId: string | null = null; // ID della firma selezionata
  name = '';  // Nome della firma selezionata
  content = '';  // Contenuto della firma selezionata
  enabled = false;  // Stato di abilitazione della firma
  ```


## COSTRUTTORE CHE INIZIALIZZA LO STATO DELLA FIRMA SELEZIONATA

```TYPESCRIPT
  constructor(
    public signatureService: SignatureService // Inizializza il servizio delle firme nel costruttore del componente, rendendolo disponibile per l'uso all'interno della classe.
  ) {
    this.enabled = this.signatureService.enabled();  // Inizializza lo stato di abilitazione della firma

    const active = this.signatureService.signatures().find(  // Trova la firma attiva
      s => s.id === this.signatureService.activeSignatureId()  // Confronta l'id della firma con l'id della firma attiva
    );

    if (active) {    // Se esiste una firma attiva, selezionala
      this.selectSignature(active);
    }
  }
  ```
Il costruttore riceve il servizio SignatureService come dipendenza e inizializza lo stato della firma selezionata. Se esiste una firma attiva, la seleziona automaticamente.

In questo modo, quando il dialogo viene aperto, l'utente vede immediatamente la firma attiva e può modificarla o crearne una nuova.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE SELEZIONA UNA FIRMA 

```TYPESCRIPT
  selectSignature(
    signature: SignatureInterface  // riceve un oggetto di tipo SignatureInterface come parametro
  ) {
    this.selectedId = signature.id || null;  // assegna l'id della firma selezionata alla variabile selectedId
    this.name = signature.name || '';  // assegna il nome della firma selezionata alla variabile name
    this.content = signature.content || '';  // assegna il contenuto della firma selezionata alla variabile content
  }
```

Questo metodo viene chiamato quando l'utente seleziona una firma dalla lista delle firme disponibili. Imposta lo stato della firma selezionata (id, nome e contenuto) in modo che possa essere visualizzato e modificato nell'interfaccia utente.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE CREA UNA NUOVA FIRMA

```TYPESCRIPT
  newSignature() {
    this.selectedId = null;
    this.name = '';
    this.content = '';
  }
```
Questo metodo resetta le variabili che contengono lo stato della firma selezionata. 
Quindi, se l'utente clicca sul pulsante "Nuova firma", il form verrà svuotato e pronto per l'inserimento di una nuova firma.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE SALVA LA FIRMA SELEZIONATA

```TYPESCRIPT
  save() {

    if (!this.name.trim()) {  // Se il nome della firma è vuoto, non fare nulla
      return;
    }

    if (this.selectedId) {   // Se esiste un ID selezionato, aggiorna la firma esistente

      this.signatureService.updateSignature({
        id: this.selectedId,
        name: this.name,
        content: this.content
      });

    } else {   // Altrimenti, aggiungi una nuova firma

      this.signatureService.addSignature(
        this.name,
        this.content
      );

    }

  }
 ```
Questo metodo verifica se il campo `"name"` non è vuoto e, in caso contrario, aggiorna la firma esistente o ne crea una nuova utilizzando i metodi del servizio `SignatureService`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE ELIMINA LA FIRMA SELEZIONATA

```TYPESCRIPT
  delete() {

    if (!this.selectedId) { // Se non c'è una firma selezionata, non fare nulla
      return;
    }

    this.signatureService.deleteSignature(  // Elimina la firma selezionata
      this.selectedId
    );

    this.newSignature();  // Resetta lo stato della firma selezionata

  }
```
Questo metodo elimina la firma selezionata utilizzando il servizio `SignatureService`. Se non c'è una firma selezionata (`selectedId è null`), il metodo termina senza fare nulla. Altrimenti, chiama il metodo `deleteSignature` del servizio passando l'ID della firma selezionata e poi resetta lo stato della firma selezionata chiamando `newSignature()`.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE IMPOSTA LA FIRMA DI DEFAULT

```TYPESCRIPT
  setDefault(id: string) {
    this.signatureService.setActiveSignature(id); // Imposta la firma selezionata come firma di default grazie al metodo setActiveSignature del servizio SignatureService che aggiorna la proprietà activeSignatureId con l'id della firma selezionata.
  }
```

Questo metodo imposta la firma selezionata come firma di default, utilizzando il servizio `SignatureService` per aggiornare l'ID della firma attiva.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO CHE ATTIVA/DISATTIVA LA FIRMA

```TYPESCRIPT
  toggleEnabled() {
    this.signatureService.setEnabled(this.enabled); // Attiva o disattiva la firma in base allo stato corrente grazie al servizio SignatureService che gestisce lo stato globale della firma.
  }
```
Questo metodo viene chiamato quando l'utente interagisce con il toggle per abilitare o disabilitare la firma.
