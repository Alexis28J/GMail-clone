
# COMMENTI

La classe MailViewerComponent è un componente Angular che visualizza i dettagli di un'email. 
Utilizza l'interfaccia EmailInterface per definire la struttura dell'oggetto email. 

Il componente accetta un input email di tipo EmailInterface o null e fornisce due output, reply e forward, 
che emettono eventi quando l'utente decide di rispondere o inoltrare l'email. I metodi onReply e onForward verificano se l'email è presente prima di emettere gli eventi corrispondenti.

### NB: EventEmitter è una classe di Angular che consente di emettere eventi personalizzati da un componente figlio a un componente genitore. 

### NB: Sia reply che forward sono istanze di EventEmitter, cioè oggetti che consentono di emettere eventi personalizzati. In questo caso, viene utilizzata per notificare il componente genitore quando l'utente decide di rispondere o inoltrare l'email.

### Quando l'utente clicca sui pulsanti "Reply" o "Forward", i metodi onReply() e onForward() vengono chiamati, rispettivamente. Questi metodi verificano se l'email è presente (non null) e, in tal caso, emettono l'evento corrispondente con l'email come payload. Questo permette al componente genitore di ascoltare questi eventi e gestire le azioni di risposta o inoltro dell'email.
