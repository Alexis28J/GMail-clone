import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { EmailInterface } from '../../../interface/email-interface';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Folder } from '../../../services/folder';
import { MatCheckbox } from "@angular/material/checkbox";
import { EmailService } from '../../../services/email';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-mail-list-component',
  imports: [DatePipe, FormsModule, MatCheckbox, MatIconModule],
  templateUrl: './mail-list-component.html',
  styleUrls: ['./mail-list-component.scss'],
})

export class MailListComponent {

  constructor(private folderService: Folder, private sanitizer: DomSanitizer, private emailService: EmailService) {
  }

  @Input() emails: EmailInterface[] = [];


  ///////////////////////////SELEZIONE EMAIL///////////////////////////////////////////////

  @Output() emailSelected = new EventEmitter<EmailInterface>();


  selectEmail(email: EmailInterface) {
    this.emailSelected.emit(email);
  }


  selectedEmails: EmailInterface[] = [];

  toggleSelection(email: EmailInterface) {
    const index = this.selectedEmails.findIndex(e => e.id === email.id);

    if (index > -1) {
      this.selectedEmails.splice(index, 1);
    } else {
      this.selectedEmails.push(email);
    }
  }

  isSelected(email: EmailInterface): boolean {
    return this.selectedEmails.some(e => e.id === email.id);
  }


  ///////////////////////////////////PREFERITI///////////////////////////////////////////////


  // toggleStar(email: EmailInterface) {
  //   email.starred = !email.starred;
  // }

  toggleStar(email: EmailInterface) {
    this.emailService.toggleStar(email);
  }


  getAllEmails(): EmailInterface[] {
    return this.emails;
  }


  //////////////////////////////////EVIDENZIA PAROLE CHIAVE///////////////////////////////////////////////

  highlight(text: string): SafeHtml {

    const search = this.folderService.getSearchTerm()();

    if (!search) return text;

    const keywords = search.split(' ').filter(k => k.length > 0);

    let highlighted = text;

    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(
        regex,
        `<mark>$1</mark>`
      );
    })
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }


  //////////////////////////////////HANDLER PER LA SELEZIONE DELLE EMAIL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onSelectionChange(email: EmailInterface, event: MatCheckboxChange) {
    this.emailService.toggleEmailSelection(email.id, event.checked);
  }


  ///////////////////////////////////FORMATTING IL TIMESTAMP///////////////////////////////////////////////

  formatTimestamp(timestamp: string | number): string | number {

    return typeof timestamp === 'number'
      ? timestamp * 1000
      : timestamp;
  }

}

