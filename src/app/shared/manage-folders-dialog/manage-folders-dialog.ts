import { Component, computed, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Folder } from '../../services/folder';
import { FolderInterface } from '../../interface/folder-interface';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { RenameDialog } from '../rename-dialog/rename-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-folders-dialog',
  imports: [MatDialogContent, MatButtonModule, MatIcon, MatDialogActions, MatDialogClose],
  templateUrl: './manage-folders-dialog.html',
  styleUrls: ['./manage-folders-dialog.scss'],
})

export class ManageFoldersDialog {

  ///// INIEZZIONE DEI SERVIZI
  private folderService = inject(Folder);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);


  ///// FOLDERS - COMPUTED CHE FILTRA LE CARTELLE DI SISTEMA
  folders = computed(() =>
    this.folderService.getFolders()().filter(f => !f.system)
  );


  ///// MODIFICA FOLDER
  editFolder(folder: FolderInterface) {  

    const dialogRef = this.dialog.open( 
      RenameDialog,
      {
        width: '400px',
        autoFocus: false,
        data: {
          name: folder.name,
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (!result?.trim()) {
          return
        }

        this.folderService.updateFolder(
          folder.id,
          result.trim()
        );

        this.snackbar.open(
          `Folder "${folder.name}" renamed to "${result.trim()}"`,
          '',
          {
            duration: 3000,
            panelClass: ['custom-snackbar'],
          });

      });

  }


  ///// ELIMINA FOLDER
  deleteFolder(folder: FolderInterface) {

    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        autoFocus: false,
        data: {
          message: `Are you sure you want to delete <strong>${folder.name}</strong>?`
        }

      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.folderService.deleteFolder(folder.id);
          this.snackbar.open(
            `Folder "${folder.name}" deleted`,
            '',
            {
              duration: 3000,
              panelClass: ['custom-snackbar'],
            });
        }
      });

  }
}
