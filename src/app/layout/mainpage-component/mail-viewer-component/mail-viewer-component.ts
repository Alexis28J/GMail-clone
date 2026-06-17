import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mail-viewer-component',
  imports: [],
  templateUrl: './mail-viewer-component.html',
  styleUrls: ['./mail-viewer-component.scss'],
})
export class MailViewerComponent {

@Input() email: any;  // @Input() permette al main di passare l’email selezionata

}
