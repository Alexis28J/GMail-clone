import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Folder } from '../../../services/folder';
import { EmailService } from '../../../services/email';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatMenuItem, MatMenuTrigger, MatMenu } from "@angular/material/menu";
import { MovableFolder } from '../../../constants/folders.constants';


@Component({
  selector: 'app-toolbar-component',
  imports: [MatIcon, MatTooltipModule, MatCheckboxModule, MatMenuItem, MatMenuTrigger, MatMenu],
  templateUrl: './toolbar-component.html',
  styleUrls: ['./toolbar-component.scss'],
})

export class ToolbarComponent {

  constructor(public folderService: Folder, private emailService: EmailService) { }

  @Input() canGoNext = true;
  @Input() canGoPrev = true;
  @Input() isTrashView = false;

  @Output() nextMail = new EventEmitter<void>();
  //@Output() nextMail = new EventEmitter<EmailInterface>();

  @Output() prevMail = new EventEmitter<void>();
  //@Output() prevMail = new EventEmitter<EmailInterface>();

  @Output() delete = new EventEmitter<void>();  //emitte un evento a MainPageComponent

  @Output() restore = new EventEmitter<void>();

  @Output() archive = new EventEmitter<void>();

  @Output() moveRequested = new EventEmitter<MovableFolder>();


  onNext() {
    this.nextMail.emit();
  }

  onPrev() {
    this.prevMail.emit();
  }

  onDelete() {
    this.delete.emit();  //emitte un evento a MainPageComponent 
  }

  onRestore() {
    this.restore.emit();
  }

  onArchive() {
    this.archive.emit();
  }



  ///// RICARICA LE EMAIL DAL MOCKAPI.IO (bottone refresh)
  onRefresh() {
    this.emailService.loadEmails();
  }


  ///// INDICATORE DI CARICAMENTO EMAIL (bottone refresh)
  get loading() {
    return this.emailService.loading;
  }

  
  ///// VERIFICA SE TUTTE LE EMAIL VISIBILI SONO SELEZIONATE
  //allSelected(): boolean {
  allSelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();
    const selectableEmails = visibleEmails.filter(e => !e.is_deleted);
    return selectableEmails.length > 0 && selectableEmails.every(e => e.selected);
  });


  ////// CAMBIO STATO SELEZIONE EMAILS
  toggleSelectAll(event: MatCheckboxChange) {
    //const checked = (event.target as HTMLInputElement).checked;
    const visibleEmails = this.folderService.filteredEmails();
    const ids = visibleEmails.map(email => email.id);

    //this.emailService.setSelectedEmails(ids, checked);
    this.emailService.setSelectedEmails(ids, event.checked);
  }


  ////// VERIFICA SE ALCUNE EMAIL VISIBILI SONO SELEZIONATE
  //isPartiallySelected(): boolean {
  isPartiallySelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();

    if (visibleEmails.length === 0) {
      return false;
    }

    const selectedCount = visibleEmails.filter(e => e.selected).length;
    return selectedCount > 0 && selectedCount < visibleEmails.length;
  });


  ///// CONTA EMAIL SELEZIONATE 
  selectedCount = computed(() => {
    return this.folderService
      .filteredEmails()
      .filter(email => email.selected && !email.is_deleted)
      .length;
  })


  ///// POSSIBILITÀ DI ARCHIVIARE LE EMAIL
  canArchive = computed(() => {
    const folder = this.folderService.getSelectedFolder()();
    return folder !== 'trash' && folder !== 'archived';
  })


  ///// SPOSTA LE EMAIL SELEZIONATE IN UNA CARTELLA SPECIFICA 
  moveTo(folder: MovableFolder) {
    // this.emailService.moveSelectedEmails(folder);  // l'ho commentato perché voglio che sia MainPageComponent a gestire lo spostamento delle email selezionate in una cartella specifica, non ToolbarComponent. ToolbarComponent emette un evento a MainPageComponent e MainPageComponent gestisce lo spostamento delle email selezionate in una cartella specifica.
    this.moveRequested.emit(folder);  // moveTo solo deve emettere un evento a MainPageComponent per spostare le email selezionate in una cartella specifica. MainPageComponent gestirà lo spostamento delle email selezionate in una cartella specifica.
  }
  
}
