import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-create-folder-dialog',
  imports: [FormsModule, MatDialogTitle, MatDialogContent, MatInputModule, MatDialogActions, MatAnchor, MatIcon],
  templateUrl: './create-folder-dialog.html',
  styleUrls: ['./create-folder-dialog.scss'],
})
export class CreateFolderDialog {

  folderName = '';

  dialogRef = inject(MatDialogRef<CreateFolderDialog>);

  ///// SALVARE NOME DELLA CARTELLA
  save() {
    if (!this.folderName.trim()) {  
      return;  
    }

    this.dialogRef.close(this.folderName);
  }


  ///// CHIUDERE LA DIALOG
  close() {  
    this.dialogRef.close(); 
  }

}
