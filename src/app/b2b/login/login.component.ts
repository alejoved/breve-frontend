import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MeshGradientComponent } from './mesh-gradient.component';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MeshGradientComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  loading = false;
  errorMessage = '';
  emailError = '';
  passwordError = '';
  emailTouched = false;
  passwordTouched = false;

  constructor(
    private router: Router, private businessService: BusinessService) {}

  async onSubmit() {
    this.emailTouched = true;
    this.passwordTouched = true;
    this.validateEmail();
    this.validatePassword();

    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    try {
      const business = await this.businessService.login(this.email, this.password);
      if (business) {
        this.businessService.setSession(business);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos';
        this.loading = false;
      }
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return this.email.trim() !== '' &&
           this.password.trim() !== '' &&
           !this.emailError &&
           !this.passwordError;
  }

  validateEmail() {
    if (this.emailTouched) {
      if (!this.email.trim()) {
        this.emailError = 'El correo es requerido';
      } else if (!this.isValidEmail(this.email)) {
        this.emailError = 'Ingresa un correo válido';
      } else {
        this.emailError = '';
      }
    }
  }

  validatePassword() {
    if (this.passwordTouched) {
      if (!this.password.trim()) {
        this.passwordError = 'La contraseña es requerida';
      } else if (this.password.length < 6) {
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      } else {
        this.passwordError = '';
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onEmailBlur() {
    this.emailTouched = true;
    this.validateEmail();
  }

  onPasswordBlur() {
    this.passwordTouched = true;
    this.validatePassword();
  }
}
