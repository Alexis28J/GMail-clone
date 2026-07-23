# COMMENTI 

Questo componente rappresenta un dialogo per la gestione della firma dell'email. Utilizza il servizio `SignatureService` per salvare, eliminare e recuperare la firma e lo stato di abilitazione. Il dialogo contiene un `campo di input` per la firma e un `toggle` per abilitare o disabilitare la firma.

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
