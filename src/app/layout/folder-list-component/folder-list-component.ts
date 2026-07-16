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

  ///// INPUT PER RICEVERE DAL PADRE L'ARRAY DI CARTELLE DA VISUALIZZARE
  @Input() folders: FolderInterface[] = [];

  ///// OUTPUT PER INVIARE EVENTO AL PADRE QUANDO VIENE SELEZIONATA UNA CARTELLA
  @Output() folderSelected = new EventEmitter<string>();

  ///// INVIA EVENTO AL PADRE QUANDO VIENE SELEZIONATA UNA CARTELLA
  onSelect(folderId: string) {
    this.folderSelected.emit(folderId);
  }
  
}




