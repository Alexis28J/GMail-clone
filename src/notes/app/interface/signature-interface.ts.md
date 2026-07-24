
## INTERFACCIA FIRME

Questa interfaccia rappresenta una firma e viene utilizzata per tipizzare gli oggetti che contengono le informazioni relative a ciascuna firma.

## VERSIONE PER UNA SINGOLA FIRMA

```TYPESCRIPT
export interface SignatureInterface {
    id?: string;
    content?: string;
    enabled?: boolean;
}
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## NUOVA VERSIONE (PER PIù FIRME)
### Modifiche: `signatureInterface, signatureService, signatureDialog`

```TYPESCRIPT
export interface SignatureInterface {
    id: string;
    name: string;
    content: string;
}
```

 Ho sostituito l'interfaccia `SignatureInterface` con una nuova versione che include un campo `"name"` obbligatorio, oltre ai campi `"id"` e `"content"`. Il campo `"enabled"` è stato rimosso perché la gestione dello stato di abilitazione della firma è ora gestita separatamente nel servizio `SignatureService`.