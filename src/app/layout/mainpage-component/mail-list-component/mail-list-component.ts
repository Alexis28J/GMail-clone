import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { EmailInterface } from '../../../interface/email-interface';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Folder } from '../../../services/folder';
import { MatCheckbox } from "@angular/material/checkbox";
import { EmailService } from '../../../services/email';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-mail-list-component',
  imports: [DatePipe, FormsModule, MatCheckbox],
  templateUrl: './mail-list-component.html',
  styleUrls: ['./mail-list-component.scss'],
})

export class MailListComponent {

  constructor(private folderService: Folder, private sanitizer: DomSanitizer, private emailService: EmailService) {
  }

  @Input() emails: EmailInterface[] = [];


  ///////////////////////////SELEZIONE EMAIL///////////////////////////////////////////////

  @Output() emailSelected = new EventEmitter<EmailInterface>();


  selectEmail(email: EmailInterface) {
    this.emailSelected.emit(email);
  }


  selectedEmails: EmailInterface[] = [];

  toggleSelection(email: EmailInterface) {
    const index = this.selectedEmails.findIndex(e => e.id === email.id);

    if (index > -1) {
      this.selectedEmails.splice(index, 1);
    } else {
      this.selectedEmails.push(email);
    }
  }

  isSelected(email: EmailInterface): boolean {
    return this.selectedEmails.some(e => e.id === email.id);
  }


  ///////////////////////////////////PREFERITI///////////////////////////////////////////////


  // toggleStar(email: EmailInterface) {
  //   email.starred = !email.starred;
  // }

  toggleStar(email: EmailInterface) {
    this.emailService.toggleStar(email);
  }

  getAllEmails(): EmailInterface[] {
    return this.emails;
  }


  //////////////////////////////////EVIDENZIA PAROLE CHIAVE///////////////////////////////////////////////

  highlight(text: string): SafeHtml {

    const search = this.folderService.getSearchTerm()();

    if (!search) return text;

    const keywords = search.split(' ').filter(k => k.length > 0);

    let highlighted = text;

    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(
        regex,
        `<mark>$1</mark>`
      );
    })
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }


  ////////////////////////////////////////////////HANDLER PER LA SELEZIONE DELLE EMAIL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onSelectionChange(email: EmailInterface, event: MatCheckboxChange) {
    this.emailService.toggleEmailSelection(email.id, event.checked);
  }
}




///////////////////////////////////////////COMMENTI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DatePipe è una classe fornita da Angular che consente di formattare le date in base a un formato specifico. In questo caso, viene importata e utilizzata nel componente per formattare la data di invio delle email.

// @Input() è un decoratore che indica che la proprietà emails può ricevere dati da un componente genitore. In questo caso, il componente genitore, che sarebbe MainPageComponent, può passare un array di email al componente MailListComponent tramite la proprietà emails.

// EmailInterface è un'interfaccia che definisce la struttura dei dati delle email. In questo caso, viene importata e utilizzata per tipizzare le proprietà e i parametri del componente, garantendo che le email gestite dal componente abbiano una struttura coerente e prevedibile.


/////////////////////////////////////////////////////SELEZIONE EMAIL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @Output() è un decoratore che indica che la proprietà emailSelected è un evento che può essere emesso dal componente. In questo caso, l'evento viene emesso quando un'email viene selezionata.
// emailSelected è un'istanza di EventEmitter, che è una classe fornita da Angular per gestire eventi personalizzati. In questo caso, l'evento emesso conterrà i dati dell'email selezionata.

// EventEmitter consente al componente di comunicare con altri componenti o servizi, emettendo eventi che possono essere ascoltati e gestiti da altri componenti o servizi che si iscrivono a questi eventi.

// selectEmail(email: EmailInterface) è un metodo che viene chiamato quando un'email viene selezionata. In questo caso, il metodo emette l'evento emailSelected con i dati dell'email selezionata, consentendo ad altri componenti o servizi di reagire a questa selezione.

// selectedEmails è un array che tiene traccia delle email attualmente selezionate. Viene utilizzato per gestire la selezione multipla delle email.

// toggleSelection(email: EmailInterface) è un metodo che viene chiamato quando un'email viene cliccata per essere selezionata o deselezionata. Il metodo verifica se l'email è già presente nell'array selectedEmails e, in base a questo, la aggiunge o la rimuove dall'array.

// isSelected(email: EmailInterface): boolean è un metodo che verifica se un'email specifica è attualmente selezionata, restituendo true se l'email è presente nell'array selectedEmails e false altrimenti.


/////////////////////////////////////////////////////PREFERITI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// toggleStar(email: EmailInterface) è un metodo che viene chiamato quando l'utente clicca sull'icona a forma di stella per contrassegnare o rimuovere un'email come preferita. Il metodo inverte il valore della proprietà starred dell'email, consentendo all'utente di gestire facilmente le email preferite.
// NB: Questo metodo è stato commentato nel codice, quindi non è attualmente in uso. Tuttavia, se fosse attivo, permetterebbe di gestire la selezione delle email preferite direttamente dal componente MailListComponent. 
// Tuttavia, il valore della proprietà starred dell'email dovrebbe essere gestito anche a livello di servizio o backend per garantire la persistenza dello stato delle email preferite.
// Con questo metodo, il valore non si aggiorna automaticamente nel servizio o nel backend, quindi se l'utente ricarica la pagina o naviga in un'altra sezione dell'applicazione, lo stato delle email preferite potrebbe non essere mantenuto correttamente.


