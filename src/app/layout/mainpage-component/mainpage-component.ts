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
  selectedEmail: any; // Selected email è una proprietà che memorizza l'email selezionata dall'utente. 
  //Viene inizializzata come null, indicando che nessuna email è selezionata all'inizio.

  onEmailSelected(email: any) {
    this.selectedEmail = email; // Quando l'utente seleziona un'email dalla lista, questa funzione viene chiamata. 
    //L'email selezionata viene passata come argomento e assegnata alla proprietà selectedEmail.
  }
  
}


//CommonModule serve per importare le direttive comuni di Angular come ngIf e ngFor, 
//mentre MatCheckboxModule serve per importare il modulo della checkbox di Angular Material.