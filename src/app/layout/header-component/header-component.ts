import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})
export class HeaderComponent {}


//Non ho importato CommonModule perché non utilizzo direttive come ngIf o ngFor in questo componente,
//mentre ho importato MatIconModule perché utilizzo le icone di Angular Material per rappresentare le voci del menu.