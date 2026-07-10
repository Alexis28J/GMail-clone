export interface FolderInterface {
    // id: string;
    id: FolderId;
    name: string;
    icon: string;
    count?: number;  
}


export type FolderId =
    | 'inbox'
    | 'starred'
    | 'snoozed'
    | 'sent'
    | 'drafts'
    | 'spam'
    | 'important'
    | 'personal'
    | 'archived'
    | 'work'
    | 'trash'



