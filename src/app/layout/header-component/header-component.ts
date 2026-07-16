import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { Folder } from '../../services/folder';

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule, MatTooltipModule, MatMenuModule, CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})

export class HeaderComponent {

  isLoggedIn;
  currentUser;

  constructor(private authService: AuthService, private router: Router, public folderService: Folder) {
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

}




