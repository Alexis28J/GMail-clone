import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmailInterface } from '../../../interface/email-interface';

@Component({
  selector: 'app-mail-viewer-component',
  imports: [DatePipe],
  templateUrl: './mail-viewer-component.html',
  styleUrls: ['./mail-viewer-component.scss'],
})

export class MailViewerComponent {

  @Input() email: EmailInterface | null = null;

  @Output() reply = new EventEmitter<EmailInterface>();  
  @Output() forward = new EventEmitter<EmailInterface>();

  onForward() {
    if (this.email) {
      this.forward.emit(this.email);
    }

  }
  onReply() {
    if (this.email) {
      this.reply.emit(this.email);
    }
  }

}


//////////////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// La classe MailViewerComponent è un componente Angular che visualizza i dettagli di un'email. 
// Utilizza l'interfaccia EmailInterface per definire la struttura dell'oggetto email. 

// Il componente accetta un input email di tipo EmailInterface o null e fornisce due output, reply e forward, 
// che emettono eventi quando l'utente decide di rispondere o inoltrare l'email. I metodi onReply e onForward verificano se l'email è presente prima di emettere gli eventi corrispondenti.

// EventEmitter è una classe di Angular che consente di emettere eventi personalizzati da un componente figlio a un componente genitore. 
// Sia reply che forward sono istanze di EventEmitter.
// In questo caso, viene utilizzata per notificare il componente genitore quando l'utente decide di rispondere o inoltrare l'email.

