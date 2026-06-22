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

  @Output() nextMail = new EventEmitter<void>();
  //@Output() nextMail = new EventEmitter<EmailInterface>();

  @Output() prevMail = new EventEmitter<void>();
  //@Output() prevMail = new EventEmitter<EmailInterface>();

  onNext() {
    this.nextMail.emit();
  }

  onPrev() {
    this.prevMail.emit();
  }
}


//////////////////////////////////// COMPONENTI ////////////////////////////////

// La classe ToolbarComponent rappresenta un componente Angular che funge da barra degli strumenti (toolbar) in un'applicazione. 
// Questo componente utilizza Angular Material per fornire icone e tooltip.

// La proprietà @Output() nextMail e prevMail sono EventEmitter che consentono al componente di emettere eventi verso il componente genitore quando l'utente interagisce con i pulsanti della toolbar.
//Non è necessario specificare un tipo di dato per l'evento se non si desidera passare alcun dato. Quindi, in questo caso, nextMail e prevMail sono definiti come EventEmitter<void>, indicando che non emettono alcun dato specifico quando vengono attivati.
//In questo caso, l'evento nextMail e prevMail emettono semplicemente un segnale che indica che l'utente ha richiesto di passare alla prossima o alla precedente email, senza fornire ulteriori informazioni.


// EventEmitter è una classe di Angular che permette di creare eventi personalizzati. In questo caso, nextMail e prevMail emettono eventi senza alcun dato associato (void).
// Per cambiare il comportamento della toolbar, il componente genitore può ascoltare questi eventi e reagire di conseguenza, ad esempio navigando tra le email.


// I metodi onNext() e onPrev() vengono chiamati quando l'utente clicca sui pulsanti della toolbar. Questi metodi emettono gli eventi nextMail e prevMail rispettivamente, permettendo al componente genitore di reagire a tali azioni.
// this.nextMail.emit() e this.prevMail.emit() sono le chiamate che effettivamente emettono gli eventi, notificando il componente genitore che l'utente ha richiesto di passare alla prossima o alla precedente email.


// In sintesi, ToolbarComponent è un componente riutilizzabile che fornisce funzionalità di navigazione tra le email tramite eventi personalizzati, utilizzando Angular Material per l'interfaccia utente.