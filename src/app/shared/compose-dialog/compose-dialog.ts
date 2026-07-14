import { Component, inject } from '@angular/core';
import { EmailService } from '../../services/email';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { effect } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-compose-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './compose-dialog.html',
  styleUrls: ['./compose-dialog.scss'],
})
export class ComposeDialog implements OnDestroy {

  // Ho aggiunto un costruttore per creare un effetto che reagisce ai cambiamenti del signal replyDraft.
  // Ogni volta che replyDraft cambia, l'effetto aggiorna i campi del dialogo di composizione email (recipient, subject, body)
  // con i valori della bozza di risposta. Se replyDraft è null, non fa nulla.
  // In Angular moderno normalmente si usa effect() nel costruttore:
  // In questo modo non ho bisogno di usare ngOnInit(), ngOnChanges() né altri lifecycle hooks, perché l'effetto si attiva automaticamente quando il signal cambia.
  constructor() {
    effect(() => {

      // const draft = this.replyDraft() ?? this.forwardDraft();  // Prendo il valore corrente del signal replyDraft o forwardDraft. Se entrambi sono null, draft sarà null.

      // if (!draft) return;  // Se replyDraft è null, esci dall'effetto senza fare nulla

      const draft = this.emailService.composeDraft();  // Prendo il valore corrente del signal composeDraft. Se è null, draft sarà null.

      if (!draft) return;  // Se composeDraft è null, esci dall'effetto senza fare nulla

      this.recipient = draft.recipient ?? '';  // ?? significa che se draft.recipient è undefined o null, allora assegna una stringa vuota
      this.subject = draft.subject ?? '';
      this.body = draft.body ?? '';

    });
    // La differenza tra l'effect e il computed è che l'effect non restituisce un valore, ma esegue un'azione ogni volta che i signals a cui fa riferimento cambiano.
    // In questo caso, l'action è aggiornare i campi del dialogo di composizione email con i valori della bozza di risposta.
    // L'uso del constructor qui serve a garantire che l'effetto sia creato una sola volta e non ricreato ad ogni render del template, evitando comportamenti indesiderati.
    // Ad esempio, se l'effetto fosse creato ad ogni render, potrebbe sovrascrivere i valori dei campi del dialogo di composizione email anche quando l'utente sta scrivendo una nuova email, causando perdita di dati.
  }

  ngOnDestroy() { //OnDestroy è un lifecycle hook di Angular che viene chiamato quando il componente viene distrutto, cioè rimosso dal DOM. In questo caso, viene usato per pulire il signal replyDraft quando il dialog viene chiuso.
    //this.emailService.clearReplyDraft(); // Pulisco il signal replyDraft quando il componente viene distrutto (cioè quando il dialog viene chiuso), 
    // così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta precedente
    //this.emailService.clearForwardDraft(); // Pulisco il signal forwardDraft quando il componente viene distrutto (cioè quando il dialog viene chiuso), 
    // così che la prossima volta che apro il dialog non ci siano dati residui della bozza di inoltro precedente
    this.emailService.clearComposeDraft(); // Pulisco il signal composeDraft quando il componente viene distrutto (cioè quando il dialog viene chiuso), 
    // così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta o inoltro precedente
  }

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
      { duration: 3000, panelClass: ['custom-snackbar'] }
    );
    // Ho commentato questa parte perché ho spostato la pulizia del signal replyDraft nel metodo ngOnDestroy del componente ComposeDialog, 
    // così che venga pulito automaticamente quando il dialog viene chiuso, evitando di doverlo fare manualmente qui.
    //this.emailService.clearReplyDraft(); // Pulisco il signal replyDraft dopo l'invio dell'email, così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta precedente
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
    // Ho commentato questa parte perché ho spostato la pulizia del signal replyDraft nel metodo ngOnDestroy del componente ComposeDialog, 
    // così che venga pulito automaticamente quando il dialog viene chiuso, evitando di doverlo fare manualmente qui.
    //this.emailService.clearReplyDraft(); // Pulisco il signal replyDraft anche quando chiudo il dialog senza inviare l'email, così che la prossima volta che apro il dialog non ci siano dati residui della bozza di risposta precedente
    this.dialogRef.close();
  }

  //replyDraft = this.emailService.replyDraft; // collegamento al signal replyDraft del servizio EmailService
  // Significa che ogni volta che il valore di replyDraft cambia nel servizio EmailService, 
  // anche il valore di replyDraft in ComposeDialog cambierà automaticamente.

  //forwardDraft = this.emailService.forwardDraft;
  composeDraft = this.emailService.composeDraft;  // collegamento al signal composeDraft del servizio EmailService
}



