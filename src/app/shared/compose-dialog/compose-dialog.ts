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

  constructor() {

    ///// EFFETTO PER SINCRONIZZARE LA BOZZA DI COMPOSIZIONE CON IL SERVIZIO EMAIL
    effect(() => {

      const draft = this.emailService.composeDraft();

      if (!draft) return;

      this.recipient = draft.recipient ?? '';
      this.subject = draft.subject ?? '';
      this.body = draft.body ?? '';

    });

  }

  ///// PULIZIA BOZZA COMPOSIZIONE EMAIL
  ngOnDestroy() {
    this.emailService.clearComposeDraft();
  }

  private emailService = inject(EmailService);
  private dialogRef = inject(MatDialogRef<ComposeDialog>);
  private snackBar = inject(MatSnackBar);

  recipient = '';
  subject = '';
  body = '';


  ///// INVIO EMAIL 
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
    this.dialogRef.close();
  }


  ///// CHIUSURA DIALOGO E SALVATAGGIO BOZZA
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


  ///// COLLEGAMENTO AL SERVIZIO EMAIL PER LA BOZZA DI COMPOSIZIONE
  composeDraft = this.emailService.composeDraft;

}



