import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mail-list-component',
  imports: [DatePipe],
  templateUrl: './mail-list-component.html',
  styleUrls: ['./mail-list-component.scss'],
})
export class MailListComponent {

  emails = [
    {
      id: 1,
      sender: 'Carlo Bonamico',
      subject: 'Meeting Reminder',
      body: 'Don\'t forget about our meeting tomorrow at 9 AM.',
      timestamp: new Date('2026-06-01T09:00:00'),
    },
    {
      id: 2,
      sender: 'Lione Melania',
      subject: 'Medical Appointment',
      body: 'Your medical appointment is scheduled for June 19 at 15:50 PM.',
      timestamp: new Date('2026-06-15T08:50:00'),
    },
    {
      id: 3,
      sender: 'HR Department',
      subject: 'Document Submission',
      body: 'Please submit the required documents by June 10th.',
      timestamp: new Date('2026-06-10T11:15:00'),
    },
    {
      id: 4,
      sender: 'Github Support',
      subject: 'Account Verification',
      body: 'Please verify your account by clicking the link in the email.',
      timestamp: new Date('2026-06-04T14:30:00'),
    },
    {
      id: 5,
      sender: 'Comune di Genova',
      subject: 'Citizen Service Update',
      body: 'You have a new citizen service update from Comune di Genova.',
      timestamp: new Date('2026-06-05T10:45:00'),
    },
    {
      id: 6,
      sender: 'Amazon',
      subject: 'Order Confirmation',
      body: 'Your order has been confirmed and will be shipped soon.',
      timestamp: new Date('2026-06-06T16:20:00'),
    },
    {
      id: 7,
      sender: 'eBay',
      subject: 'Object Sold',
      body: 'Your item has been sold on eBay.',
      timestamp: new Date('2026-06-07T12:00:00'),
    },
    {
      id: 8,
      sender: 'Prime Video',
      subject: 'Subscription Renewal',
      body: 'Your subscription has been renewed successfully.',
      timestamp: new Date('2026-06-08T09:00:00'),
    },
    {
      id: 9,
      sender: 'Microsoft',
      subject: 'Software Update',
      body: 'A new software update is available for your device.',
      timestamp: new Date('2026-06-09T14:00:00'),
    },
    {
      id: 10,
      sender: 'Netflix',
      subject: 'New Movie Release',
      body: 'A new movie has been released on Netflix. Check it out!',
      timestamp: new Date('2026-06-10T18:30:00'),
    },
  ];
  //emails: any[] = [];


  @Output() emailSelected = new EventEmitter<any>();
  //@Output() è un decoratore che indica che la proprietà emailSelected è un evento che può essere emesso dal componente. In questo caso, l'evento viene emesso quando un'email viene selezionata.
  //emailSelected è un'istanza di EventEmitter, che è una classe fornita da Angular per gestire eventi personalizzati. In questo caso, l'evento emesso conterrà i dati dell'email selezionata.

  selectEmail(email: any) {
    //console.log('CLICK!', email); // DEBUG
    this.emailSelected.emit(email);
  }

}
