# COMMENTI

## PASSO 1: Creazione del componente MainLayoutComponent
In questo file, definisco il componente MainLayoutComponent utilizzando il decoratore @Component di Angular. 
Il componente rappresenta il layout principale dell'applicazione e contiene l'intestazione (HeaderComponent), la barra laterale (SidebarComponent) e il contenuto principale (RouterOutlet).


## PASSO 2: Importazione dei componenti necessari
Importo i componenti HeaderComponent e SidebarComponent, che rappresentano rispettivamente l'intestazione e la barra laterale dell'applicazione. 
Inoltre, importo RouterOutlet, che consente di visualizzare i componenti associati alle rotte definite nell'applicazione.


## PASSO 3: Definizione del template del componente
Definisco il template del componente utilizzando la proprietà template. 
All'interno del template, utilizzo i tag `<app-header-component>` e `<app-sidebar-component>` per includere l'intestazione e la barra laterale. 
Inoltre, utilizzo il tag `<router-outlet>` per visualizzare i componenti associati alle rotte definite nell'applicazione.


## PASSO 4: Definizione degli stili del componente
Definisco gli stili del componente utilizzando la proprietà styleUrls, che punta al file main-layout-component.scss. 
In questo file, posso definire gli stili specifici per il layout principale dell'applicazione.