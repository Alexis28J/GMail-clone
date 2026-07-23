import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SignatureService {

    ///// SIGNAL CHE CONTIENE IL TESTO DELLA FIRMA E LO STATO DI ABILITAZIONE
    signature = signal('');
    enabled = signal(false);


    ///// COSTRUTTORE CHE CARICA LA FIRMA DAL LOCAL STORAGE
    constructor() {
        this.loadSignature();
    }


    ///// METODO PRIVATO CHE CARICA LA FIRMA DAL LOCAL STORAGE
    private loadSignature() {
        const savedSignature = localStorage.getItem('emailSignature');  
        const enabled = localStorage.getItem('emailSignatureEnabled');  

        if (savedSignature) {  
            this.signature.set(savedSignature); 
        }
        this.enabled.set(enabled === 'true'); 
    }


    ///// METODO PUBBLICO CHE SALVA LA FIRMA NEL LOCAL STORAGE
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


    ///// METODO PUBBLICO CHE ELIMINA LA FIRMA DAL LOCAL STORAGE
    deleteSignature() {
        localStorage.removeItem('emailSignature');   
        localStorage.removeItem('emailSignatureEnabled'); 

        this.signature.set('');  
        this.enabled.set(false); 
    }


    ///// METODO PUBBLICO CHE RESTITUISCE IL TESTO DELLA FIRMA SE ABILITATA, ALTRIMENTI UNA STRINGA VUOTA
    getSignatureText(): string {
        if (!this.enabled()) {  
            return '';
        }
        return this.signature();
    }

}

