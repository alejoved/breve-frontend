import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CustomerService } from '../../services/customer-service';
import Swal from 'sweetalert2';
import { business_name } from '../../../constants';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  template: `
    <div class="page-container">
      <app-header [businessName]="businessName" [showBack]="false"></app-header>

      <div class="content">
        <div class="step-header">
          <h1 class="title">Datos de Contacto</h1>
          <span class="step-counter">1/6</span>
        </div>

        <app-progress-bar [currentStep]="1" [totalSteps]="6"></app-progress-bar>

        <p class="description">
          Necesitamos tus datos para contactarte en caso de cualquier inconveniente
        </p>

        <form class="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="label">Nombre*</label>
            <input
              type="text"
              class="input"
              [class.input-error]="errors.firstName"
              placeholder="Ingresa tu nombre"
              [(ngModel)]="formData.firstName"
              name="firstName"
              (blur)="validateFirstName()"
              (input)="onFirstNameInput()"
              required
            />
            <span class="error-message" *ngIf="errors.firstName">{{ errors.firstName }}</span>
          </div>

          <div class="form-group">
            <label class="label">Apellido*</label>
            <input
              type="text"
              class="input"
              [class.input-error]="errors.lastName"
              placeholder="Ingresa tu apellido"
              [(ngModel)]="formData.lastName"
              name="lastName"
              (blur)="validateLastName()"
              (input)="onLastNameInput()"
              required
            />
            <span class="error-message" *ngIf="errors.lastName">{{ errors.lastName }}</span>
          </div>

          <div class="form-group">
            <label class="label">Celular*</label>
            <input
              type="text"
              class="input"
              [class.input-error]="errors.phone"
              placeholder="Ingresa tu celular"
              [(ngModel)]="formData.phone"
              name="celular"
              (blur)="validatePhone()"
              (input)="onPhoneInput()"
              required
            />
            <span class="error-message" *ngIf="errors.phone">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label class="label">Correo electrónico*</label>
            <input
              type="email"
              class="input"
              [class.input-error]="errors.email"
              placeholder="ejemplo@correo.com"
              [(ngModel)]="formData.email"
              name="email"
              (blur)="validateEmail()"
              (input)="onEmailInput()"
              required
            />
            <span class="error-message" *ngIf="errors.email">{{ errors.email }}</span>
          </div>

          <button type="submit" class="btn-continue" [disabled]="!isFormValid()">
            Continuar
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: #fafafa;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      background: white;
      padding: 32px 24px;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .title {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .step-counter {
      font-size: 18px;
      font-weight: 600;
      color: #6b7280;
    }

    .description {
      font-size: 16px;
      color: #6b7280;
      margin: 24px 0 32px;
      line-height: 1.5;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .label {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    .input {
      padding: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      color: #1f2937;
      transition: all 0.2s;
      font-family: inherit;
    }

    .input::placeholder {
      color: #9ca3af;
    }

    .input:focus {
      outline: none;
      border-color: #667eea;
    }

    .input-error {
      border-color: #ef4444;
    }

    .input-error:focus {
      border-color: #dc2626;
    }

    .error-message {
      font-size: 14px;
      color: #ef4444;
      margin-top: 4px;
    }

    .btn-continue {
      margin-top: 40px;
      padding: 18px;
      background: linear-gradient(90deg, #FF8BAA 0%, #6B4EE6 100%);
      color: white;
      border: none;
      border-radius: 40px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-family: inherit;
    }

    .btn-continue:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .btn-continue:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .content {
        padding: 24px 20px;
      }

      .title {
        font-size: 24px;
      }

      .step-counter {
        font-size: 16px;
      }

      .description {
        font-size: 14px;
        margin: 16px 0 24px;
      }

      .form {
        gap: 20px;
      }

      .input {
        padding: 14px;
      }

      .btn-continue {
        margin-top: 32px;
        padding: 16px;
        font-size: 16px;
      }
    }
  `]
})
export class ContactComponent {
  private router = inject(Router);
  private customerService = inject(CustomerService);

  businessName = business_name
  businessId = "c72eedf1-ffbd-4e53-9ecf-f068e4398b0a";

  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };

  errors = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };

  validateFirstName() {
    if (!this.formData.firstName.trim()) {
      this.errors.firstName = 'Completa tu nombre';
      return false;
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(this.formData.firstName)) {
      this.errors.firstName = 'El nombre no puede contener números ni caracteres especiales';
      return false;
    }
    this.errors.firstName = '';
    return true;
  }

  validateLastName() {
    if (!this.formData.lastName.trim()) {
      this.errors.lastName = 'Completa tu apellido';
      return false;
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(this.formData.lastName)) {
      this.errors.lastName = 'El apellido no puede contener números ni caracteres especiales';
      return false;
    }
    this.errors.lastName = '';
    return true;
  }

  validatePhone() {
    if (!this.formData.phone.trim()) {
      this.errors.phone = 'Completa el numero de celular';
      return false;
    }
    if (!/^\d{10}$/.test(this.formData.phone)) {
      this.errors.phone = 'El número de celular debe tener 10 dígitos';
      return false;
    }
    this.errors.phone = '';
    return true;
  }

  validateEmail() {
    if (!this.formData.email.trim()) {
      this.errors.email = 'Completa tu correo electrónico';
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Este no es un formato de correo electrónico válido';
      return false;
    }
    this.errors.email = '';
    return true;
  }

  onFirstNameInput() {
    if (this.errors.firstName) {
      this.validateFirstName();
    }
  }

  onLastNameInput() {
    if (this.errors.lastName) {
      this.validateLastName();
    }
  }
  onPhoneInput() {
    if (this.errors.phone) {
      this.validatePhone();
    }
  }

  onEmailInput() {
    if (this.errors.email) {
      this.validateEmail();
    }
  }

  isFormValid(): boolean {
    return this.formData.firstName.trim() !== '' &&
           this.formData.lastName.trim() !== '' &&
           this.formData.phone.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.errors.firstName === '' &&
           this.errors.lastName === '' &&
           this.errors.phone === '' &&
           this.errors.email === '';
  }

  async onSubmit() {
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateEmail();

    if (this.isFormValid()) {
      try {
        console.log(this.formData);
        const customer = await this.customerService.create(this.formData);
        if(customer){
          this.router.navigate(['/plans'], { state: { business: { id: this.businessId }, customer: {id: customer.id } }});
        }
      } catch (ex: any) {
        if(ex.error.error == "Customer found"){
          Swal.fire({ icon: "error", title: "Cliente existente", text: "Por favor, inicia sesion." });
        } else {
          Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
        }
      }
    }
  }
}
