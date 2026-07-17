import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.scss'],
})


export class RegisterComponent {

  email = '';
  password = '';
  username = '';
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { };

  ///// GESTIONE DELLA VISIBILITÀ DELLA PASSWORD
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  ///// GESTIONE DELLA NAVIGAZIONE ALLA PAGINA DI LOGIN
  goToLogin() {
    this.router.navigate(['/login']);
  }


  ///// VALIDAZIONE DELLA PASSWORD CON REGEX (sequenza di caratteri che definisce un pattern)
  isPasswordValid(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);  //con carattere speciale
    //return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);  // senza carattere speciale
  }


  ///// FUNZIONI DI CONTROLLO DELLA PASSWORD
  hasLowercase() {
    return /[a-z]/.test(this.password);
  }

  hasUppercase() {
    return /[A-Z]/.test(this.password);
  }

  hasNumber() {
    return /\d/.test(this.password);
  }

  hasSpecial() {
    return /[@$!%*?&]/.test(this.password);
  }


  ///// GESTIONE DELLA FORZA DELLA PASSWORD
  getPasswordStrength(): string {

    let score = 2;

    if (this.hasLowercase()) score++;
    if (this.hasUppercase()) score++;
    if (this.hasNumber()) score++;
    if (this.hasSpecial()) score++;
    if (this.password.length >= 8) score++;

    if (score < 4) return 'Weak';
    if (score < 6) return 'Medium';
    return 'Strong';
  }

  getPasswordStrengthColor(): string {

    if (this.getPasswordStrength() === 'Weak') return 'red';
    if (this.getPasswordStrength() === 'Medium') return 'orange';
    return 'green';
  }


  ///// GESTIONE DELLA CONFERMA DELLA PASSWORD
  confirmPassword = '';


  ///// GESTIONE DELLA REGISTRAZIONE
  onRegister() {

    this.error.set(null);
    this.success.set(null);


    ///// GESTIONE DELLA VALIDAZIONE DELL'USERNAME
    if (!this.username || this.username.trim().length < 3) {
      this.error.set('Username must be at least 3 characters long');
      return;
    }


    ///// GESTIONE DELLA VALIDAZIONE DELLA PASSWORD
    if (!this.isPasswordValid(this.password)) {
      //this.error.set('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      this.error.set('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Please verify that the password and confirm password fields are the same.');
      return;
    }

    const result = this.authService.register(this.username, this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }

    if (result.success) {
      this.success.set('Registration successful! You can now log in.');
    }

    this.router.navigate(['/login'], {
      state: { successMessage: 'Registration successful! You can now log in.' }
    });
  }


}




