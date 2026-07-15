## METODO INIZIALE ALL SELECTED
 
 ```typescript
  // Metodo iniziale senza computed
  isAllSelected(): boolean {
    const visibleEmails = this.folderService.filteredEmails();
    const selectableEmails = visibleEmails.filter(e => !e.is_deleted);
    return selectableEmails.length > 0 && selectableEmails.every(e => e.selected);
  }
 ``` 

Metodo per verificare se tutte le email visibili sono selezionate.

La differenza tra il metodo iniziale e la versione con `computed` è che la versione con `computed` crea una proprietà reattiva che si aggiorna automaticamente quando le email visibili cambiano, mentre il metodo iniziale richiede una chiamata esplicita per verificare lo stato di selezione.

Prima avevo messo un tipo di ritorno `boolean`, ma non è necessario perché TypeScript lo deduce automaticamente.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## METODO INIZIALE IS PARTIALLY SELECTED

 ```typescript
  // Metodo inizale senza computed
  isPartiallySelected(): boolean {
    const visibleEmails = this.folderService.filteredEmails();
    const selectableEmails = visibleEmails.filter(e => !e.is_deleted);
    const selectedCount = selectableEmails.filter(e => e.selected).length;
    return selectedCount > 0 && selectedCount < selectableEmails.length;
  }
``` 
Ho SOSTITUITO il metodo `allSelected()` con una proprietà calcolata (`computed`) per migliorare le prestazioni e la reattività del componente. La logica rimane la stessa, ma ora `allSelected` è una proprietà che si aggiorna automaticamente quando le email visibili cambiano, senza dover chiamare esplicitamente un metodo.

Avevo messo `boolean` come tipo di ritorno, ma non serve perché `computed()` lo deduce da solo. Cioè, se ritorna `true` o `false`, `computed()` lo capisce da solo e non serve specificarlo.