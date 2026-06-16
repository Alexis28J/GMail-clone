import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-sidebar-component',
  imports: [MatIconModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {
  //menuItems è un array di oggetti che rappresentano le voci del menu laterale. 
  //lo inseriamo qui per poterlo utilizzare nel template HTML del componente.
  menuItems = [   
    { id: 1, name: 'Inbox', icon: 'inbox', count: 4 },
    { id: 2, name: 'Special', icon: 'star' },
    { id: 3, name: 'Sent Mail', icon: 'send' },
    { id: 4, name: 'Drafts', icon: 'drafts', count: 1 },
    { id: 5, name: 'Spam', icon: 'report', count: 20 },
    { id: 6, name: 'Important', icon: 'label' },
    { id: 7, name: 'Purchases', icon: 'shopping_cart' },
    { id: 8, name: 'Trash', icon: 'delete' },
  ];
}
