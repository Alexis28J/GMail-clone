
# COMMENTI

- Un file `constants` è un file TypeScript che contiene costanti utilizzate in un'applicazione. Queste costanti possono essere valori fissi, come stringhe o numeri, che vengono utilizzati in diverse parti del codice per evitare la duplicazione e facilitare la manutenzione. 

In questo caso, il file `folders.constants.ts` contiene una costante chiamata `MOVABLE_FOLDERS`, che rappresenta un array di stringhe che indicano le cartelle che possono essere spostate o modificate dall'utente.


- La parola chiave `as const` significa che l'array `MOVABLE_FOLDERS` è trattato come un tipo letterale di `tuple`, il che vuol dire che i valori all'interno dell'array sono considerati costanti e non possono essere modificati. 

In altre parole, TypeScript inferirà (deducerà) il tipo dell'array come una tupla di stringhe specifiche ('inbox', 'work', 'personal', 'spam', 'archived', 'snoozed') invece di un array generico di stringhe. 

Questo permette di avere un controllo più rigoroso sui valori che possono essere utilizzati in altre parti del codice, migliorando la sicurezza del tipo e riducendo gli errori.


- `export type MovableFolder = typeof MOVABLE_FOLDERS[number];` 
Questa riga dice che `MovableFolder` è un tipo che può essere uno dei valori presenti nell'array `MOVABLE_FOLDERS`. In altre parole, `MovableFolder` può essere 'inbox', 'work', 'personal', 'spam', 'archived' o 'snoozed'.

La differenza tra `type` e `typeof` è che `type` è un costrutto di TypeScript che permette di definire un nuovo tipo, mentre `typeof` è un operatore che restituisce il tipo di una variabile o di un'espressione.