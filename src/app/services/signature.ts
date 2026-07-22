import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SignatureService {

    signature = signal('');
    enabled = signal(false);

    constructor() {
        this.loadSignature();
    }


    private loadSignature() {
        const savedSignature = localStorage.getItem('emailSignature');
        const enabled = localStorage.getItem('emailSignatureEnabled');

        if (savedSignature) {
            this.signature.set(savedSignature);
        }
        this.enabled.set(enabled === 'true')
    }

    saveSignature(
        signature: string,
        enabled: boolean
    ) {
        localStorage.setItem(
            'emailSignature',
            signature
        );

        localStorage.setItem(
            'emailSignatureEnabled',
            String(enabled)
        );

        this.signature.set(signature);
        this.enabled.set(enabled);
    }


    deleteSignature() {
        localStorage.removeItem('emailSignature');
        localStorage.removeItem('emailSignatureEnabled');

        this.signature.set('');
        this.enabled.set(false);
    }


    getSignatureText(): string {
        if (!this.enabled()) {
            return '';
        }

        return this.signature();
    }

}


// Per il mio progetto, ho deciso di utilizzare il servizio SignatureService per gestire la firma dell'email. 
// Questo servizio utilizza il localStorage per salvare e recuperare la firma e lo stato di abilitazione della firma. Ho implementato metodi per caricare, salvare e cancellare la firma, 
// garantendo che i dati siano persistenti tra le sessioni dell'applicazione.
// Purtroppo, se cambio browser o cancello la cache, i dati salvati nel localStorage andranno persi. 
// Mockapi non mi permette di creare più di 2 resource, quindi il perché che sto usando il localStorage per salvare la firma. 
// Tuttavia, se in futuro dovessi avere bisogno di una soluzione più robusta e persistente, potrei considerare l'implementazione di un backend o l'utilizzo di un database locale come IndexedDB per gestire le firme in modo più sicuro e affidabile.