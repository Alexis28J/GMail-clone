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


## FOLDERSIGNAL INIZIALIZZATO CON I FOLDER DEL SISTEMA

```typescript
  Ho commentato la parte che inizializzava le cartelle di sistema direttamente nel signal, perché ora le carico da API e aggiungo le cartelle di sistema in loadFolders().
  private foldersSignal = signal<FolderInterface[]>(
    [
      { id: 'inbox', name: 'Inbox', icon: 'inbox', movable: true },
      { id: 'starred', name: 'Special', icon: 'star', movable: false },
      { id: 'snoozed', name: 'Snoozed', icon: 'watch_later', movable: false },
      { id: 'sent', name: 'Sent', icon: 'send', movable: false },
      { id: 'drafts', name: 'Drafts', icon: 'drafts', movable: false },
      { id: 'spam', name: 'Spam', icon: 'report', movable: false },
      { id: 'important', name: 'Important', icon: 'label_important', movable: false },
      { id: 'personal', name: 'Personal', icon: 'person', movable: false },
      { id: 'archived', name: 'Archived', icon: 'archive', movable: false },
      { id: 'work', name: 'Work', icon: 'work', movable: false },
      { id: 'trash', name: 'Trash', icon: 'delete', movable: false },
    ]
  );
  ```


## FILTRO (SOLO) CARTELLE CON FILTERED EMAILS 

```typescript
filteredEmails = computed(() => {...
 switch (folder) {
      case 'starred':
        return emails.filter(e => e.starred && !e.is_deleted);
        break;
      case 'important':
        return emails.filter(e => e.label === 'Important' && !e.is_deleted);
        break;
      case 'spam':
        return emails.filter(e => e.folder === 'spam');
        break;
      case 'trash':
        return emails.filter(e => e.is_deleted === true);
        break;
      case 'drafts':
        return emails.filter(e => e.folder === 'drafts');
        break;
      case 'sent':
        return emails.filter(e => e.folder === 'sent');
        break;
      case 'personal':
        return emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        break;
      case 'work':
        return emails.filter(e => e.label === 'Work' && !e.is_deleted);
        break;
      case 'archived':
        return emails.filter(e => e.folder === 'archived');
        break;
      case 'snoozed':
        return emails.filter(e => e.folder === 'snoozed'); 
        break; 
      case 'inbox':
        return emails.filter(e => !e.is_deleted);
        default: return emails.filter(e => !e.is_deleted);
 }
 }
 )
```

Prima di usare `result`, ritornava direttamente il filtro, ma ora uso result per poter applicare anche il filtro di ricerca successivamente.

In parole povere, prima filtravo solo per cartella, ora filtro anche per ricerca (e per menu filtri).



### FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)

`if (filters.date) fields.push(email.timestamp.toString());`

Ho commentato il vecchio metodo di ricerca per la data perché non funzionava bene. La data è in formato stringa e non è facilmente ricercabile. Ho creato un metodo più complesso per rendere la data ricercabile in vari formati (es. 2026-06-14, 2026, 06, 6, 14, june, giugno).