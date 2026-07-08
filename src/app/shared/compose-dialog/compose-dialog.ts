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



