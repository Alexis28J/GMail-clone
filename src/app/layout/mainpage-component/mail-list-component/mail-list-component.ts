import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { EmailInterface } from '../../../interface/email-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mail-list-component',
  imports: [DatePipe, FormsModule],
  templateUrl: './mail-list-component.html',
  styleUrls: ['./mail-list-component.scss'],
})
export class MailListComponent {

  @Input() emails: EmailInterface[] = [];

  ///////////////////////////SELEZIONE EMAIL///////////////////////////////////////////////


  @Output() emailSelected = new EventEmitter<EmailInterface>();


  selectEmail(email: EmailInterface) {
    this.emailSelected.emit(email);
  }


  selectedEmails: EmailInterface[] = [];

  toggleSelection(email: EmailInterface) {
    const index = this.selectedEmails.findIndex(e => e.id === email.id);

    if (index > -1) {
      this.selectedEmails.splice(index, 1);
    } else {
      this.selectedEmails.push(email);
    }
  }

  isSelected(email: EmailInterface): boolean {
    return this.selectedEmails.some(e => e.id === email.id);
  }


  ///////////////////////////////////PREFERITI///////////////////////////////////////////////


  toggleStar(email: EmailInterface) {
    email.starred = !email.starred;
  }

  getAllEmails(): EmailInterface[] {
    return this.emails;
  }

}




/////////////////////////////////////////////////////////////////COMMENTI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DatePipe è una classe fornita da Angular che consente di formattare le date in base a un formato specifico. In questo caso, viene importata e utilizzata nel componente per formattare la data di invio delle email.

// @Input() è un decoratore che indica che la proprietà emails può ricevere dati da un componente genitore. In questo caso, il componente genitore può passare un array di email al componente MailListComponent tramite la proprietà emails.

// EmailInterface è un'interfaccia che definisce la struttura dei dati delle email. In questo caso, viene importata e utilizzata per tipizzare le proprietà e i parametri del componente, garantendo che le email gestite dal componente abbiano una struttura coerente e prevedibile.


/////////////////////////////////////////////////////SELEZIONE EMAIL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Output() è un decoratore che indica che la proprietà emailSelected è un evento che può essere emesso dal componente. In questo caso, l'evento viene emesso quando un'email viene selezionata.
// emailSelected è un'istanza di EventEmitter, che è una classe fornita da Angular per gestire eventi personalizzati. In questo caso, l'evento emesso conterrà i dati dell'email selezionata.

// EventEmitter consente al componente di comunicare con altri componenti o servizi, emettendo eventi che possono essere ascoltati e gestiti da altri componenti o servizi che si iscrivono a questi eventi.

// selectEmail(email: EmailInterface) è un metodo che viene chiamato quando un'email viene selezionata. In questo caso, il metodo emette l'evento emailSelected con i dati dell'email selezionata, consentendo ad altri componenti o servizi di reagire a questa selezione.

// selectedEmails è un array che tiene traccia delle email attualmente selezionate. Viene utilizzato per gestire la selezione multipla delle email.

// toggleSelection(email: EmailInterface) è un metodo che viene chiamato quando un'email viene cliccata per essere selezionata o deselezionata. Il metodo verifica se l'email è già presente nell'array selectedEmails e, in base a questo, la aggiunge o la rimuove dall'array.

// isSelected(email: EmailInterface): boolean è un metodo che verifica se un'email specifica è attualmente selezionata, restituendo true se l'email è presente nell'array selectedEmails e false altrimenti.


/////////////////////////////////////////////////////PREFERITI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// toggleStar(email: EmailInterface) è un metodo che viene chiamato quando l'utente clicca sull'icona a forma di stella per contrassegnare o rimuovere un'email come preferita. Il metodo inverte il valore della proprietà starred dell'email, consentendo all'utente di gestire facilmente le email preferite.

// getAllEmails(): EmailInterface[] è un metodo che restituisce l'intero array di email gestito dal componente. Questo metodo può essere utilizzato da altri componenti o servizi per accedere alla lista completa delle email, ad esempio per visualizzarle o per eseguire operazioni su di esse.