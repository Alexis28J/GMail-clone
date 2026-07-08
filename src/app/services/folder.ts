import { computed, Injectable, signal } from '@angular/core';
import { FolderInterface } from '../interface/folder-interface';
import { EmailService } from '../services/email'
import { EmailInterface } from '../interface/email-interface';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class Folder {

  constructor(private emailService: EmailService, private authService: AuthService) { }

  private selectedFolder = signal<string>('inbox');

  private foldersSignal = signal<FolderInterface[]>(
    [
      { id: 'inbox', name: 'Inbox', icon: 'inbox' },
      { id: 'starred', name: 'Special', icon: 'star' },
      { id: 'snoozed', name: 'Snoozed', icon: 'watch_later' },
      { id: 'sent', name: 'Sent', icon: 'send' },
      { id: 'drafts', name: 'Drafts', icon: 'drafts' },
      { id: 'spam', name: 'Spam', icon: 'report' },
      { id: 'important', name: 'Important', icon: 'label_important' },
      { id: 'personal', name: 'Personal', icon: 'person' },
      { id: 'archived', name: 'Archived', icon: 'archive' },
      { id: 'work', name: 'Work', icon: 'work' },
      { id: 'trash', name: 'Trash', icon: 'delete' },
    ]
  );

  getFolders() {
    return this.foldersSignal;
  }

  setSelectedFolder(folderId: string) {

    if (this.selectedFolder() === folderId) {
      return;
    }

    this.emailService.clearSelection();
    this.selectedFolder.set(folderId);
  }

  getSelectedFolder() {
    return this.selectedFolder;
  }


  // TROVARE MESSAGGI
  private searchTerm = signal<string>('');

  setSearchTerm(term: string) {
    this.searchTerm.set(term.toLowerCase().trim());
  }

  getSearchTerm() {
    return this.searchTerm;
  }


  //Integro la search dentro filteredEmails. 


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
        //return emails.filter(e => e.starred && !e.is_deleted);
        result = emails.filter(e => e.starred && !e.is_deleted);
        break;

      case 'important':
        //return emails.filter(e => e.label === 'Important' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Important' && !e.is_deleted);
        break;

      case 'spam':
        //return emails.filter(e => e.folder === 'spam');
        result = emails.filter(e => e.folder === 'spam' && !e.is_deleted);
        break;

      case 'trash':
        //return emails.filter(e => e.is_deleted === true);
        result = emails.filter(e => e.is_deleted === true);
        break;

      case 'drafts':
        //return emails.filter(e => e.folder === 'drafts');
        result = emails.filter(e => e.folder === 'drafts' && !e.is_deleted);
        break;

      case 'sent':
        //return emails.filter(e => e.folder === 'sent');
        result = emails.filter(e => e.folder === 'sent' && !e.is_deleted);
        break;

      case 'personal':
        //return emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Personal' && !e.is_deleted);
        break;

      case 'work':
        //return emails.filter(e => e.label === 'Work' && !e.is_deleted);
        result = emails.filter(e => e.label === 'Work' && !e.is_deleted);
        break;

      case 'archived':
        //return emails.filter(e => e.folder === 'archived');
        result = emails.filter(e => e.folder === 'archived' && !e.is_deleted);
        break;

      case 'snoozed':
        //return emails.filter(e => e.folder === 'snoozed');
        result = emails.filter(e => e.folder === 'snoozed' && !e.is_deleted);
        break;

      case 'inbox':
      //return emails.filter(e => !e.is_deleted);

      //default: return emails.filter(e => !e.is_deleted);

      default: result = emails.filter(e => !e.is_deleted && e.folder === folder);

    }

    // FILTRO SEARCH 

    // Questa versione cerca in tutti i campi, anche quelli disattivati nel menu filtri.
    // Inoltre, non supporta la ricerca multi-keyword.

    // if (!search) return result;
    // return result.filter(email =>   
    //   email.subject.toLowerCase().includes(search) ||
    //   email.sender.toLowerCase().includes(search) ||
    //   email.body.toLowerCase().includes(search) ||
    //   email.recipient.toLowerCase().includes(search)
    // );


    // FILTRO SEARCH (VERSIONE MULTIKEYWORD) E FILTRO MENU FILTRI (SUBJECT, SENDER, DATE)
    if (!search) return result;

    const keywords = search.split(' ').filter(k => k.length > 0);

    // Questa versione supporta la ricerca multi-keyword, ma non il menu filtri. Cerca in tutti i campi.
    // return result.filter(email => {     

    //   const fields = [
    //     email.subject,
    //     email.body,
    //     email.sender,
    //     email.recipient
    //   ].join(' ').toLowerCase();


    //   // return keywords.every(keyword => 
    //   //   searchableText.includes(keyword));

    //   return keywords.some(keyword =>
    //     fields.includes(keyword));

    // });

    return result.filter(email => {

      const fields: string[] = [];

      if (filters.subject) fields.push(email.subject);
      if (filters.sender) fields.push(email.sender);

      //if (filters.date) fields.push(email.timestamp.toString()); 
      if (filters.date) {
        const date = typeof email.timestamp === 'string' ? new Date(email.timestamp) : email.timestamp;

        const fullDate = date.toISOString(); // 2026-06-14
        const year = date.getFullYear().toString(); // 2026

        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 06
        const monthRaw = (date.getMonth() + 1).toString(); // 6

        const day = date.getDate().toString().padStart(2, '0'); // 14
        const dayRaw = date.getDate().toString(); // 14

        const monthName = date.toLocaleString('en', { month: 'long' }).toLowerCase(); // june
        const monthNameIT = date.toLocaleString('it', { month: 'long' }).toLowerCase(); // giugno

        fields.push(`${fullDate} ${year} ${month} ${monthRaw} ${day} ${dayRaw} ${monthName} ${monthNameIT}`);

      }


      // fallback se tutto è disattivato. 

      if (fields.length === 0) {

        fields.push(email.subject, email.body, email.sender, email.recipient);

      }

      const searchableText = fields.join(' ').toLowerCase();

      return keywords.every(keyword =>
        searchableText.includes(keyword)
      )

    });

  });

  // MENU FILTRI
  private activeFilters = signal({
    subject: true,
    sender: true,
    date: false
  });


  setFilter(key: keyof ReturnType<typeof this.activeFilters>, value: boolean) {
    this.activeFilters.update(f => ({ ...f, [key]: value }));
  }

  getFilters() {
    return this.activeFilters;
  }

}




