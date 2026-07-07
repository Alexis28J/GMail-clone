import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Folder } from '../../services/folder';
import { FolderListComponent } from "../folder-list-component/folder-list-component";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ComposeDialog } from '../../shared/compose-dialog/compose-dialog';

@Component({
  standalone: true,
  selector: 'app-sidebar-component',
  imports: [MatIconModule, MatTooltipModule, FolderListComponent, MatDialogModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {
  // menuItems = [
  //   { id: 1, name: 'Inbox', icon: 'inbox', count: 10 },
  //   { id: 2, name: 'Special', icon: 'star' },
  //   { id: 3, name: 'Sent', icon: 'send' },
  //   { id: 4, name: 'Drafts', icon: 'drafts', count: 1 },
  //   { id: 5, name: 'Spam', icon: 'report', count: 3 },
  //   { id: 6, name: 'Important', icon: 'label_important' },
  //   { id: 7, name: 'Categories', icon: 'label' },
  //   { id: 8, name: 'Snoozed', icon: 'snooze' },
  //   { id: 9, name: 'Trash', icon: 'delete' },
  // ];

  private folderService = inject(Folder);

  private dialog = inject(MatDialog)

  folders = this.folderService.getFolders();

  onFolderSelected(folderId: string) {
    this.folderService.setSelectedFolder(folderId);
  }

  openCompose() {
    this.dialog.open(ComposeDialog, {
      width: '500px',
    });
  }

}






