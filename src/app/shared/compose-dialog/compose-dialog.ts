import { Component, inject } from '@angular/core';
import { EmailService } from '../../services/email';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-compose-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './compose-dialog.html',
  styleUrl: './compose-dialog.scss',
})
export class ComposeDialog {

  private emailService = inject(EmailService);
  private dialogRef = inject(MatDialogRef<ComposeDialog>);

  recipient = '';
  subject = '';
  body = '';

  send() {
    this.emailService.sendEmail({
      recipient: this.recipient,
      subject: this.subject,
      body: this.body
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}



/////////////////////////////////COMMENTI//////////////////////////////////////////////////////////////

// Importiamo i moduli necessari da Angular e il servizio EmailService. 
// Utilizziamo il decoratore @Component per definire il componente ComposeDialog, specificando il selettore, i moduli importati, il template e lo stile associati al componente.

// MatDialogRef è un servizio fornito da Angular Material che ci consente di interagire con la finestra di dialogo. In questo caso, lo utilizziamo per chiudere la finestra di dialogo quando l'utente invia un'email o fa clic sul pulsante "Chiudi".
// CommonModule e FormsModule sono moduli di Angular che forniscono funzionalità comuni e supporto per la gestione dei moduli e dei dati del modulo. Li importiamo per poter utilizzare le funzionalità di binding dei dati e la gestione dei moduli nel nostro componente.


// INVIARE UNA NUOVA EMAIL
// La funzione send() viene chiamata quando l'utente fa clic sul pulsante "Invia" nella finestra di dialogo di composizione dell'email. 
// All'interno di questa funzione, utilizziamo il servizio EmailService per inviare una nuova email. 
// Usiamo il metodo sendEmail() del servizio, passando un oggetto che contiene le proprietà recipient, subject e body, che vengono impostate in base ai valori inseriti dall'utente nei campi del modulo.
// Creiamo un oggetto email che contiene le proprietà recipient, subject e body, che vengono impostate in base ai valori inseriti dall'utente nei campi del modulo. 
// Successivamente, chiamiamo il metodo sendEmail() del servizio EmailService, passando l'oggetto email come argomento. Infine, chiudiamo la finestra di dialogo utilizzando this.dialogRef.close().

// La funzione close() viene chiamata quando l'utente fa clic sul pulsante "Chiudi" nella finestra di dialogo di composizione dell'email.
// All'interno di questa funzione, chiudiamo semplicemente la finestra di dialogo utilizzando this.dialogRef.close().
// Aggiungiamo questo metodo per consentire all'utente di chiudere la finestra di dialogo senza inviare un'email, se lo desidera.

// private dialogRef = inject(MatDialogRef<ComposeDialog>);
// In questo modo, possiamo utilizzare this.dialogRef per accedere alle funzionalità della finestra di dialogo, come la chiusura della finestra stessa.
// MatDialogRef<ComposeDialog> significa che il riferimento alla finestra di dialogo è specifico per il componente ComposeDialog, consentendoci di interagire con quella particolare istanza della finestra di dialogo.