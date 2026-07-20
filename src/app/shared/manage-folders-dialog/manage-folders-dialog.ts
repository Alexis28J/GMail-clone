import { Component, computed, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Folder } from '../../services/folder';
import { FolderInterface } from '../../interface/folder-interface';

@Component({
  selector: 'app-manage-folders-dialog',
  imports: [MatDialogContent, MatButtonModule, MatIcon, MatDialogActions, MatDialogClose],
  templateUrl: './manage-folders-dialog.html',
  styleUrl: './manage-folders-dialog.scss',
})

export class ManageFoldersDialog {

  private folderService = inject(Folder);

  private dialog = inject(MatDialog);

  folders = computed(() =>
    this.folderService.getFolders()().filter(f => !f.system)
  );


  editFolder(folder: FolderInterface) {
    const newName = prompt('Rename folder', folder.name);

    if (!newName?.trim()) {
      return;
    }

    this.folderService.updateFolder(
      folder.id,
      newName.trim()
    );
  }


  deleteFolder(folder: FolderInterface) {

    const confirmed = confirm(
      `Delete folder "${folder.name}"?`
    );

    if (confirmed) {
      this.folderService.deleteFolder(
        folder.id
      );
    }

  }
}
