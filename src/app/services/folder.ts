import { computed, Injectable, signal } from '@angular/core';
import { FolderInterface } from '../interface/folder-interface';
import { EmailService } from '../services/email';
import { HttpClient } from '@angular/common/http';
import { EmailInterface } from '../interface/email-interface';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class Folder {

  constructor(private emailService: EmailService, private authService: AuthService, private http: HttpClient
  ) {
    this.loadFolders();
  }


  ///// SIGNAL PER TENERE TRACCIA DELLA CARTELLA SELEZIONATA (INBOX, STARRED, SPAM, TRASH, ETC.)
  private selectedFolder = signal<string>('inbox');


  ///// FOLDERS DI SISTEMA (NON MODIFICABILI DALL'UTENTE) 
  private systemFolders: FolderInterface[] = [
    { id: 'inbox', name: 'Inbox', icon: 'inbox', movable: true, system: true },
    { id: 'starred', name: 'Special', icon: 'star', movable: false, system: true },
    { id: 'snoozed', name: 'Snoozed', icon: 'watch_later', movable: false, system: true },
    { id: 'sent', name: 'Sent', icon: 'send', movable: false, system: true },
    { id: 'drafts', name: 'Drafts', icon: 'drafts', movable: false, system: true },
    { id: 'spam', name: 'Spam', icon: 'report', movable: false, system: true },
    { id: 'important', name: 'Important', icon: 'label_important', movable: false, system: true },
    { id: 'personal', name: 'Personal', icon: 'person', movable: false, system: true },
    { id: 'archived', name: 'Archived', icon: 'archive', movable: false, system: true },
    { id: 'work', name: 'Work', icon: 'work', movable: false, system: true },
    { id: 'trash', name: 'Trash', icon: 'delete', movable: false, system: true },
  ];


  ///// FOLDERS SIGNAL (FOLDERS DI SISTEMA + FOLDERS CUSTOM)
  private foldersSignal = signal<FolderInterface[]>([]);


  ///// API URL
  private folderApiUrl =
    'https://6a477fc3abfcbaade1188ff8.mockapi.io/api/gclone/folder';


  ///// RECUPERO CARTELLE (FOLDERS DI SISTEMA + FOLDERS CUSTOM)
  getFolders() {
    return this.foldersSignal;
  }


  ///// CARTELLA SELEZIONATA
  setSelectedFolder(folderId: string) {

    if (this.selectedFolder() === folderId) {
      return;
    }

    this.emailService.clearSelection();
    this.selectedFolder.set(folderId);
  }


  ///// RECUPERO CARTELLA SELEZIONATA
  getSelectedFolder() {
    return this.selectedFolder;
  }


  //////////////////////////////////////FILTRO CARTELLE E RICERCA EMAIL//////////////////////////////////////////

  ///// TERMINI DI RICERCA
  private searchTerm = signal<string>('');


  ///// IMPOSTA TERMINI DI RICERCA
  setSearchTerm(term: string) {
    this.searchTerm.set(term.toLowerCase().trim());
  }

  ///// RECUPERO TERMINI DI RICERCA
  getSearchTerm() {
    return this.searchTerm;
  }

  /////Integro la search (cioè i termini di ricerca) dentro filteredEmails////// 


  ///// MESSAGGI FILTRATI (IN BASE ALLA CARTELLA SELEZIONATA E AI TERMINI DI RICERCA)
  filteredEmails = computed(() => {

    if (!this.authService.isLoggedIn()) {
      return [];
    }

    const folder = this.selectedFolder();
    const emails = this.emailService.getEmails()();
    const search = this.searchTerm();
    const filters = this.activeFilters();

    let result: EmailInterface[];

    switch (folder) {

      case 'starred':
        result = emails.filter(e => e.starred && !e.is_deleted);
        break;

      case 'important':
        result = emails.filter(e => e.label === 'Important' && !e.is_deleted);
        break;

      case 'spam':
        result = emails.filter(e => e.folder === 'spam' && !e.is_deleted);
        break;

      case 'trash':
        result = emails.filter(e => e.is_deleted === true);
        break;

      case 'drafts':
        result = emails.filter(e => e.folder === 'drafts' && !e.is_deleted);
        break;

      case 'sent':
        result = emails.filter(e => e.folder === 'sent' && !e.is_deleted);
        break;

      case 'personal':
        result = emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        break;

      case 'work':
        result = emails.filter(e => e.label === 'Work' && !e.is_deleted);
        break;

      case 'archived':
        result = emails.filter(e => e.folder === 'archived' && !e.is_deleted);
        break;

      case 'snoozed':
        result = emails.filter(e => e.folder === 'snoozed' && !e.is_deleted);
        break;

      case 'inbox':
      default: result = emails.filter(e => !e.is_deleted && e.folder === folder);

    }


    ///// FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)
    if (!search) return result;

    const keywords = search.split(' ').filter(k => k.length > 0);

    return result.filter(email => {

      const fields: string[] = [];

      if (filters.subject) fields.push(email.subject);
      if (filters.sender) fields.push(email.sender);


      ///// Filtro per data (correzione)
      if (filters.date) {

        const date =
          typeof email.timestamp === 'number'
            ? new Date(email.timestamp * 1000)
            : new Date(email.timestamp);

        if (isNaN(date.getTime())) {
          return false;
        }

        const day = date.getDate().toString();
        const dayPadded = day.padStart(2, '0');

        const month = (date.getMonth() + 1).toString();
        const monthPadded = month.padStart(2, '0');

        const monthNameIT = date
          .toLocaleString('it', { month: 'long' })
          .toLowerCase();

        const monthNameEN = date
          .toLocaleString('en', { month: 'long' })
          .toLowerCase();

        fields.push(
          `
        ${day}
        ${dayPadded}
        ${month}
        ${monthPadded}
        ${monthNameIT}
        ${monthNameEN}
        ${day}/${month}
        ${dayPadded}/${monthPadded}
          `
        );

      }

      /////fallback se tutto è disattivato/////
      if (fields.length === 0) {

        fields.push(email.subject, email.body, email.sender, email.recipient);

      }
      ///////////// 

      const searchableText = fields.join(' ').toLowerCase();
      return keywords.every(keyword =>
        searchableText.includes(keyword)
      )

    });

  });


  ///// SIGNAL PER TENERE TRACCIA DEI FILTRI ATTIVI (SUBJECT, SENDER, DATE)
  private activeFilters = signal({
    subject: true,
    sender: true,
    date: false
  });


  ///// IMPOSTA FILTRO ATTIVO/DISATTIVO
  setFilter(key: keyof ReturnType<typeof this.activeFilters>, value: boolean) {
    this.activeFilters.update(f => ({ ...f, [key]: value }));
  }


  ///// RECUPERO FILTRI ATTIVI
  getFilters() {
    return this.activeFilters;
  }


  /////////////////////////////////////////CARTELLE CUSTOM//////////////////////////////////////////////////

  ////// AGGIUNGI CARTELLA PERSONALIZZATA
  addFolder(name: string) {

    const exists = this.foldersSignal().some(folder => folder.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      console.error(`Folder with name "${name}" already exists.`);
      return;
    }

    this.http.post<FolderInterface>(
      this.folderApiUrl,
      {
        name,
        icon: 'folder',
        system: false,
        movable: true
      }
    ).subscribe(folder => {
      this.foldersSignal.update(folders => [
        ...folders,
        folder
      ]);
    });
  }


  ///// CARICA CARTELLE DI SISTEMA E PERSONALIZZATE DA API
  loadFolders() {

    this.http.get<FolderInterface[]>(
      this.folderApiUrl
    )
      .subscribe(customFolders => {

        this.foldersSignal.set([
          ...this.systemFolders,
          ...customFolders
        ]);

      });

  }


  ///// RINOMINA CARTELLA PERSONALIZZATA
  updateFolder(folderId: string, newName: string) {
    const exists = this.foldersSignal().some(
      folder =>
        folder.id !== folderId &&
        folder.name.toLowerCase() === newName.toLowerCase()
    );

    if (exists) {
      
     // dialog di Angular Material per mostrare un messaggio di errore
      alert(`Folder with name "${newName}" already exists.`);
      return;

    }

    this.http.put<FolderInterface>(
      `${this.folderApiUrl}/${folderId}`,
      {
        name: newName,
        icon: 'folder'
      }
    ).subscribe(updatedFolder => {
      this.foldersSignal.update(folders =>
        folders.map(folder => folder.id === folderId
          ? {
            ...folder,
            ...updatedFolder
          }
          : folder
        )
      )
    });
  }


  ///// ELIMINA FOLDER CUSTOM
  deleteFolder(folderId: string) {

    this.emailService.moveEmailsFromDeletedFolder(folderId); // Questa riga deve essere eseguita prima della chiamata HTTP per eliminare la cartella, in modo da spostare le email associate alla cartella eliminata nella cartella "inbox".

    this.http.delete(`${this.folderApiUrl}/${folderId}`)
      .subscribe(() => {
        this.foldersSignal.update(
          folders =>
            folders.filter(folder => folder.id !== folderId)
        );

        if (this.selectedFolder() === folderId) {
          this.selectedFolder.set('inbox');
        }

      });
  }


}




