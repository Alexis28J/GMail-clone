export interface FolderInterface {
    id: string;
    name: string;
    icon: string;
    count?: number;  
}


//? perché non tutti i folder hanno un count, ad esempio "Sent" o "Drafts" potrebbero non avere un count associato.

