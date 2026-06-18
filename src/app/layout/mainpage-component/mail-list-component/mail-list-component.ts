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
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Meeting Reminder',
      body: 'Don\'t forget about our meeting tomorrow at 9 AM. Please be on time.',
      timestamp: new Date('2026-06-01T09:00:00'),
    },
    {
      id: 2,
      sender: 'Lione Melania',
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Medical Appointment',
      body: 'Your medical appointment is scheduled for June 19 at 15:50 PM. Please arrive 10 minutes early.',
      timestamp: new Date('2026-06-15T08:50:00'),
    },
    {
      id: 3,
      sender: 'HR Department',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Document Submission',
      body: 'Please submit the required documents by June 10th. Failure to do so may result in delays.',
      timestamp: new Date('2026-06-10T11:15:00'),
    },
    {
      id: 4,
      sender: 'Github Support',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Account Verification',
      body: 'Please verify your account by clicking the link in the email. This is necessary to access all features.',
      timestamp: new Date('2026-06-04T14:30:00'),
    },
    {
      id: 5,
      sender: 'Comune di Genova',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Citizen Service Update',
      body: 'You have a new citizen service update from Comune di Genova. Please review it at your earliest convenience.',
      timestamp: new Date('2026-06-05T10:45:00'),
    },
    {
      id: 6,
      sender: 'Amazon',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Order Confirmation',
      body: 'Your order has been confirmed and will be shipped soon. Thank you for shopping with us!',
      timestamp: new Date('2026-06-06T16:20:00'),
    },
    {
      id: 7,
      sender: 'eBay',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Object Sold',
      body: 'Your item has been sold on eBay. Please proceed with the shipping process.',
      timestamp: new Date('2026-06-07T12:00:00'),
    },
    {
      id: 8,
      sender: 'Prime Video',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Subscription Renewal',
      body: 'Your subscription has been renewed successfully. Enjoy your streaming experience!',
      timestamp: new Date('2026-06-08T09:00:00'),
    },
    {
      id: 9,
      sender: 'Microsoft',
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Software Update',
      body: 'A new software update is available for your device. Please install it at your earliest convenience.',
      timestamp: new Date('2026-06-09T14:00:00'),
    },
    {
      id: 10,
      sender: 'Netflix',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'New Movie Release',
      body: 'A new movie has been released on Netflix. Check it out!',
      timestamp: new Date('2026-06-10T18:30:00'),
    },
  ];

  //emails: any[] = []; 


  @Output() emailSelected = new EventEmitter<any>();


  selectEmail(email: any) {
    //console.log('CLICK!', email); // DEBUG
    this.emailSelected.emit(email);
  }


selectedEmails: any[] = [];

toggleSelection(email: any) {
  const index = this.selectedEmails.findIndex(e => e.id === email.id);

  if (index > -1) {
    this.selectedEmails.splice(index, 1);
  } else {
    this.selectedEmails.push(email);
  }

  console.log('Selected:', this.selectedEmails);
}

isSelected(email: any): boolean {
  return this.selectedEmails.some(e => e.id === email.id);
}


}





//////////////////////////////////////////////COMMENTI///////////////////////////////////////////////////

// emails: any[] = [];  
// Questa riga dichiara una proprietà emails come un array vuoto di tipo any. In questo caso, ho commentato la dichiarazione di emails come array vuoto perché ho già inizializzato l'array emails con un set di dati fittizi. Se vuoi utilizzare dati reali, puoi decommentare questa riga e popolare l'array emails con i dati appropriati.
// In questo caso, ho commentato la dichiarazione di emails come array vuoto perché ho già inizializzato l'array emails con un set di dati fittizi. Se vuoi utilizzare dati reali, puoi decommentare questa riga e popolare l'array emails con i dati appropriati.


//@Output() è un decoratore che indica che la proprietà emailSelected è un evento che può essere emesso dal componente. In questo caso, l'evento viene emesso quando un'email viene selezionata.
//emailSelected è un'istanza di EventEmitter, che è una classe fornita da Angular per gestire eventi personalizzati. In questo caso, l'evento emesso conterrà i dati dell'email selezionata.


//selectedEmails: any[] = [];
// Questa riga dichiara una proprietà selectedEmails come un array vuoto di tipo any. 
// Questo array viene utilizzato per tenere traccia delle email attualmente selezionate dall'utente. 
// Quando un'email viene selezionata o deselezionata, viene aggiunta o rimossa da questo array, consentendo al componente di gestire lo stato di selezione delle email.

// toggleSelection(email: any)
// Questa funzione gestisce la selezione e la deselezione delle email.

// const index = this.selectedEmails.findIndex(e => e.id === email.id);
// Questa riga cerca l'indice dell'email selezionata nell'array selectedEmails utilizzando il metodo findIndex.
// Il metodo findIndex restituisce l'indice dell'elemento che soddisfa la condizione specificata (in questo caso, l'email con lo stesso id). 
// Se l'email non viene trovata, findIndex restituisce -1.

// if (index > -1) {this.selectedEmails.splice(index, 1);}
// Se l'email è già selezionata (index > -1), viene rimossa dall'array selectedEmails utilizzando il metodo splice. 
// Il metodo splice rimuove l'elemento all'indice specificato (index) dall'array selectedEmails.

// else {this.selectedEmails.push(email);}
// Altrimenti, se l'email non è selezionata, viene aggiunta all'array selectedEmails utilizzando il metodo push.


// isSelected(email: any): boolean {
// Funzione che verifica se un'email è attualmente selezionata.
// Restituisce true se l'email è presente nell'array selectedEmails, altrimenti restituisce false.

// return this.selectedEmails.some(e => e.id === email.id);
// Questa riga utilizza il metodo some per verificare se esiste un'email nell'array selectedEmails con lo stesso id dell'email passata come argomento. 
// Se viene trovata una corrispondenza, some restituisce true, indicando che l'email è selezionata; altrimenti, restituisce false.
// (e è un parametro che rappresenta ogni elemento dell'array selectedEmails durante l'iterazione.)