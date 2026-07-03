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

  onSearch(value: string){
     this.folderService.setSearchTerm(value);
  }

  toggleFilter(type: 'subject' | 'sender' | 'date', event: any){
      this.folderService.setFilter(type, event.target.checked);
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
// Poi definisco il costruttore del componente, che accetta come parametri le istanze dei servizi AuthService e Router.


// public vuol dire che la proprietà folderService è accessibile anche dal template del componente HeaderComponent.
// templateUrl: './login-component.html',   
// In Angular non è possibile utilizzare contemporaneamente templateUrl e template nello stesso decoratore @Component. 
// Le proprietà si escludono a vicenda poiché definiscono due metodi alternativi per fornire l'HTML del componente.


// PASSO 4: Implementazione dei metodi di navigazione
// Implemento i metodi goToLogin(), goToRegister() e logout() per gestire la navigazione tra le pagine di login, registrazione e logout. 
// Questi metodi utilizzano il Router di Angular per navigare tra le rotte definite nell'applicazione.


// PASSO 5: Implementazione del metodo di ricerca
// Importo il servizio Folder nel componente HeaderComponent.
// Implemento il metodo onSearch(value: string) per gestire la ricerca delle email. 
// Questo metodo chiama il metodo setSearchTerm() del servizio Folder per impostare il termine di ricerca inserito dall'utente.

// value è il termine di ricerca inserito dall'utente nell'input di ricerca e si aspetta che venga passato come argomento al metodo onSearch() quando l'utente digita qualcosa nell'input di ricerca.


// PASSO 6: Implementazione del metodo di filtro
// Implemento il metodo toggleFilter(type: 'subject' | 'sender' | 'date', event: any) per gestire i filtri delle email. 
// Questo metodo chiama il metodo setFilter() del servizio Folder per impostare i filtri attivi in base al tipo di filtro selezionato dall'utente (subject, sender o date) e allo stato del checkbox (event.target.checked).
// type è il tipo di filtro selezionato dall'utente (subject, sender o date) e event è l'evento generato dal checkbox che indica se il filtro è attivo o meno.
// event.target.checked restituisce un valore booleano che indica se il checkbox è selezionato (true) o deselezionato (false). Questo valore viene passato al metodo setFilter() per aggiornare lo stato del filtro nel servizio Folder.

// Ho messo come publico il servizio Folder in modo da poterlo utilizzare direttamente nel template del componente HeaderComponent.

