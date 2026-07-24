import { Injectable, signal } from '@angular/core';
import { SignatureInterface } from '../interface/signature-interface';

@Injectable({
    providedIn: 'root'
})

export class SignatureService {

    ///// VARIABILI CHE CONTENGONO LO STATO DELLE FIRME
    signatures = signal<SignatureInterface[]>([]);
    activeSignatureId = signal<string | null>(null);
    enabled = signal(false);


    ///// COSTRUTTORE CHE INIZIALIZZA LO STATO DELLE FIRME
    constructor() {
        this.load();
    }


    ///// METODO CHE CARICA LO STATO DELLE FIRME DAL LOCAL STORAGE
    private load() {

        const signatures = localStorage.getItem('emailSignatures');
        const activeId = localStorage.getItem('activeSignatureId');
        const enabled = localStorage.getItem('emailSignatureEnabled');


        if (signatures) {
            this.signatures.set(
                JSON.parse(signatures)
            );
        }

        if (activeId) {
            this.activeSignatureId.set(activeId);
        }

        this.enabled.set(
            enabled === 'true'
        );
    }


    ///// METODO CHE SALVA LO STATO DELLE FIRME NEL LOCAL STORAGE
    private persist() {

        localStorage.setItem(
            'emailSignatures',
            JSON.stringify(this.signatures())
        );

        localStorage.setItem(
            'activeSignatureId',
            this.activeSignatureId() ?? ''
        );

        localStorage.setItem(
            'emailSignatureEnabled',
            String(this.enabled())
        );
    }


    ///// METODO CHE AGGIUNGE UNA NUOVA FIRMA
    addSignature(
        name: string,
        content: string
    ) {
        const signature: SignatureInterface = {
            id: crypto.randomUUID(),
            name,
            content
        }

        this.signatures.update(
            signatures => [...signatures, signature]
        );

        if (!this.activeSignatureId()) {
            this.activeSignatureId.set(signature.id);
        }

        this.persist();
    }


    ///// METODO CHE AGGIORNA UNA FIRMA ESISTENTE
    updateSignature(signature: SignatureInterface) {
        this.signatures.update(
            signatures =>
                signatures.map(s =>
                    s.id === signature.id
                        ? signature
                        : s)
        );

        this.persist();
    }


    ///// METODO CHE ELIMINA UNA FIRMA ESISTENTE
    deleteSignature(id: string) {
        this.signatures.update(
            signatures =>
                signatures.filter(
                    s => s.id !== id
                )
        );

        if (this.activeSignatureId() === id) {
            const first = this.signatures()[0];

            this.activeSignatureId.set(
                first?.id ?? null
            );
        }

        this.persist();
    }


    ///// METODO CHE IMPOSTA LA FIRMA DI DEFAULT
    setActiveSignature(id: string) {
        this.activeSignatureId.set(id);
        this.persist();
    }


    ///// METODO CHE ATTIVA/DISATTIVA LA FIRMA
    setEnabled(enabled: boolean) {
        this.enabled.set(enabled);
        this.persist();
    }


    ///// METODO CHE RESTITUISCE IL TESTO DELLA FIRMA ATTIVA
    getSignatureText(): string {
        if (!this.enabled()) {
            return '';
        }

        const active = this.signatures().find(
            s => s.id === this.activeSignatureId()
        );

        return active?.content ?? '';
    }


}
