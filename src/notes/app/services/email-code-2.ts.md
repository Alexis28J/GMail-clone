
# BLOCCHI DI CODICE INUTILIZZATI DEL SERVIZIO EMAIL (email.ts)  


## METODO SPECIFICO PER SPOSTARE UNA SINGOLA EMAIL IN UNA CARTELLA SPECIFICA

Serve se voglio integrarlo nel menu di una singola email.

```typescript
moveEmail(email: EmailInterface, targetFolder: string) {

    const updatedEmail = {
      ...email,
      folder: targetFolder
    };
    this.http.put<EmailInterface>(
      `${this.apiUrl}/${email.id}`,
      updatedEmail
    ).subscribe(() => {
      this.emailsSignal.update(emails =>
        emails.map(e =>
          e.id === email.id
            ? updatedEmail
            : e
        )
      );
    });
    }
```

### NB: `targetFolder` è la cartella di destinazione, ad esempio "work", "personal", "spam", ecc.

`updateSelectedEmails` e `moveEmail` sono due metodi distinti: il primo aggiorna tutte le email selezionate, mentre il secondo aggiorna una singola email specifica.

Quindi, se voglio spostare tutte le email selezionate in una cartella specifica, utilizzerei `moveSelectedEmails`, mentre se voglio spostare una singola email, utilizzerei `moveEmail`.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

## SIGNAL E METODI DI PULIZIA SOSTITUITI

`replyDraft = signal<Partial<EmailInterface> | null>(null);`

`forwardDraft = signal<Partial<EmailInterface> | null>(null);`

```typescript
clearForwardDraft() {
   this.forwardDraft.set(null);
  }

clearForwardDraft() {
   this.forwardDraft.set(null);
  }
```

Ho deciso di creare un singolo signal (`composeDraft`) per gestire le bozze di reply e forward. 
Pertanto, anche i due metodi di pulizia signal sono stati sostituiti per uno solo (`clearComposeDraft`).

Vedi: `email-3.ts.md`