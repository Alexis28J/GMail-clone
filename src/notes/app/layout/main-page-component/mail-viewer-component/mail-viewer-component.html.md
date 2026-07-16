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



