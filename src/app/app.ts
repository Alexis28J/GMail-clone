import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header-component/header-component';
import { SidebarComponent } from "./layout/sidebar-component/sidebar-component";
import { MainpageComponent } from "./layout/mainpage-component/mainpage-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, MainpageComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('GMail-clone');
}




////////////////////////////////COMMENTI///////////////////////////////////////////////////////

//Un'interfaccia in TypeScript è un contratto, cioè una struttura che definisce la forma di un oggetto, specificando le proprietà e i metodi che devono essere implementati da una classe che implementa quell'interfaccia. 


//Un decoratore in TypeScript è una funzione che può essere applicata a classi, metodi, proprietà o parametri per aggiungere funzionalità o modificare il comportamento di questi elementi. 
//I decoratori sono spesso utilizzati in Angular per definire componenti, direttive, servizi e altri elementi dell'applicazione.


//Una proprietà in TypeScript è una variabile associata a una classe o a un oggetto, che può contenere dati o riferimenti a funzioni.


//Un oggetto in TypeScript è una raccolta di proprietà e metodi che rappresentano un'entità o un concetto. 
//Gli oggetti possono essere creati utilizzando classi o letterali di oggetti, e possono essere utilizzati per modellare dati e comportamenti all'interno di un'applicazione.


//Una classe in TypeScript è una struttura che consente di creare oggetti con proprietà e metodi.


//Un componente in Angular è una classe che rappresenta una parte dell'interfaccia utente dell'applicazione, definendo il comportamento e l'aspetto di quella parte.
//Classe e componente sono concetti strettamente correlati in Angular, poiché un componente è una classe che viene decorata con il decoratore @Component per definire le sue proprietà e il suo comportamento all'interno dell'applicazione.


//Un'istanza in TypeScript è un oggetto creato a partire da una classe, che possiede le proprietà e i metodi definiti nella classe stessa.


//Un constructor in TypeScript è un metodo speciale all'interno di una classe che viene chiamato automaticamente quando viene creata un'istanza della classe.
//Viene utilizzato per inizializzare le proprietà della classe e per eseguire eventuali operazioni necessarie all'istanziazione dell'oggetto, cioè quando viene creato un nuovo oggetto a partire dalla classe.


//Inizializzazione in TypeScript si riferisce al processo di assegnazione di valori iniziali alle proprietà di una classe o di un oggetto al momento della loro creazione.




