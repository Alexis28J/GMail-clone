import { Component, computed, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from "./toolbar-component/toolbar-component";
import { MailListComponent } from "./mail-list-component/mail-list-component";
import { MailViewerComponent } from "./mail-viewer-component/mail-viewer-component";
import { EmailService } from "../../services/email";
import { EmailInterface } from '../../interface/email-interface';


@Component({
  selector: 'app-mainpage-component',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule, ToolbarComponent, MailListComponent, MailViewerComponent],
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss'],
})

export class MainpageComponent {

  allEmails: Signal<EmailInterface[]>;

  currentIndex = signal<number | null>(null);

  selectedEmail = computed<EmailInterface | null>(() => {
    const index = this.currentIndex();
    if (index === null) return null;
    return this.allEmails()[index];
  });

  constructor(private emailService: EmailService) {
    this.allEmails = this.emailService.getEmails();
  }

  onEmailSelected(email: EmailInterface) {
    const index = this.allEmails().findIndex(e => e.id === email.id);
    this.currentIndex.set(index);
  }

  nextEmail() {  
    const index = this.currentIndex();

    if (index !== null && index < this.allEmails().length - 1) {
      this.currentIndex.set(index + 1);
    }
  }

  previousEmail() {
    const index = this.currentIndex();

    if (index !== null && index > 0) {
      this.currentIndex.set(index - 1);
    }
  }


  onForward(email: EmailInterface) {
    console.log('Forward dal MAIN:', email);
  }

  onReply(email: EmailInterface) {
    console.log('Reply dal MAIN:', email);
  }


}




////////////////////////////////////////////COMMENTI////////////////////////////////////////////////////

// IMPORTAZIONI:

// CommonModule: Importato per utilizzare le direttive comuni di Angular come *ngIf e *ngFor.

// MatCheckboxModule: Importato per utilizzare il componente di checkbox di Angular Material.

// MatIconModule: Importato per utilizzare le icone di Angular Material.

// ToolbarComponent, MailListComponent, MailViewerComponent: Importati per essere utilizzati come componenti figli all'interno del MainpageComponent.

// EmailService: Importato per accedere ai metodi del servizio email, in particolare getEmails().

// EmailInterface: Importato per definire il tipo degli oggetti email utilizzati nel componente.


// DECORATORE @Component:

// selector: 'app-mainpage-component' - Definisce il selettore del componente, che può essere utilizzato nei template HTML per includere questo componente.

// imports: [...] - Elenca i moduli e i componenti che questo componente utilizza. In questo caso, include CommonModule, MatCheckboxModule, MatIconModule, ToolbarComponent, MailListComponent e MailViewerComponent.

// templateUrl: './mainpage-component.html' - Specifica il percorso del file HTML che contiene il template del componente.

// styleUrls: ['./mainpage-component.scss'] - Specifica il percorso del file SCSS che contiene gli stili del componente.


// PROPRIETÀ DEL COMPONENTE:

// allEmails: Signal<EmailInterface[]> - Una proprietà che contiene un segnale (Signal) che rappresenta l'elenco di tutte le email. Viene inizializzata con i dati ottenuti dal servizio EmailService.

// currentIndex: signal<number | null> - Una proprietà che rappresenta l'indice dell'email attualmente selezionata. Può essere un numero o null se nessuna email è selezionata.

// selectedEmail: computed<EmailInterface | null> - Una proprietà calcolata (computed) che restituisce l'email attualmente selezionata in base all'indice corrente. Se non c'è un'email selezionata, restituisce null.


// COSTRUTTORE:
// Il costruttore accetta un'istanza di EmailService come dipendenza. All'interno del costruttore, viene inizializzata la proprietà allEmails chiamando il metodo getEmails() del servizio email per ottenere l'elenco delle email.


// METODI DEL COMPONENTE:

// onEmailSelected(email: EmailInterface): Questo metodo viene chiamato quando un'email viene selezionata. Trova l'indice dell'email selezionata nell'elenco allEmails e aggiorna currentIndex con questo indice.

// nextEmail(): Questo metodo viene chiamato per selezionare l'email successiva nell'elenco. Se c'è un'email successiva disponibile, aggiorna currentIndex incrementandolo di 1.
// previousEmail(): Questo metodo viene chiamato per selezionare l'email precedente nell'elenco. Se c'è un'email precedente disponibile, aggiorna currentIndex decrementandolo di 1.
// Non passo il parametro email a nextEmail() e previousEmail() perché questi metodi operano sull'indice corrente (currentIndex) dell'email selezionata, piuttosto che su un'email specifica. 
// L'indice corrente viene utilizzato per determinare quale email è attualmente selezionata e quindi per navigare tra le email nell'elenco allEmails.

// onForward(email: EmailInterface): Questo metodo viene chiamato quando si desidera inoltrare un'email. Attualmente, stampa l'email da inoltrare nella console.

// onReply(email: EmailInterface): Questo metodo viene chiamato quando si desidera rispondere a un'email. Attualmente, stampa l'email a cui rispondere nella console.