export interface EmailInterface {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: Date;
  starred: boolean;
  label: string;

  folder: string; 

  selected?: boolean;
  is_deleted: boolean;
}



/////////////////////////////COMMENTI//////////////////////////////////////

// Un'interfaccia in TypeScript è una struttura che definisce la forma di un oggetto. 
// In questo caso, l'interfaccia "EmailInterface" definisce le proprietà che un oggetto email deve avere, come id, sender, recipient, subject, body, timestamp, starred, label, folder e selected.

// folder indica la cartella in cui si trova l'email (ad esempio, "inbox", "sent", "drafts", ecc.).
// selected è una proprietà opzionale che indica se l'email è selezionata o meno (ad esempio, per operazioni di massa come eliminare o spostare più email contemporaneamente).
// is_deleted è una proprietà che indica se l'email è stata eliminata o meno. Questo può essere utile per implementare una funzionalità di "cestino" o "trash" dove le email eliminate vengono spostate invece di essere cancellate definitivamente.