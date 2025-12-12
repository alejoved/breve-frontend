import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MeshGradientComponent } from './mesh-gradient.component';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';
import { AuthB2BService } from '../../auth/auth-b2b-service';

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

  constructor(private router: Router, private authB2B: AuthB2BService) {
    if (this.authB2B.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    // Cargar email guardado si existe
    const rememberedEmail = localStorage.getItem('remember_email');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

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
      const response = await this.authB2B.login(this.email, this.password);
      
      if (response && response.token) {
        // Si "Recordarme" está activado, guardar también en localStorage
        if (this.rememberMe) {
          localStorage.setItem('remember_email', this.email);
        } else {
          localStorage.removeItem('remember_email');
        }

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          timer: 1500,
          showConfirmButton: false
        });

        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      this.loading = false;
      Swal.fire({ icon: 'error', title: 'Error', text: error.message });
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
