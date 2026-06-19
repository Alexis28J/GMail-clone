import { Injectable, signal } from '@angular/core';
import { EmailInterface } from '../interface/email-interface';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
    
   private emailsSignal = signal<EmailInterface[]>([
        {
      id: 1,
      sender: 'Carlo Bonamico',
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Meeting Reminder',
      body: 'Don\'t forget about our meeting tomorrow at 9 AM. Please be on time.',
      timestamp: new Date('2026-06-14T09:00:00'),
      starred: false,       
      label: 'Work'         
    },
    {
      id: 2,
      sender: 'Lione Melania',
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Medical Appointment',
      body: 'Your medical appointment is scheduled for June 19 at 15:50 PM. Please arrive 10 minutes early.',
      timestamp: new Date('2026-06-15T08:50:00'),
      starred: true,  
      label: 'Personal'
    },
    {
      id: 3,
      sender: 'HR Department',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Document Submission',
      body: 'Please submit the required documents by June 10th. Failure to do so may result in delays.',
      timestamp: new Date('2026-06-10T11:15:00'),
      starred: false,
      label: 'Important'
    },
    {
      id: 4,
      sender: 'Github Support',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Account Verification',
      body: 'Please verify your account by clicking the link in the email. This is necessary to access all features.',
      timestamp: new Date('2026-06-04T14:30:00'),
      starred: true,
      label: 'Work'
    },
    {
      id: 5,
      sender: 'Comune di Genova',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Citizen Service Update',
      body: 'You have a new citizen service update from Comune di Genova. Please review it at your earliest convenience.',
      timestamp: new Date('2026-06-05T10:45:00'),
      starred: false,
      label: 'Personal'
    },
    {
      id: 6,
      sender: 'Amazon',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Order Confirmation',
      body: 'Your order has been confirmed and will be shipped soon. Thank you for shopping with us!',
      timestamp: new Date('2026-06-06T16:20:00'),
      starred: true,
      label: 'Important'
    },
    {
      id: 7,
      sender: 'eBay',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Object Sold',
      body: 'Your item has been sold on eBay. Please proceed with the shipping process.',
      timestamp: new Date('2026-06-07T12:00:00'),
      starred: false,
      label: 'Work'
    },
    {
      id: 8,
      sender: 'Prime Video',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'Subscription Renewal',
      body: 'Your subscription has been renewed successfully. Enjoy your streaming experience!',
      timestamp: new Date('2026-06-08T09:00:00'),
      starred: true,
      label: 'Personal'
    },
    {
      id: 9,
      sender: 'Microsoft',
      recipient: 'Jordy Trebejo <jordy.trebejo@dgsspa.com>',
      subject: 'Software Update',
      body: 'A new software update is available for your device. Please install it at your earliest convenience.',
      timestamp: new Date('2026-06-09T14:00:00'),
      starred: false,
      label: 'Important'
    },
    {
      id: 10,
      sender: 'Netflix',
      recipient: 'Jordy Alexis <jordy2806@hotmail.com>',
      subject: 'New Movie Release',
      body: 'A new movie has been released on Netflix. Check it out!',
      timestamp: new Date('2026-06-10T18:30:00'),
      starred: true,
      label: 'Personal'
    },
   ] 
  );

   getEmails() {
    return this.emailsSignal;
   }
}



///////////////////////////////////////////COMMENTI/////////////////////////////////////////////////////


//import { Injectable, signal } from '@angular/core';
//Importiamo il decoratore Injectable da Angular, che ci permette di dichiarare la classe come un servizio iniettabile in altri componenti o servizi.


//@Injectable({ providedIn: 'root'})
//Il decoratore Injectable indica che questa classe può essere iniettata come dipendenza in altri componenti o servizi. 
//L'opzione providedIn: 'root' significa che il servizio sarà disponibile a livello globale nell'applicazione.


//export class EmailService { ... }
//Dichiariamo la classe EmailService, che rappresenta un servizio che gestisce le email. Questa classe conterrà i dati delle email e i metodi per accedervi.
//export indica che questa classe può essere importata e utilizzata in altri file del progetto.
    

// private emailsSignal = signal<EmailInterface[]>([ ... ]);
// Definiamo una proprietà privata emailsSignal che è un segnale reattivo contenente un array di oggetti che seguono l'interfaccia EmailInterface. 
// Questo array rappresenta la lista delle email gestite dal servizio. Ogni oggetto nell'array contiene informazioni come id, sender, recipient, subject, body, timestamp, starred e label.


// getEmails() {
// return this.emailsSignal();
// }
//Definiamo un metodo pubblico getEmails() che restituisce l'array di email. Questo metodo può essere chiamato da altri componenti o servizi per ottenere la lista delle email.
//Il metodo utilizza this.emailsSignal() per accedere ai dati delle email, che sono gestiti come un segnale reattivo.