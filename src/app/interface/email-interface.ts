export interface EmailInterface {
  //id: number;
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string | number;
  starred: boolean;
  label: string;

  folder: string;

  selected?: boolean;
  is_deleted: boolean;
}





