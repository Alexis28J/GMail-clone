import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar-component',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {  
  //menuItems è un array di oggetti che rappresentano le voci del menu laterale. 
  //lo inseriamo qui per poterlo utilizzare nel template HTML del componente.
  menuItems = [   
    { id: 1, name: 'Inbox', icon: 'inbox', count: 10 },
    { id: 2, name: 'Special', icon: 'star' },
    { id: 3, name: 'Sent', icon: 'send' },
    { id: 4, name: 'Drafts', icon: 'drafts', count: 1 },
    { id: 5, name: 'Spam', icon: 'report', count: 3 },
    { id: 6, name: 'Important', icon: 'label_important' },
    { id: 7, name: 'Categories', icon: 'label' },
    { id: 8, name: 'Snoozed', icon: 'snooze' },
    { id: 9, name: 'Trash', icon: 'delete' },
  ];
}



////////////////////////////////////////////COMMENTI//////////////////////////////////////////////////////////////////////////////

//Non ho importato CommonModule perché non utilizzo direttive come ngIf o ngFor in questo componente,
//mentre ho importato MatIconModule perché utilizzo le icone di Angular Material per rappresentare le voci del menu.

// export class SidebarComponent {  menuItems = [....] }
// menuItems è un array di oggetti che rappresentano le voci del menu laterale. 
// lo inseriamo qui per poterlo utilizzare nel template HTML del componente.
   