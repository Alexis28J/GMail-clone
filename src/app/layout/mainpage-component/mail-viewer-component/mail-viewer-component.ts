import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mail-viewer-component',
  imports: [DatePipe],
  templateUrl: './mail-viewer-component.html',
  styleUrls: ['./mail-viewer-component.scss'],
})

export class MailViewerComponent {

  @Input() email: any;

  @Output() reply = new EventEmitter<any>();
  @Output() forward = new EventEmitter<any>();

  onForward() {
    //console.log('Forward:', this.email);
    this.forward.emit(this.email);
  }
  onReply() {
    //console.log('Reply a:', this.email.sender);
    this.reply.emit(this.email);  
}

}



//////////////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Come per la toolbar, il viewer non dovrebbe gestire la logica globale. Di quello si occupa il main. 
// Il viewer si occupa solo di mostrare l’email selezionata e di emettere eventi quando l’utente clicca su reply o forward.

// @Input() permette al main di passare l’email selezionata

// @Output() permette al viewer di comunicare con il main quando l’utente clicca su reply o forward

// EventEmitter è un oggetto che permette di emettere eventi personalizzati. In questo caso, quando l’utente clicca su reply o forward, 
// il viewer emette un evento che il main può ascoltare e gestire.
// <any> indica che l’evento può trasportare qualsiasi tipo di dato. In questo caso, trasporta l’email selezionata.

//this.reply.emit(this.email) significa che quando l’utente clicca sul pulsante "Reply", il componente emette un evento "reply" con l’email selezionata come payload.
//Payload è il dato che viene trasportato dall’evento. In questo caso, l’email selezionata.
//Il main può ascoltare questo evento e gestirlo di conseguenza.