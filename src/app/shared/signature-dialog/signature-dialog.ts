import { Component } from '@angular/core';
import { SignatureService } from '../../services/signature';
import { MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { SignatureInterface } from '../../interface/signature-interface';

@Component({
  selector: 'app-signature-dialog',
  imports: [MatDialogContent, MatFormField, MatInputModule, MatLabel,
    FormsModule, MatDialogActions, MatSlideToggleModule, MatButtonModule, MatIcon],
  templateUrl: './signature-dialog.html',
  styleUrls: ['./signature-dialog.scss'],
})

export class SignatureDialog {

  ///// VARIABILI CHE CONTENGONO LO STATO DELLA FIRMA SELEZIONATA
  selectedId: string | null = null;
  name = '';
  content = '';
  enabled = false;


  ///// COSTRUTTORE CHE INIZIALIZZA LO STATO DELLA FIRMA SELEZIONATA
  constructor(
    public signatureService: SignatureService
  ) {
    this.enabled = this.signatureService.enabled();

    const active = this.signatureService.signatures().find(
      s => s.id === this.signatureService.activeSignatureId()
    );

    if (active) {
      this.selectSignature(active);
    }
  }


  ///// METODO CHE SELEZIONA UNA FIRMA 
  selectSignature(
    signature: SignatureInterface
  ) {
    this.selectedId = signature.id || null;
    this.name = signature.name || '';
    this.content = signature.content || '';
  }


  ///// METODO CHE CREA UNA NUOVA FIRMA
  newSignature() {
    this.selectedId = null;
    this.name = '';
    this.content = '';
  }


  ///// METODO CHE SALVA LA FIRMA SELEZIONATA
  save() {

    if (!this.name.trim()) {
      return;
    }

    if (this.selectedId) {

      this.signatureService.updateSignature({
        id: this.selectedId,
        name: this.name,
        content: this.content
      });

    } else {

      this.signatureService.addSignature(
        this.name,
        this.content
      );

    }

  }


  ///// METODO CHE ELIMINA LA FIRMA SELEZIONATA
  delete() {

    if (!this.selectedId) {
      return;
    }

    this.signatureService.deleteSignature(
      this.selectedId
    );

    this.newSignature();

  }


  ///// METODO CHE IMPOSTA LA FIRMA DI DEFAULT
  setDefault(id: string) {
    this.signatureService.setActiveSignature(id);
  }


  ///// METODO CHE ATTIVA/DISATTIVA LA FIRMA
  toggleEnabled() {
    this.signatureService.setEnabled(this.enabled);
  }

}


