import { Component } from '@angular/core';
import { SignatureService } from '../../services/signature';
import { MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-signature-dialog',
  imports: [MatDialogContent, MatFormField, MatInputModule, MatLabel,
    FormsModule, MatDialogActions, MatSlideToggleModule, MatButtonModule, MatIcon],
  templateUrl: './signature-dialog.html',
  styleUrls: ['./signature-dialog.scss'],
})

export class SignatureDialog {

  ///// VARIABILI CHE CONTENGONO IL TESTO DELLA FIRMA E LO STATO DI ABILITAZIONE
  signature = '';
  enabled = false;


  ///// COSTRUTTORE CHE INIETTA IL SERVIZIO DELLA FIRMA
  constructor(
    private signatureService: SignatureService
  ) {
    this.signature = this.signatureService.signature();
    this.enabled = this.signatureService.enabled();
  }


  ///// SALVA LA FIRMA E LO STATO DEL TOGGLE
  save() {
    this.signatureService.saveSignature(  
      this.signature,
      this.enabled
    );
  }


  ///// ELIMINA LA FIRMA E LO STATO DEL TOGGLE
  delete() {
    this.signatureService.deleteSignature(); 
    this.signature = '';
    this.enabled = false;
  }

}


