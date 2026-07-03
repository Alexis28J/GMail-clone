import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Folder } from '../../../services/folder';
import { EmailService } from '../../../services/email';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-toolbar-component',
  imports: [MatIcon, MatTooltipModule, MatCheckboxModule],
  templateUrl: './toolbar-component.html',
  styleUrls: ['./toolbar-component.scss'],
})

export class ToolbarComponent {

  constructor(public folderService: Folder, private emailService: EmailService) { }

  @Input() canGoNext = true;
  @Input() canGoPrev = true;
  @Input() isTrashView = false;

  @Output() nextMail = new EventEmitter<void>();
  //@Output() nextMail = new EventEmitter<EmailInterface>();

  @Output() prevMail = new EventEmitter<void>();
  //@Output() prevMail = new EventEmitter<EmailInterface>();

  @Output() delete = new EventEmitter<void>();

  @Output() restore = new EventEmitter<void>();

  onNext() {
    this.nextMail.emit();
  }

  onPrev() {
    this.prevMail.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onRestore() {
    this.restore.emit();
  }

  ///// VERIFICA SE TUTTE LE EMAIL VISIBILI SONO SELEZIONATE
  //allSelected(): boolean {
  allSelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();
    const selectableEmails = visibleEmails.filter(e => !e.is_deleted);
    return selectableEmails.length > 0 && selectableEmails.every(e => e.selected);
  });


  ////// CAMBIO STATO SELEZIONE EMAILS
  toggleSelectAll(event: MatCheckboxChange) {
    //const checked = (event.target as HTMLInputElement).checked;
    const visibleEmails = this.folderService.filteredEmails();
    const ids = visibleEmails.map(email => email.id);

    //this.emailService.setSelectedEmails(ids, checked);
    this.emailService.setSelectedEmails(ids, event.checked);
  }


  ////// VERIFICA SE ALCUNE EMAIL VISIBILI SONO SELEZIONATE
  //isPartiallySelected(): boolean {
  isPartiallySelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();

    if (visibleEmails.length === 0) {
      return false;
    }

    const selectedCount = visibleEmails.filter(e => e.selected).length;
    return selectedCount > 0 && selectedCount < visibleEmails.length;
  });

}


/////////////////////////////////////////////////////////////////////////////////////// COMMENTI //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// La classe ToolbarComponent rappresenta un componente Angular che funge da barra degli strumenti (toolbar) in un'applicazione. 
// Questo componente utilizza Angular Material per fornire icone e tooltip.

// La proprietà @Output() nextMail e prevMail sono EventEmitter che consentono al componente di emettere eventi verso il componente genitore quando l'utente interagisce con i pulsanti della toolbar.
//Non è necessario specificare un tipo di dato per l'evento se non si desidera passare alcun dato. Quindi, in questo caso, nextMail e prevMail sono definiti come EventEmitter<void>, indicando che non emettono alcun dato specifico quando vengono attivati.
//In questo caso, l'evento nextMail e prevMail emettono semplicemente un segnale che indica che l'utente ha richiesto di passare alla prossima o alla precedente email, senza fornire ulteriori informazioni.


///// EVENTI PER NAVIGARE TRA LE EMAIL
// EventEmitter è una classe di Angular che permette di creare eventi personalizzati. In questo caso, nextMail e prevMail emettono eventi senza alcun dato associato (void).
// Per cambiare il comportamento della toolbar, il componente genitore (che sarebbe MainPageComponent) può ascoltare questi eventi e reagire di conseguenza, ad esempio navigando tra le email.

// I metodi onNext() e onPrev() vengono chiamati quando l'utente clicca sui pulsanti della toolbar. Questi metodi emettono gli eventi nextMail e prevMail rispettivamente, permettendo al componente genitore di reagire a tali azioni.
// this.nextMail.emit() e this.prevMail.emit() sono le chiamate che effettivamente emettono gli eventi, notificando il componente genitore che l'utente ha richiesto di passare alla prossima o alla precedente email.

// In sintesi, ToolbarComponent è un componente riutilizzabile che fornisce funzionalità di navigazione tra le email tramite eventi personalizzati, utilizzando Angular Material per l'interfaccia utente.

// Ho commentato le righe che emettono un oggetto EmailInterface perché non è necessario passare alcun dato specifico quando si naviga tra le email.


