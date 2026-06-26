import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule, MatTooltipModule, MatMenuModule, CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})
export class HeaderComponent {

  isLoggedIn;
  currentUser;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUser = this.authService.getCurrentUser();
  }

  goToLogin() {
    if (this.router.url !== '/login') {
    this.router.navigate(['/login']);
    }
  }

  goToRegister() {
    //this.router.navigate(['/login']);
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}


////////////////////////////////////COMMENTI/////////////////////////////////////////////////

/// PASSO 1: Creazione del componente HeaderComponent
// In questo file, definisco il componente HeaderComponent utilizzando il decoratore @Component di Angular. 
// Il componente rappresenta l'intestazione dell'applicazione e contiene la logica per gestire l'autenticazione dell'utente e la navigazione tra le pagine.


// PASSO 2: Importazione dei moduli necessari
// Importo i moduli necessari per il componente, come MatIconModule, MatTooltipModule, MatMenuModule, CommonModule e RouterModule. 
// Questi moduli forniscono funzionalità aggiuntive per la gestione delle icone, dei tooltip, dei menu e della navigazione tra le pagine.


// PASSO 3: Definizione delle proprietà del componente
// Definisco le proprietà isLoggedIn e currentUser, che vengono inizializzate utilizzando i metodi del servizio AuthService. 
// Queste proprietà vengono utilizzate per determinare se l'utente è autenticato e per ottenere le informazioni sull'utente corrente.

// templateUrl: './login-component.html',   
// In Angular non è possibile utilizzare contemporaneamente templateUrl e template nello stesso decoratore @Component. 
// Le proprietà si escludono a vicenda poiché definiscono due metodi alternativi per fornire l'HTML del componente.


// PASSO 4: Implementazione dei metodi di navigazione
// Implemento i metodi goToLogin(), goToRegister() e logout() per gestire la navigazione tra le pagine di login, registrazione e logout. 
// Questi metodi utilizzano il Router di Angular per navigare tra le rotte definite nell'applicazione.




