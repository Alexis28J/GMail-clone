
## VERSIONE SINGOLA FIRMA

```scss
///// CONTAINER SIGNATURE DIALOG
.signature-dialog {
    display: flex;
    flex-direction: column;
    // per dargli più spazio in modo che non debba scrollare
    min-height: 620px;
}


///// HOST (SELETTORE) DEL DIALOG
:host {
    display: block;
}


///// TITOLO DIALOG
.signature-title {
    display: flex;
    gap: 8px;
    background: rgb(236, 226, 226);
    padding: 22px 22px;
    margin-top: -2px;
    font-weight: 500;
    font-size: 22px;
}


///// CONTENUTO DEL DIALOG
mat-dialog-content {
    min-width: 350px;
    padding-top: 1px !important;
}


///// DESCRIZIONE DELLA FUNZIONALITÀ
.description {
  color: #5f6368;
  font-size: 14px;
  text-align: center;
}


mat-form-field {
    width: 100%;
    padding-top: 8px;
}


///// AREA DI TESTO PER LA FIRMA
textarea {
  resize: vertical;
  min-height: 80px;
}


///// SPAZIO PER LA PREVIEW DELLA FIRMA
.preview-section {
  margin-top: -10px;
}


///// BOX DI PREVIEW DELLA FIRMA (AREA DI TESTO NON MODIFICABILE)
.preview-box {
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 12px;
  margin-top: -10px;
  background: #fafafa;
  white-space: pre-wrap;
}


///// TOGGLE PER ABILITARE/DISABILITARE LA FIRMA
mat-slide-toggle {
  margin-top: 16px;
}


///// BOTTONE DELETE
.delete-btn {
    color: rgb(241, 133, 133) !important;
    font-weight: bold;
    border: 1px solid rgb(241, 133, 133) !important;
}

.delete-btn:hover {
    background-color: rgb(248, 221, 221);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease;
}


///// BOTTONE SAVE
.save-btn {
    font-weight: bold;
    color: white !important;
    background-color: rgb(241, 133, 133) !important;
}

.save-btn:hover {
    background-color: red !important;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease;
}
```

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## NUOVA VERSIONE CHE SUPPORTA PIù FIRME

```scss
///// HOST (SELETTORE) DEL DIALOG
:host {
    display: block;
    width: 100%;
}


///// TITOLO DIALOG
.signature-title {
    display: flex;
    gap: 8px;
    background: rgb(236, 226, 226);
    padding: 22px 22px;
    margin-top: 0px;
    font-weight: 500;
    font-size: 22px;
}


///// CONTENUTO DEL DIALOG
mat-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 350px;
    padding-top: 1px !important;
    overflow-y: auto;
}


///// LAYOUT DEL DIALOG (LISTA FIRME + EDITOR FIRMA)
.signature-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

mat-slide-toggle {
    margin-bottom: 10px;
}


///// LISTA DELLE FIRME
.signature-list {
    width: 220px;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 2px;
}


///// ITEM DELLA LISTA DELLE FIRME
.signature-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.signature-item button {
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    transition: all .2s ease;
}

.signature-item button:hover {
    color: rgb(241, 133, 133);
}

input[type="radio"] {
    accent-color: rgb(241, 133, 133);
}


///// PULSANTE ADD SIGNATURE
.add-btn {
    color: rgb(241, 133, 133) !important;
    font-weight: bold;
    border: 1px solid rgb(241, 133, 133) !important;
    width: 100%;
    margin-top: 10px;
}

.add-btn:hover {
    background-color: rgb(248, 221, 221);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease;
}


///// LINEA DIVISORIA VERTICALE TRA LISTA FIRME E EDITOR FIRMA
.spacer {
    border-left: 1px solid #e0e0e0;
    height: auto;
    /* Assicura che la linea divisoria si estenda per tutta l'altezza del contenitore */
    align-self: stretch;
    margin: 10px 0;
    /* Aggiunge un po' di spazio sopra e sotto la linea divisoria */
}


///// CONTAINER PER L'EDITOR DELLA FIRMA
.signature-editor {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 8px;
}


///// DESCRIZIONE DELLA FUNZIONALITÀ
.description {
    color: #5f6368;
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 0;
}


///// CAMPO DI TESTO PER L'EDITOR DELLA FIRMA
mat-form-field {
    width: 100%;
}

textarea {
    resize: vertical;
    min-height: 180px;
}


///// SEZIONE DI PREVIEW DELLA FIRMA
.preview-section {
    display: flex;
    flex-direction: column;
    padding-bottom: 17px;

    h3 {
        margin: 8px 0;
        font-size: 16px;
        font-weight: 500;
        color: #202124;
        text-align: center;
    }
}


///// BOX DI PREVIEW DELLA FIRMA (AREA DI TESTO NON MODIFICABILE)
.preview-box {
    border: 1px solid #dadce0;
    border-radius: 12px;
    padding: 16px;
    background: #fafafa;
    white-space: pre-wrap;
    min-height: 100px;
}


///// AZIONI DEL DIALOG (PULSANTI)
mat-dialog-actions {
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
}


///// BOTTONE DELETE
.delete-btn {
    color: rgb(241, 133, 133) !important;
    font-weight: bold;
    border: 1px solid rgb(241, 133, 133) !important;
}

.delete-btn:hover {
    background-color: rgb(248, 221, 221);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease;
}


///// BOTTONE SAVE
.save-btn {
    font-weight: bold;
    color: white !important;
    background-color: rgb(241, 133, 133) !important;
}

.save-btn:hover {
    background-color: red !important;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease;
}
```