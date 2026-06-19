export interface EmailInterface {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: Date;
  starred: boolean;
  label: string;
}



/////////////////////////////COMMENTI//////////////////////////////////////

// Un'interfaccia in TypeScript è una struttura che definisce la forma di un oggetto. 
// In questo caso, l'interfaccia "EmailInterface" definisce le proprietà che un oggetto email deve avere, come id, sender, recipient, subject, body, timestamp, starred e label.