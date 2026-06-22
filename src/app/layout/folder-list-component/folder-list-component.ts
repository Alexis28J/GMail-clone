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



//////////////////////////////////PASSAGGI/////////////////////////////////////

// 1. Importare i moduli necessari da Angular, come Component, EventEmitter, Input e Output.


// 2. Importare l'interfaccia FolderInterface dal file folder-interface.ts, che definisce la struttura dei dati dei folder.


// 3. Utilizzare il decoratore @Component per definire il componente Angular, specificando il selettore, il template e lo stile del componente.


// 4. Dichiarare la classe FolderListComponent, che rappresenta il componente della lista dei folder.


// 5. Utilizzare il decoratore @Input() per dichiarare una proprietà folders di tipo FolderInterface[], che riceverà i dati dei folder dal componente genitore.
// Questa proprietà sarà utilizzata per visualizzare la lista dei folder nel template del componente.


// 6. Utilizzare il decoratore @Output() per dichiarare un EventEmitter chiamato folderSelected, che emetterà un evento quando un folder viene selezionato.
// Questo evento può essere ascoltato dal componente genitore (AppComponent) per eseguire azioni specifiche in base al folder selezionato. 
// In questo caso, l'evento emetterà una stringa che rappresenta l'id del folder selezionato.

// EventEmitter è una classe fornita da Angular che consente di creare eventi personalizzati. 
// In questo caso, folderSelected è un'istanza di EventEmitter che emetterà stringhe (gli id dei folder selezionati) quando viene chiamato il metodo onSelect.


// 7. Definire un metodo onSelect(folderId: string) che viene chiamato quando un folder viene selezionato.
// Questo metodo utilizza l'EventEmitter folderSelected per emettere l'id del folder selezionato, consentendo al componente genitore di reagire a questa selezione.
// In sintesi, questo componente è responsabile di visualizzare una lista di folder e di comunicare al componente genitore quale folder è stato selezionato tramite un evento.
// In questo modo, il componente genitore può gestire la logica associata alla selezione dei folder, come ad esempio filtrare le email in base al folder selezionato.


//emit significa "emettere" un evento, ovvero inviare un segnale che indica che qualcosa è accaduto.