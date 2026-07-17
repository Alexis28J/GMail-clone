import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
})


export class LoginComponent {

  email = '';
  password = '';
  error = signal<string | null>(null)
  success = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) { };

  ///// GESTIONE DEL MESSAGGIO DI SUCCESSO DOPO LA REGISTRAZIONE
  ngOnInit() {

    const message = window.history.state?.successMessage;

    if (message) {
      this.success.set(message);
    }

  }


  ///// GESTIONE DEL LOGIN 
  onLogin() {

    const result = this.authService.login(this.email, this.password);

    if (!result.success) {
      this.error.set(result.message!);
      return;
    }
    this.router.navigate(['/app']);

  }


  ///// NAVIGAZIONE ALLA PAGINA DI REGISTRAZIONE
  goToRegister() {
    this.router.navigate(['/register']);
  }


  ///// GESTIONE DELLA VISIBILITÀ DELLA PASSWORD
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
