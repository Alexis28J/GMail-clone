import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Folder } from '../../services/folder';
import { FolderListComponent } from "../folder-list-component/folder-list-component";

@Component({
  selector: 'app-sidebar-component',
  imports: [MatIconModule, MatTooltipModule, FolderListComponent],
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

  folders = this.folderService.getFolders();

  onFolderSelected(folderId: string){
    this.folderService.setSelectedFolder(folderId);
  }
}





////////////////////////////////////////////COMMENTI//////////////////////////////////////////////////////////////////////////////

//Non ho importato CommonModule perché non utilizzo direttive come ngIf o ngFor in questo componente,
//mentre ho importato MatIconModule perché utilizzo le icone di Angular Material per rappresentare le voci del menu.

// export class SidebarComponent {  menuItems = [....] }
// menuItems è un array di oggetti che rappresentano le voci del menu laterale. 
// Lo inseriamo qui per poterlo utilizzare nel template HTML del componente. 
// Ad esempio, ogni oggetto ha un id, un nome, un'icona e un conteggio opzionale di elementi associati a quella voce del menu.


// Invece di utilizzare un array statico di voci del menu, ho deciso di utilizzare il servizio Folder per ottenere dinamicamente l'elenco delle cartelle.
// In questo modo, il componente SidebarComponent può ottenere le cartelle direttamente dal servizio Folder, 
// che gestisce la logica di recupero delle cartelle e dei dati associati. 
// Questo approccio rende il codice più modulare e facilita la gestione dei dati delle cartelle in un unico punto (il servizio Folder).

// Poi ho definito un metodo onFolderSelected(folderId: string) che viene chiamato quando una cartella viene selezionata.
// Questo metodo utilizza il servizio Folder per impostare la cartella selezionata, 
// consentendo al componente genitore (AppComponent) di reagire a questa selezione e aggiornare l'interfaccia utente di conseguenza.