// getAllEmails(): EmailInterface[] è un metodo che restituisce l'intero array di email gestito dal componente. Questo metodo può essere utilizzato da altri componenti o servizi per accedere alla lista completa delle email, ad esempio per visualizzarle o per eseguire operazioni su di esse.


///////////////////////////////////////////////////////////////////////////EVIDENZIA PAROLE CHIAVE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Per prima cosa ho creato il constructor con i servizi folderService e sanitizer. Il servizio folderService viene utilizzato per ottenere il termine di ricerca corrente, 
// mentre il servizio sanitizer viene utilizzato per sanificare l'HTML generato per evidenziare le parole chiave nella visualizzazione delle email.

// NB: Sanificare l'HTML è importante per prevenire attacchi di tipo Cross-Site Scripting (XSS) e garantire che il contenuto visualizzato sia sicuro per l'utente.

// Poi ho creato il metodo highlight(text: string): SafeHtml che prende in input una stringa di testo (ad esempio il corpo o l'oggetto di un'email) e restituisce una versione sanificata del testo con le parole chiave evidenziate.
// All'interno del metodo, viene ottenuto il termine di ricerca corrente tramite il servizio folderService. Se non c'è alcun termine di ricerca, il metodo restituisce semplicemente il testo originale senza modifiche.
// Se invece c'è un termine di ricerca, il metodo divide il termine in parole chiave separate e filtra quelle che hanno una lunghezza maggiore di zero.

// Successivamente, viene creato un ciclo che itera su ciascuna parola chiave e utilizza una espressione regolare per cercare e sostituire tutte le occorrenze della parola chiave nel testo originale con una versione evidenziata (racchiusa in un tag <mark>).
// .forEach(keyword => {..} è un metodo che itera su ciascuna parola chiave e applica la sostituzione nel testo originale. L'espressione regolare viene creata dinamicamente per ogni parola chiave, con l'opzione 'gi' per rendere la ricerca globale e insensibile al maiuscolo/minuscolo.

// Infine, il metodo restituisce il testo modificato, sanificato tramite il servizio sanitizer per garantire la sicurezza del contenuto visualizzato.

//`<mark>$1</mark>`. Il tag <mark> vengono utilizzati per evidenziare le parole chiave nel testo visualizzato, rendendole visivamente distinte dal resto del contenuto.
// E `$1` rappresenta il testo corrispondente alla parola chiave trovata dall'espressione regolare. In questo modo, la parola chiave viene racchiusa nel tag <mark> senza alterare il contenuto originale del testo.



///////////////////////////////////////////////////////////////////////////////SELEZIONE EMAIL GLOBALE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ho aggiunto un effetto (effect) nel constructor che viene eseguito ogni volta che cambia lo stato di selezione globale delle email nel servizio folderService. 
// L'effetto osserva il valore restituito da this.folderService.getSelectAll()() e aggiorna lo stato di selezione di tutte le email nell'array emails in base a questo valore.
// In pratica, quando l'utente seleziona o deseleziona la checkbox "Seleziona tutto" nella toolbar, l'effetto aggiorna automaticamente lo stato di selezione di tutte le email visualizzate nella lista delle email.
//L'effetto viene eseguito automaticamente ogni volta che cambia il valore di selezione globale, garantendo che la lista delle email sia sempre sincronizzata con lo stato di selezione globale gestito dal servizio folderService.

// NB: La doppia parentesi tonde ()() viene utilizzata per ottenere il valore corrente del segnale restituito da getSelectAll(). La prima coppia di parentesi () chiama il metodo getSelectAll(), 
// mentre la seconda coppia di parentesi () invoca il segnale stesso, restituendo il valore booleano che indica se tutte le email sono selezionate o meno.
// NB: L'uso di effect consente di reagire ai cambiamenti di stato in modo reattivo, senza dover gestire manualmente gli eventi o le callback. 
// In questo caso, l'effetto garantisce che la lista delle email sia sempre aggiornata in base allo stato di selezione globale, migliorando l'esperienza dell'utente e semplificando la gestione dello stato nel componente.


////////////////////////////////////////////////////////////////////////////////HANDLER PER LA SELEZIONE DELLE EMAIL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Un handler è una funzione che gestisce un evento specifico, in questo caso l'evento di selezione o deselezione di un'email tramite la checkbox associata a ciascuna email nella lista.

// L'handler onSelectionChange(email: EmailInterface, event: Event) viene chiamato ogni volta che l'utente seleziona o deseleziona un'email tramite la checkbox. 
// L'evento viene passato come parametro all'handler, consentendo di accedere alle informazioni sull'evento stesso.

// All'interno dell'handler, viene chiamato il metodo toggleEmailSelection(email.id, event.checked) del servizio emailService.
// Questo metodo aggiorna lo stato di selezione dell'email specifica in base al valore della checkbox (event.checked), che indica se l'email è stata selezionata o deselezionata.
// In questo modo, l'handler gestisce la logica di selezione delle email e mantiene sincronizzato lo stato di selezione tra la lista delle email e il servizio emailService.
