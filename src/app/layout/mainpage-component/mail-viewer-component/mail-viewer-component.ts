import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmailInterface } from '../../../interface/email-interface';

@Component({
  selector: 'app-mail-viewer-component',
  imports: [DatePipe],
  templateUrl: './mail-viewer-component.html',
  styleUrls: ['./mail-viewer-component.scss'],
})

export class MailViewerComponent {

  @Input() email: EmailInterface | null = null;

  @Output() reply = new EventEmitter<EmailInterface>();
  @Output() forward = new EventEmitter<EmailInterface>();

  onForward() {
    if (this.email) {
      this.forward.emit(this.email);
    }

  }
  onReply() {
    if (this.email) {
      this.reply.emit(this.email);
    }
  }

}
