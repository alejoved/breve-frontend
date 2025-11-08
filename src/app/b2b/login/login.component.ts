import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MeshGradientComponent } from './mesh-gradient.component';
import { CompanyService } from '../../services/company-service';

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
    private router: Router, private companyService: CompanyService) {}

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
    
    const company = await this.companyService.login(this.email, this.password);

    if (company) {
      this.companyService.setSesion(company);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
      this.loading = false;
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
