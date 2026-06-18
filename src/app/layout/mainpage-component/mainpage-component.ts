import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from "./toolbar-component/toolbar-component";
import { MailListComponent } from "./mail-list-component/mail-list-component";
import { MailViewerComponent } from "./mail-viewer-component/mail-viewer-component";


@Component({
  selector: 'app-mainpage-component',
  imports: [CommonModule, MatCheckboxModule, MatIconModule, ToolbarComponent, MailListComponent, MailViewerComponent],
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss'],
})
export class MainpageComponent {

  selectedEmail: any;

  onEmailSelected(email: any) {
    this.selectedEmail = email;
  }

  onForward($event: any) {
    console.log('FORWARD:', this.selectedEmail);
  }
  onReply($event: any) {
    console.log('REPLY:', this.selectedEmail);
  }

  //////////////////////////////////PAGINA PRECEDENTE/SUCCESSIVA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  allEmails: any[] = [];
  paginatedEmails: any[] = [];

  currentPage: number = 1;
  pageSize: number = 10;


}



////////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CommonModule serve per importare le direttive comuni di Angular come ngIf e ngFor, 
//mentre MatCheckboxModule serve per importare il modulo della checkbox di Angular Material.


//selectedEmail: any; // Selected email è una proprietà che memorizza l'email selezionata dall'utente. 
//Viene inizializzata come null, indicando che nessuna email è selezionata all'inizio.


//OnEmailSelected(email: any) è un metodo che viene chiamato quando l'utente seleziona un'email dalla lista.


// onEmailSelected(email: any) {this.selectedEmail = email; }
// Quando l'utente seleziona un'email dalla lista, questa funzione viene chiamata. 
// L'email selezionata viene passata come argomento e assegnata alla proprietà selectedEmail.


//allEmails: any[] = []; 
//Questa proprietà memorizza tutte le email disponibili. Viene inizializzata come un array vuoto.


//paginatedEmails: any[] = []; 
//Questa proprietà memorizza le email che vengono visualizzate nella pagina corrente. Viene inizializzata come un array vuoto. 
//Quando l'utente naviga tra le pagine, questa proprietà viene aggiornata con le email corrispondenti alla pagina selezionata.


//currentPage: number = 1;  
//0 non è una pagina valida, quindi si inizia da 1 









