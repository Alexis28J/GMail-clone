import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { Folder } from '../../services/folder';
import { MatDialog } from '@angular/material/dialog';
import { SignatureDialog } from '../../shared/signature-dialog/signature-dialog';

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule, MatTooltipModule, MatMenuModule, CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})

export class HeaderComponent {

  isLoggedIn;
  currentUser;

  constructor(private authService: AuthService, private router: Router, public folderService: Folder, private dialog: MatDialog) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUser = this.authService.getCurrentUser();
  }

  ///// NAVIGAZIONE AL LOGIN
  goToLogin() {
    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }


  ///// NAVIGAZIONE AL REGISTER
  goToRegister() {
    //this.router.navigate(['/login']);
    this.router.navigate(['/register']);
  }


  ///// FUNZIONE DI LOGOUT
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ///// FUNZIONE DI RICERCA
  onSearch(value: string) {
    this.folderService.setSearchTerm(value);
  }


  ///// FUNZIONE DI FILTRO (PULSANTI CHECKBOX)
  toggleFilter(type: 'subject' | 'sender' | 'date', event: any) {
    this.folderService.setFilter(type, event.target.checked);
  }


  ///// APRI IL DIALOGO DELLA FIRMA DIGITALE
  openSignatureDialog() {
    this.dialog.open(
      SignatureDialog,
      {
        width: '550px'
      }
    );
  }


  ///// FUNZIONE PER LA ROTAZIONE DELL'ICONA SETTINGS
  isRotated = false;

  rotateIcon() {
    this.isRotated = !this.isRotated;
  }

}




