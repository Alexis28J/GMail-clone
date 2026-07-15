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
import { MovableFolder } from '../../constants/folders.constants';
import { ComposeDialog } from '../../shared/compose-dialog/compose-dialog';


@Component({
  selector: 'app-mainpage-component',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule,
    ToolbarComponent, MailListComponent, MailViewerComponent],
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss'],
})


export class MainpageComponent {

  constructor(
    private emailService: EmailService,
    private folderService: Folder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.allEmails = this.folderService.filteredEmails;

  }

  ///// SIGNAL CHE CONTIENE TUTTE LE EMAIL VISIBILI NELLA LISTA DELLE EMAIL
  allEmails: Signal<EmailInterface[]>;


  ///// INDICE DELL'EMAIL SELEZIONATA NELLA LISTA DELLE EMAIL VISIBILI
  currentIndex = signal<number | null>(null);


  ///// EMAIL SELEZIONATA (SIGNAL CHE CONTIENE L'EMAIL SELEZIONATA NELLA LISTA DELLE EMAIL VISIBILI)
  selectedEmail = computed<EmailInterface | null>(() => {
    const index = this.currentIndex();
    if (index === null) return null;
    return this.allEmails()[index];
  });


  ///// EMAIL SELEZIONATA
  onEmailSelected(email: EmailInterface) {
    const index = this.allEmails().findIndex(e => e.id === email.id);
    this.currentIndex.set(index);
  }


  ///// EMAIL SUCCESSIVA
  nextEmail() {
    const index = this.currentIndex();

    if (index !== null && index < this.allEmails().length - 1) {
      this.currentIndex.set(index + 1);
    }
  }


  ///// EMAIL PRECEDENTE
  previousEmail() {
    const index = this.currentIndex();

    if (index !== null && index > 0) {
      this.currentIndex.set(index - 1);
    }
  }


  ///// INOLTRA EMAIL
  onForward(email: EmailInterface) {

    this.emailService.setForwardEmail(email);

    this.dialog.open(ComposeDialog, {
      width: '500px'
    })
  }


  ///// RISPOSTA EMAIL
  onReply(email: EmailInterface) {
    this.emailService.setReplyEmail(email);
    this.dialog.open(ComposeDialog, {
      width: '500px'
    });
  }


  //// ELIMINA EMAIL SELEZIONATE
  onDeleteSelected() {

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }


    const dialogRef = this.dialog.open(ConfirmDialog, {
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
          panelClass: ['custom-snackbar']
        });
      }
    });


  }


  ///// TRASH VIEW (SE SIAMO NELLA CARTELLA TRASH)
  isTrashView = computed(() => {
    return this.folderService.getSelectedFolder()() === 'trash';
  })


  ///// RESTORE EMAIL SELEZIONATE
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
          panelClass: ['custom-snackbar']
        });
      }
    });

  }


  ///// INVIO EMAIL
  onSendEmail(email: Partial<EmailInterface>) {
    this.emailService.sendEmail(email);

    this.snackBar.open('Email sent', '', {
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }


  ///// FARE IL LOGOUT
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ///// ARCHIVIA EMAIL SELEZIONATE
  onArchive() {

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {
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
          panelClass: ['custom-snackbar']
        });
      }
    });

  }


  ///// FOLDERS DISPONIBILI PER SPOSTAMENTO DELLE EMAIL
  availableFolders = computed(() => {

    const currentFolder = this.folderService.getSelectedFolder()();

    return this.folderService.getFolders()().filter(folder =>
      folder.id !== currentFolder && folder.movable !== false
    );
  });


  ///// SPOSTA EMAIL SELEZIONATE IN UN'ALTRA CARTELLA
  moveEmails(folder: string) {

    const hasSelect = this.allEmails().some(email => email.selected);

    if (!hasSelect) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialog, {
      autoFocus: false,
      data: {
        message: `Move selected emails to <strong>${folder.toUpperCase()}</strong>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.emailService.moveSelectedEmails(folder as MovableFolder);
        this.currentIndex.set(null);

        this.snackBar.open(`Emails moved to ${folder.toUpperCase()}`, '', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
      }
    });
  }


}



