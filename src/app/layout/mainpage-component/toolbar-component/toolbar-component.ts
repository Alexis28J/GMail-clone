import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";


@Component({
  selector: 'app-toolbar-component',
  imports: [MatIcon, MatTooltipModule],
  templateUrl: './toolbar-component.html',
  styleUrls: ['./toolbar-component.scss'],
})

export class ToolbarComponent {

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

  onDelete(){
    this.delete.emit();
  }

  onRestore(){
    this.restore.emit();
  }
}


//////////////////////////////////// COMPONENTI ////////////////////////////////

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