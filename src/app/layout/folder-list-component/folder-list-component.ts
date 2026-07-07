import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FolderInterface } from '../../interface/folder-interface';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-folder-list-component',
  imports: [MatIcon],
  templateUrl: './folder-list-component.html',
  styleUrl: './folder-list-component.scss',
})
export class FolderListComponent {

  @Input() folders: FolderInterface[] = [];

  @Output() folderSelected = new EventEmitter<string>();

  onSelect(folderId: string) {
    this.folderSelected.emit(folderId);
  }
  
}




