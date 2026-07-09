# BLOCCHI DI CODICE INUTILIZZATI DEL SERVIZIO FOLDER (folder.ts)  

## FILTRO SEARCH 

Questa versione cerca in tutti i campi, anche quelli disattivati nel menu filtri.
Inoltre, non supporta la ricerca multi-keyword.

    ```typescript
    if (!search) return result;

    return result.filter(email =>   
      email.subject.toLowerCase().includes(search) ||
      email.sender.toLowerCase().includes(search) ||
      email.body.toLowerCase().includes(search) ||
      email.recipient.toLowerCase().includes(search)
    );
    ```


## FILTRO SEARCH (VERSIONE MULTIKEYWORD) 

Questa versione supporta la ricerca multi-keyword, ma NON il menu filtri. Cerca in tutti i campi.

Cioè se scrivo "lorem ipsum" cerca tutte le email che contengono sia "lorem" che "ipsum" in qualsiasi campo(subject, body, sender, recipient).

 ```typescript
 if (!search) return result;

const keywords = search.split(' ').filter(k => k.length > 0);

return result.filter(email => {     

  const fields = [
    email.subject,
    email.body,
    email.sender,
    email.recipient
  ].join(' ').toLowerCase();

  // return keywords.every(keyword => 
  //   searchableText.includes(keyword)); 

  return keywords.some(keyword =>
    fields.includes(keyword));

// every rende la ricerca AND, some rende la ricerca OR cioè every è più restrittivo, some è più permissivo.

    });
```