///// EVENTO PER ELIMINARE LE EMAIL SELEZIONATE
// @Output() delete = new EventEmitter<void>();
// Ho aggiunto un nuovo EventEmitter chiamato delete, che emette un evento quando l'utente clicca sul pulsante di eliminazione nella toolbar. 
// Questo evento può essere ascoltato dal componente genitore (che in questo caso è MainPageComponent) per eseguire l'azione di eliminazione delle email selezionate.
// <void> è un parametro generico che indica che l'evento delete non emette alcun dato specifico quando viene attivato. 
// In altre parole, l'evento serve solo come segnale per notificare al componente genitore che l'utente ha richiesto di eliminare le email selezionate.

// onDelete() { this.delete.emit(); }
// Ho aggiunto un nuovo metodo onDelete() che viene chiamato quando l'utente clicca sul pulsante di eliminazione nella toolbar. 
// Questo metodo emette l'evento delete, notificando il componente genitore che l'utente ha richiesto di eliminare le email selezionate.
// In questo modo, il componente ToolbarComponent fornisce un'interfaccia per navigare tra le email e per eliminare le email selezionate, delegando la logica effettiva di queste azioni al componente genitore tramite eventi personalizzati.


///// EVENTO PER RIPRISTINARE LE EMAIL SELEZIONATE
// @Output() restore = new EventEmitter<void>();
// Ho aggiunto un nuovo EventEmitter chiamato restore, che emette un evento quando l'utente clicca sul pulsante di ripristino nella toolbar. 
// Questo evento può essere ascoltato dal componente genitore (che in questo caso è MainPageComponent) per eseguire l'azione di ripristino delle email selezionate.

// onRestore() { this.restore.emit(); }
// Ho aggiunto un nuovo metodo onRestore() che viene chiamato quando l'utente clicca sul pulsante di ripristino nella toolbar. 
// Questo metodo emette l'evento restore, notificando il componente genitore che l'utente ha richiesto di ripristinare le email selezionate.
// In questo modo, il componente ToolbarComponent fornisce un'interfaccia per navigare tra le email, eliminare le email selezionate e ripristinare le email selezionate, delegando la log

// @Input() isTrashView = false;
// Ho aggiunto una nuova proprietà di input chiamata isTrashView, che indica se la toolbar si trova nella vista del cestino (trash view) o meno. 
// Questa proprietà può essere utilizzata per modificare il comportamento della toolbar in base al contesto in cui viene utilizzata. 
// Ad esempio, se isTrashView è true, il pulsante di eliminazione potrebbe essere nascosto o disabilitato, mentre il pulsante di ripristino potrebbe essere abilitato.


///// CAMBIO STATO SELEZIONE EMAILS
// Ho aggiunto un nuovo metodo toggleSelectAll(event: Event) che viene chiamato quando l'utente interagisce con un elemento di selezione (ad esempio, una checkbox) nella toolbar. 
// Questo metodo riceve un evento di tipo Event, che rappresenta l'interazione dell'utente con l'elemento di selezione.

// const checked = (event.target as HTMLInputElement).checked;
// const checked è una costante che estrae lo stato della checkbox dall'evento.
// event.target rappresenta l'elemento HTML che ha generato l'evento (ad esempio, la checkbox).
// as HTMLInputElement è un'asserzione di tipo che indica a TypeScript che event.target è un elemento di input HTML (come una checkbox).
// .checked è una proprietà dell'elemento di input HTML che indica se la checkbox è selezionata (true) o deselezionata (false).
// In parole semplici, questa riga di codice estrae lo stato della checkbox (se è selezionata o meno) dall'evento generato dall'interazione dell'utente.

// this.folderService.setSelectAll(checked);
// Ho chiamato il metodo setSelectAll del servizio folderService, passando lo stato della checkbox (checked) come argomento. 
// Questo metodo aggiorna lo stato di selezione globale delle email nel servizio Folder, consentendo al componente genitore di reagire di conseguenza 
// (ad esempio, selezionando o deselezionando tutte le email visualizzate).


///// VERIFICA SE TUTTE LE EMAIL VISIBILI SONO SELEZIONATE
// allSelected(): boolean {...} serve a verificare se tutte le email visibili nella vista corrente sono selezionate.
// Utilizza il metodo filteredEmails() del servizio Folder per ottenere l'elenco delle email visibili in base ai filtri applicati.
// Quindi, utilizza il metodo filter() per creare un nuovo array contenente solo le email che non sono eliminate (is_deleted === false).
// Infine, utilizza il metodo every() per verificare se tutte le email selezionabili hanno la proprietà selected impostata su true.
// Restituisce true se tutte le email visibili e selezionabili sono selezionate, altrimenti restituisce false.
// In sintesi, questo metodo fornisce un modo per determinare se tutte le email visibili nella vista corrente sono selezionate o meno,
// consentendo al componente ToolbarComponent di aggiornare lo stato della checkbox di selezione globale in base a questa informazione.

