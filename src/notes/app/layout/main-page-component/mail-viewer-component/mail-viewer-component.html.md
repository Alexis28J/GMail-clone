```html
@if(emailService.loading()){
<div class="loading-container">
  <mat-spinner diameter="50"></mat-spinner>
  <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  <p>Loading emails...</p>
</div>
}
```
Se il servizio email sta caricando, allora si mostra lo spinner e la barra di caricamento.
Lo spinner ha una dimensione di 50px e la barra di caricamento è indeterminata il che significa che non mostra il progresso effettivo.
Ho messo anche il messaggio di "Loading emails...".

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```html
@else {

@if(email){

<div class="email-viewer">

  <div class="emailViewer-header">
    <div>
      <h2>{{email.subject}}</h2>
      <p>Date: {{email.timestamp | date:"MMM dd, yyyy 'at' hh:mm a"}}</p>
      <p class="emailViewer-fromTo">From: {{email.sender}}</p>
      <p class="emailViewer-fromTo">To: {{email.recipient}}</p>
    </div>
  </div>

  <div class="emailViewer-body">
    <p>{{email.body}}</p>
  </div>

</div>

<div class="emailViewer-actions">
  <button (click)="onReply()">↩ Reply</button>
  <button (click)="onForward()">➡ Forward</button>
</div>

} ... }
```