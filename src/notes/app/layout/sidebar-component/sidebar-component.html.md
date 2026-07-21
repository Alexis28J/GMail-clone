
# COMMENTI

```html
    <nav> 
    @for (item of menuItems; track item.id) {
            <div class="menu-item">
                <div class="menu-left">
                    <mat-icon>{{ item.icon }}</mat-icon>
                    <span>{{ item.name }}</span>
                </div>

                @if (item.count) {
                <span class="count">{{ item.count }}</span>
                }
            </div>
            }
    </nav>
```

- Il `track` nel ciclo `for` serve a Angular per identificare in modo univoco ogni elemento della lista, migliorando le prestazioni durante il rendering. 



## MODIFICA
Ho sostituito il ciclo for e il codice relativo alle voci del menu statiche perché ora utilizziamo il componente FolderListComponent per visualizzare le cartelle dinamicamente.


### NB: Il binding delle proprietà è un meccanismo che consente di passare dati da un componente genitore a un componente figlio. In questo caso, il componente `SidebarComponent` passa l'array di cartelle al componente `FolderListComponent` tramite il binding delle proprietà. 

### NB: Un componente genitore è un componente che contiene altri componenti al suo interno, mentre un componente figlio è un componente che viene utilizzato all'interno di un altro componente. 
### In questo caso, `SidebarComponent` è il componente genitore e `FolderListComponent` è il componente figlio. 


- `[folders]` significa che stiamo passando l'array di cartelle dal componente `SidebarComponent` al componente `FolderListComponent` tramite il binding delle proprietà. 

Questa sintassi consente al componente figlio di ricevere i dati dal componente genitore e aggiornare la visualizzazione in base a tali dati. 
Per questo si usa le parentesi quadre intorno al nome della proprietà. 

- `folders()` significa che stiamo chiamando il metodo `folders()` del componente `SidebarComponent` per ottenere l'array di cartelle da passare al componente FolderListComponent. 

- In sintesi, `[folders] = "folders()"` significa che stiamo passando l'array di cartelle dal componente `SidebarComponent` al componente `FolderListComponent` tramite il binding delle proprietà.
 Che è equivalente a dire che il componente figlio riceve i dati dal componente genitore. 

Nel nostro caso, il componente genitore `SidebarComponent` passa l'array di cartelle al componente figlio `FolderListComponent` tramite il binding delle proprietà. 


- `(folderSelected)` significa che stiamo ascoltando l'evento `folderSelected` emesso dal componente `FolderListComponent`.

Quando l'evento viene emesso, viene chiamato il metodo `onFolderSelected` del componente `SidebarComponent`, passando l'evento come argomento.

### NB: Le parentesi tonde intorno al nome dell'evento indicano che stiamo effettuando il binding dell'evento dal componente figlio al componente genitore. 
### NB: Invece, le parentesi quadre intorno al nome della proprietà indicano il binding dei dati dal componente genitore al componente figlio. 


- `onFolderSelected` significa che stiamo chiamando il metodo `onFolderSelected` del componente `SidebarComponent` quando l'evento `folderSelected` viene emesso dal componente `FolderListComponent`.

Il parametro `$event` contiene i dati dell'evento emesso dal componente figlio.

In sintesi, `(folderSelected)="onFolderSelected($event)"` significa che stiamo ascoltando l'evento `folderSelected` emesso dal componente `FolderListComponent` e, quando viene emesso, chiamiamo il metodo `onFolderSelected` del componente `SidebarComponent`, passando i dati dell'evento come argomento.

Nel nostro caso, il componente genitore `SidebarComponent` riceve l'evento `folderSelected` dal componente figlio `FolderListComponent` e gestisce l'evento tramite il metodo `onFolderSelected`. 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## MODIFICA (GESTIONE LISTA FOLDER SYSTEM E CUSTOM)

```html
    <!------------------------------- SYSTEM FOLDERS ---------------------------------------->
    <div class="sidebar-content">
        <app-folder-list-component [folders]="visibleSystemFolders()"
            (folderSelected)="onFolderSelected($event)"></app-folder-list-component>

        <button class="toggle-btn" (click)="showMoreFolders.set(!showMoreFolders())">
            <mat-icon>
                {{ showMoreFolders() ? 'expand_less' : 'expand_more' }}
            </mat-icon>

            <span>{{ showMoreFolders() ? 'Show less' : 'Show more' }}</span>
        </button>

        @if (showMoreFolders()) {
        <app-folder-list-component [folders]="hiddenSystemFolders()"
            (folderSelected)="onFolderSelected($event)"></app-folder-list-component>
        }

....

        <!------------------------------- CUSTOM FOLDERS ---------------------------------------->
        <div class="custom-folders">

            <span>Custom folders</span>

            <button class="add-folder-btn" (click)="openCreateFolderDialog()">

                <mat-icon>add</mat-icon>

            </button>

        </div>

        <app-folder-list-component [folders]="customFolders()" (folderSelected)="onFolderSelected($event)">
        </app-folder-list-component>

    </div>
```

Ho suddiviso i folder in `system` e `custom`. In questo modo è più chiaro. Nella sezione `system` ci sono le cartelle di default e quelle nascoste affinché non occupino spazio nella sidebar. La sezione dei `custom` contiene le cartelle create dall'utente.

Per farlo utilizzo due metodi: `visibleSystemFolders()` e `hiddenSystemFolders()`.

- `[folders]="visibleSystemFolders()"` significa che vengono mostrate solo le cartelle di sistema visibili.

- `(click)="showMoreFolders.set(!showMoreFolders())"` significa che al click viene invertito il valore di `showMoreFolders`

- `{{ showMoreFolders() ? 'expand_less' : 'expand_more' }}` significa che se `showMoreFolders()` è true mostra `'expand_less'`, altrimenti `'expand_more'`.

`'expand_more'` e `'expand_less'` sono le icone utilizzate per indicare l'espansione o la contrazione della lista.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## SECONDA MODIFICA (GESTIONE LISTA FOLDER SYSTEM E CUSTOM)

```html
    <!------------------------------- SYSTEM FOLDERS ---------------------------------------->
    <div class="sidebar-content">

        <app-folder-list-component [folders]="systemFolderGroup().visible"
            (folderSelected)="onFolderSelected($event)"></app-folder-list-component>

...

...

        <!------------------------------- CUSTOM FOLDERS ---------------------------------------->
        <div class="custom-folders">

            <span>Custom folders</span>

            <button class="add-folder-btn" (click)="openCreateFolderDialog()">
                <mat-icon>add</mat-icon>
            </button>

        </div>

        <app-folder-list-component [folders]="customFolderGroup().visible" (folderSelected)="onFolderSelected($event)">
        </app-folder-list-component>
....

    </div>
```

Ho sostituito la parte di gestione delle cartelle con un approccio basato su `signal` e `computed properties`.

Questo mi permette di avere un codice più leggibile e modulare. Inoltre, facilita l'aggiunta di nuove cartelle senza modificare la logica di visualizzazione.

`(click)="showMoreSystemFolders.set(!showMoreSystemFolders())"`: significa che al click del pulsante viene invertito il valore del signal `showMoreSystemFolders`.
Cioè se era `false (nascosto)` diventa `true (visibile)` e `viceversa`. 
Lo stesso vale per `showMoreCustomFolders`. 