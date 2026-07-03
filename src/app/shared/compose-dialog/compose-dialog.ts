import { Component, inject } from '@angular/core';
import { EmailService } from '../../services/email';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);

  recipient = '';
  subject = '';
  body = '';


  send() {

    if (!this.recipient.trim()) {
      this.snackBar.open(
        'Please enter a recipient',
        '',
        { duration: 3000, panelClass: ['custom-snackbar'] }
      );
      return;
    }

    this.emailService.sendEmail({
      recipient: this.recipient.trim(),
      subject: this.subject.trim(),
      body: this.body.trim()
    });
    this.snackBar.open(
      'Email sent',
      '',        
      { duration: 3000 }
    );
    this.dialogRef.close();
  }


  close() {
    if (this.recipient || this.subject || this.body) {
      this.emailService.saveDraft({
        recipient: this.recipient,
        subject: this.subject,
        body: this.body
      });
      this.snackBar.open('Draft saved', '', { duration: 3000, panelClass: ['custom-snackbar'] });
    }
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

// Ho aggiunto un controllo nella funzione close() per verificare se l'utente ha inserito del testo nei campi recipient, subject o body.
// Se almeno uno di questi campi contiene del testo, viene chiamato il metodo saveDraft() del servizio EmailService per salvare la bozza dell'email.
// Inoltre, viene visualizzato un messaggio di notifica "Draft saved" utilizzando il servizio MatSnackBar, che mostra un breve messaggio all'utente per confermare che la bozza è stata salvata correttamente.
// In questo modo, se l'utente chiude la finestra di dialogo senza inviare l'email ma ha inserito del testo, la bozza verrà salvata automaticamente. 

// Se, invece, tutti i campi sono vuoti, la finestra di dialogo si chiuderà senza salvare nulla.
// send() non salva la bozza, ma invia l'email e chiude la finestra di dialogo. E' importante perché l'utente potrebbe voler inviare l'email senza salvarla come bozza.
// Evita duplicazioni e confusione tra l'invio dell'email e il salvataggio della bozza. In questo modo, l'utente ha un controllo chiaro su cosa accade quando fa clic su "Invia" o "Chiudi".

// Ho aggiunto un controllo nella funzione send() per verificare se il campo recipient è vuoto.
// Se il campo recipient è vuoto, viene visualizzato un messaggio di notifica "Please enter a recipient" utilizzando il servizio MatSnackBar.
// In questo modo, l'utente riceve un feedback immediato e chiaro che deve inserire un destinatario prima di poter inviare l'email.
// Se il campo recipient contiene del testo, l'email viene inviata normalmente e viene visualizzato un messaggio di conferma "Email sent" per informare l'utente che l'email è stata inviata con successo.
// La funzione send() invia l'email e chiude la finestra di dialogo, mentre la funzione close() salva la bozza (se necessario) e chiude la finestra di dialogo.

// NB: '' indica che non vogliamo un'azione specifica nel messaggio di notifica, come un pulsante "Annulla" o "Chiudi". 
// In questo caso, il messaggio di notifica sarà visualizzato per un breve periodo di tempo e poi scomparirà automaticamente.