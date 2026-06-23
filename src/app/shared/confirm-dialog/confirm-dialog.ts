import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
})
export class ConfirmDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

}


///////////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////

//import { Component, Inject } from '@angular/core';
//Importiamo il decoratore Component da Angular, che ci permette di dichiarare la classe come un componente. 
//Importiamo anche il decoratore Inject, che ci consente di iniettare dipendenze nel costruttore della classe.

//import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
//Importiamo MAT_DIALOG_DATA e MatDialogModule da Angular Material. 
//MAT_DIALOG_DATA è un token che ci permette di accedere ai dati passati al dialogo, mentre MatDialogModule è il modulo necessario per utilizzare i dialoghi di Angular Material.

//import { MatButtonModule } from '@angular/material/button';
//Importiamo MatButtonModule da Angular Material, che ci consente di utilizzare i pulsanti all'interno del dialogo.

// constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
//Il costruttore della classe accetta un parametro data, che viene iniettato utilizzando il decoratore Inject con il token MAT_DIALOG_DATA. 
//Questo parametro contiene i dati passati al dialogo, in questo caso un oggetto con una proprietà message di tipo string. 
//La proprietà data è dichiarata come pubblica, quindi può essere utilizzata nel template del componente per visualizzare il messaggio di conferma.