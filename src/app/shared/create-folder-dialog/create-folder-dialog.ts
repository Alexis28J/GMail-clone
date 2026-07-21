import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-folder-dialog',
  imports: [FormsModule, MatDialogTitle, MatDialogContent, MatInputModule, MatDialogActions, MatAnchor, MatIcon],
  templateUrl: './create-folder-dialog.html',
  styleUrls: ['./create-folder-dialog.scss'],
})


export class CreateFolderDialog {

  folderName = '';
  private snackbar = inject(MatSnackBar);

  ///// INIEZIONE DELLA DIPENDENZA PER IL DIALOGO
  dialogRef = inject(MatDialogRef<CreateFolderDialog>);


  ///// SALVARE NOME DELLA CARTELLA
  save() {
    if (!this.folderName.trim()) {  
      return;  
    }

    this.dialogRef.close(this.folderName);
    
    this.snackbar.open(
      `Folder "${this.folderName}" created`,
      '',
      {
        duration: 3000,
        panelClass: ['custom-snackbar'],
      });
  }


  ///// CHIUDERE LA DIALOG
  close() {  
    this.dialogRef.close(); 
  }

}
