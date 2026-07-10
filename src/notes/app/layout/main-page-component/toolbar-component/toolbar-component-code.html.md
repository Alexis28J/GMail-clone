
# CODICE INUTILIZZATO
           
```html
            <mat-menu #moveMenu="matMenu">
                <button mat-menu-item (click)="moveTo('inbox')">
                    Inbox
                </button>
                <button mat-menu-item (click)="moveTo('spam')">
                    Spam
                </button>
                <button mat-menu-item (click)="moveTo('personal')">
                    Personal
                </button>
                <button mat-menu-item (click)="moveTo('work')">
                    Work
                </button>
            </mat-menu>
```

Ho commentato il codice precedente per usare il ciclo dinamico. In questo modo, il menu si aggiorna automaticamente in base alle cartelle disponibili grazie all'input availableFolders.