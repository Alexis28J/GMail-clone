import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Folder } from '../../../services/folder';
import { EmailService } from '../../../services/email';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatMenuItem, MatMenuTrigger, MatMenu } from "@angular/material/menu";
import { FolderInterface } from '../../../interface/folder-interface';
import { MatDialog } from '@angular/material/dialog';
import { ManageFoldersDialog } from '../../../shared/manage-folders-dialog/manage-folders-dialog';
import { MatButtonModule } from "@angular/material/button";


@Component({
  selector: 'app-toolbar-component',
  imports: [MatIcon, MatTooltipModule, MatCheckboxModule, MatMenuItem, MatMenuTrigger, MatMenu, MatButtonModule],
  templateUrl: './toolbar-component.html',
  styleUrls: ['./toolbar-component.scss'],
})

export class ToolbarComponent {

  constructor(public folderService: Folder, private emailService: EmailService, private dialog: MatDialog) { }

  @Input() canGoNext = true;
  @Input() canGoPrev = true;
  @Input() isTrashView = false;
  @Input() availableFolders: FolderInterface[] = [];



  @Output() nextMail = new EventEmitter<void>();
  @Output() prevMail = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() restore = new EventEmitter<void>();
  @Output() archive = new EventEmitter<void>();
  @Output() moveRequested = new EventEmitter<string>();
  @Output() actualDelete = new EventEmitter<void>();
  @Output() asSpam = new EventEmitter<void>();
  @Output() manageFolders = new EventEmitter<void>();


  ////// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER NAVIGARE TRA LE EMAIL
  onNext() {
    this.nextMail.emit();
  }

  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER NAVIGARE TRA LE EMAIL
  onPrev() {
    this.prevMail.emit();
  }

  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER ELIMINARE LE EMAIL SELEZIONATE
  onDelete() {
    this.delete.emit();
  }

  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER RIPRISTINARE LE EMAIL SELEZIONATE
  onRestore() {
    this.restore.emit();
  }

  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER ARCHIVIARE LE EMAIL SELEZIONATE
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
  allSelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();
    const selectableEmails = visibleEmails.filter(e => !e.is_deleted);
    return selectableEmails.length > 0 && selectableEmails.every(e => e.selected);
  });


  ///// VERIFICA SE ALCUNE EMAIL VISIBILI SONO SELEZIONATE
  isPartiallySelected = computed(() => {
    const visibleEmails = this.folderService.filteredEmails();

    if (visibleEmails.length === 0) {
      return false;
    }

    const selectedCount = visibleEmails.filter(e => e.selected).length;
    return selectedCount > 0 && selectedCount < visibleEmails.length;
  });


  ///// CAMBIO STATO SELEZIONE EMAILS
  toggleSelectAll(event: MatCheckboxChange) {
    const visibleEmails = this.folderService.filteredEmails();
    const ids = visibleEmails.map(email => email.id);

    this.emailService.setSelectedEmails(ids, event.checked);
  }


  ///// CONTA EMAIL SELEZIONATE 
  selectedCount = computed(() => {
    return this.folderService
      .filteredEmails()
      .filter(email => email.selected && !email.is_deleted)
      .length;
  });


  ///// POSSIBILITÀ DI ARCHIVIARE LE EMAIL
  canArchive = computed(() => {
    const folder = this.folderService.getSelectedFolder()();
    return folder !== 'trash' && folder !== 'archived';
  });


  ///// SPOSTA LE EMAIL SELEZIONATE IN UNA CARTELLA SPECIFICA 
  moveTo(folder: string) {
    this.moveRequested.emit(folder);
  }


  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER ELIMINARE LE EMAIL SELEZIONATE IN MODO DEFINITIVO
  onActualDelete() {
    this.actualDelete.emit();
  }


  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER SEGNALARE LE EMAIL COME SPAM
  onAsSpam() {
    this.asSpam.emit();
  }


  ///// EMETTE EVENTI AL COMPONENTE PADRE (MainPageComponent) PER APRIRE LA DIALOG PER GESTIRE I FOLDER CUSTOM
  onManageFolders() {
    this.manageFolders.emit();
  }

}