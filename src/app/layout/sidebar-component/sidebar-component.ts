import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Folder } from '../../services/folder';
import { FolderListComponent } from "../folder-list-component/folder-list-component";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ComposeDialog } from '../../shared/compose-dialog/compose-dialog';
import { CreateFolderDialog } from '../../shared/create-folder-dialog/create-folder-dialog';


@Component({
  standalone: true,
  selector: 'app-sidebar-component',
  imports: [MatIconModule, MatTooltipModule, FolderListComponent, MatDialogModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {

  private folderService = inject(Folder);

  private dialog = inject(MatDialog)

  folders = this.folderService.getFolders();


  ///// SELEZIONA CARTELLE
  onFolderSelected(folderId: string) {
    this.folderService.setSelectedFolder(folderId);
  }


  ///// APRI COMPOSE DIALOG
  openCompose() {
    this.dialog.open(ComposeDialog, {
      width: '500px',
    });
  }


  ///// APRI CREATE FOLDER DIALOG
  openCreateFolderDialog() {
    const dialogRef = this.dialog.open(CreateFolderDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderService.addFolder(result);
      }
    });
  }



  ///// REFACTORING GESTIONE LISTE DI CARTELLE  /////

  ///// SIGNAL PER MOSTRARE O NASCONDERE LE CARTELLE DI SISTEMA E PERSONALIZZATE
  showMoreSystemFolders = signal(false);
  showMoreCustomFolders = signal(false);


  ///// GRUPPO FOLDER DI SISTEMA
  systemFolderGroup = computed(() => {
    const folders = this.folders()
      .filter(folder => folder.system);

    return {
      visible: folders.slice(0, 4),
      hidden: folders.slice(4),
      hasMore: folders.length > 4
    };
  });


  ///// GRUPPO FOLDER CUSTOM
  customFolderGroup = computed(() => {
    const folders = this.folders()
      .filter(folder => !folder.system)

    return {
      visible: folders.slice(0, 4),
      hidden: folders.slice(4),
      hasMore: folders.length > 4
    }
  });
}







