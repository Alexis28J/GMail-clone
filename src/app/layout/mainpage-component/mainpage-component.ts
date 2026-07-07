import { Component, computed, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from "./toolbar-component/toolbar-component";
import { MailListComponent } from "./mail-list-component/mail-list-component";
import { MailViewerComponent } from "./mail-viewer-component/mail-viewer-component";
import { EmailService } from "../../services/email";
import { EmailInterface } from '../../interface/email-interface';
import { Folder } from '../../services/folder';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mainpage-component',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule,
    ToolbarComponent, MailListComponent, MailViewerComponent],
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

  // constructor(private emailService: EmailService) {
  //   this.allEmails = this.emailService.getEmails();
  // }

  constructor(
    private emailService: EmailService,
    private folderService: Folder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.allEmails = this.folderService.filteredEmails;

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


  onDeleteSelected() {
    //1) // const confirmed = confirm('Are you sure you want to delete this email?');
    // if (!confirmed) return;

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {   //2) 
      autoFocus: false,
      data: {
        message: 'Are you sure to want to <strong>DELETE</strong> these messages?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.deleteSelectedEmails();
        this.currentIndex.set(null);

        this.snackBar.open('Emails deleted', '', {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Aggiungi la classe personalizzata qui (styles.scss)
        });
      }
    });


  }


  isTrashView = computed(() => {
    return this.folderService.getSelectedFolder()() === 'trash';
  })


  onRestoreSelected() {

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {
      autoFocus: false,
      data: {
        message: 'Are you sure to want to <strong>RESTORE</strong> these messages?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.restoreSelectedEmails();
        this.currentIndex.set(null);

        this.snackBar.open('Emails restored', '', {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Aggiungi la classe personalizzata qui (styles.scss)
        });
      }
    });

  }


  onSendEmail(email: Partial<EmailInterface>) {
    this.emailService.sendEmail(email);

    this.snackBar.open('Email sent', '', {
      duration: 3000,
      panelClass: ['custom-snackbar'] // Aggiungi la classe personalizzata qui (styles.scss)
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



  onArchive() {

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {   //2) 
      autoFocus: false,
      data: {
        message: 'Are you sure to want to <strong>ARCHIVE</strong> these messages?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.archiveSelectedEmails();
        this.currentIndex.set(null);

        this.snackBar.open('Emails archived', '', {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Aggiungi la classe personalizzata qui (styles.scss)
        });
      }
    });
  }
}


