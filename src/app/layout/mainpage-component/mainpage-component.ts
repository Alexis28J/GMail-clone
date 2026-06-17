import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mainpage-component',
  imports: [CommonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss'],
})
export class MainpageComponent {}


//CommonModule serve per importare le direttive comuni di Angular come ngIf e ngFor, 
//mentre MatCheckboxModule serve per importare il modulo della checkbox di Angular Material.