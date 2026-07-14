import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmailInterface } from '../../../interface/email-interface';
import { EmailService } from '../../../services/email';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-mail-viewer-component',
  imports: [DatePipe, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './mail-viewer-component.html',
  styleUrls: ['./mail-viewer-component.scss'],
})

export class MailViewerComponent {

  constructor(public emailService: EmailService) { }

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
