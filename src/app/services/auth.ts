import { computed, effect, Injectable, signal } from "@angular/core";
import { AuthInterface } from "../../app/interface/auth-interface";


@Injectable({
    providedIn: 'root'
})


export class AuthService {

    private currentUserSignal = signal<AuthInterface | null>(
        JSON.parse(localStorage.getItem('currentUser') || 'null')
    );


    storedUsers = JSON.parse(localStorage.getItem('users') || '[]');


    private usersSignal = signal<AuthInterface[]>(
        Array.isArray(this.storedUsers) ? this.storedUsers : []  // 
    );


    isLoggedIn = computed(() => this.currentUserSignal() !== null);


    constructor() {
        effect(() => {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUserSignal()));
            localStorage.setItem('users', JSON.stringify(this.usersSignal()));
        })
    }


    ///// FUNZIONE PER REGISTRARE UN NUOVO UTENTE

    register(username: string, email: string, password: string): { success: boolean; message?: string } {

        const users = this.usersSignal();

        const newUser: AuthInterface = {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password
        };


        if (users.find(u => u.username === newUser.username)) {
            return { success: false, message: 'Username already taken' };
        }

        if (!email.includes('@')) {
            return { success: false, message: 'Invalid email' };
        }

        if (!email.endsWith('.com') && !email.endsWith('.it')) {
            return { success: false, message: 'Email must end with .com or .it' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long!' };
        }

        if (users.find(u => u.email === newUser.email)) {
            return { success: false, message: 'User already exits' }
        }

        this.usersSignal.update(u => [...u, newUser]);

        return { success: true };

    }


    ///// FUNZIONE PER EFFETTUARE IL LOGIN

    login(email: string, password: string): { success: boolean, message?: string } {

        console.log('USERS:', this.usersSignal());
        const user = this.usersSignal().find(
            u => u.email === email.trim().toLowerCase() && u.password === password
        );

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        this.currentUserSignal.set(user);

        return { success: true };

    }


    ///// FUNZIONE PER EFFETTUARE IL LOGOUT

    logout() {
        this.currentUserSignal.set(null);
    }


    getCurrentUser() {
        return this.currentUserSignal;
    }

}