// Ho sostituito il metodo allSelected() con una proprietà calcolata (computed) per migliorare le prestazioni e la reattività del componente.
// La logica rimane la stessa, ma ora allSelected è una proprietà che si aggiorna automaticamente quando le email visibili cambiano, senza dover chiamare esplicitamente un metodo.


///// CAMBIO STATO SELEZIONE EMAILS
// toggleSelectAll(event: Event) {...} serve a cambiare lo stato di selezione globale delle email in base all'interazione dell'utente con una checkbox nella toolbar.
// Riceve un evento di tipo Event, che rappresenta l'interazione dell'utente con la checkbox.

// const checked = (event.target as HTMLInputElement).checked; 
// event.target rappresenta l'elemento HTML che ha generato l'evento (in questo caso, la checkbox).
// as HTMLInputElement è un'asserzione di tipo che indica a TypeScript che event.target è un elemento di input HTML (come una checkbox).
// .checked è una proprietà dell'elemento di input HTML che indica se la checkbox è selezionata (true) o deselezionata (false).
// In parole semplici, questa riga di codice estrae lo stato della checkbox (se è selezionata o meno) dall'evento generato dall'interazione dell'utente.

// const visibleEmails = this.folderService.filteredEmails();
// Ho chiamato il metodo filteredEmails() del servizio Folder per ottenere l'elenco delle email visibili in base ai filtri applicati. 
// Questo elenco viene memorizzato nella costante visibleEmails, che rappresenta le email attualmente visualizzate nella vista corrente.

// const ids = visibleEmails.map(email => email.id);
// Ho creato una nuova costante ids che contiene un array degli ID delle email visibili. 
// Utilizza il metodo map() per iterare su ogni email nell'array visibleEmails e restituire il valore della proprietà id di ciascuna email.
// In questo modo, ids conterrà solo gli ID delle email visibili, che possono essere utilizzati per aggiornare lo stato di selezione globale delle email nel servizio Folder.

// this.emailService.setSelectedEmails(ids, checked);
// Ho chiamato il metodo setSelectedEmails del servizio EmailService, passando l'array di ID delle email visibili (ids) e lo stato della checkbox (checked) come argomenti. 
// Questo metodo aggiorna lo stato di selezione delle email nel servizio EmailService, consentendo al componente genitore di reagire di conseguenza 
// (ad esempio, selezionando o deselezionando tutte le email visibili in base allo stato della checkbox).

// In sintesi, il metodo toggleSelectAll(event: Event) consente di cambiare lo stato di selezione globale delle email in base all'interazione dell'utente con una checkbox nella toolbar,
// aggiornando sia il servizio Folder che il servizio EmailService con le informazioni necessarie per riflettere correttamente lo stato di selezione delle email visibili.

// Ho sostituito l'evento di tipo Event con MatCheckboxChange per migliorare la gestione degli eventi della checkbox, rendendo il codice più chiaro e specifico per l'interazione con le checkbox di Angular Material.


////// VERIFICA SE ALCUNE EMAIL VISIBILI SONO SELEZIONATE
// isPartiallySelected(): boolean {...} serve a verificare se alcune (ma non tutte) le email visibili nella vista corrente sono selezionate.
// Utilizza il metodo filteredEmails() del servizio Folder per ottenere l'elenco delle email visibili in base ai filtri applicati.
// Quindi, utilizza il metodo filter() per creare un nuovo array contenente solo le email che hanno la proprietà selected impostata su true.
// Infine, confronta la lunghezza dell'array filtrato (selectedCount) con la lunghezza dell'array delle email visibili (visibleEmails.length).
// Restituisce true se alcune (ma non tutte) le email visibili sono selezionate, altrimenti restituisce false.
// In sintesi, questo metodo fornisce un modo per determinare se alcune email visibili nella vista corrente sono selezionate o meno,
// consentendo al componente ToolbarComponent di aggiornare lo stato della checkbox di selezione globale in base a questa informazione.

// Ho sostituito il metodo isPartiallySelected() con una proprietà calcolata (computed) per migliorare le prestazioni e la reattività del componente.
// La logica rimane la stessa, ma ora isPartiallySelected è una proprietà che si aggiorna automaticamente quando le email visibili cambiano, senza dover chiamare esplicitamente un metodo.