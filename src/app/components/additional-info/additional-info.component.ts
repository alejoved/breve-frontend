import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SubscriptionService } from '../../services/subscription.service';
import { CustomerService } from '../../services/customer-service';
import Swal from 'sweetalert2';
import { error } from '../../../constants';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  template: `
    <div class="page-container">
      <app-header [businessName]="businessName"></app-header>

      <div class="content">
        <div class="step-header">
          <h1 class="title">Información Adicional</h1>
          <span class="step-counter">3/6</span>
        </div>

        <app-progress-bar [currentStep]="3" [totalSteps]="6"></app-progress-bar>

        <p class="description">
          Completa tu perfil para personalizar tu experiencia
        </p>

        <form class="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="label">Género*</label>
            <select
              class="select"
              [class.input-error]="errors.gender"
              [(ngModel)]="formData.gender"
              name="gender"
              (blur)="validateGender()"
              (change)="onGenderChange()"
              required
            >
              <option value="" disabled>Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </select>
            <span class="error-message" *ngIf="errors.gender">{{ errors.gender }}</span>
          </div>

          <div class="form-group">
            <label class="label">Tipo de documento*</label>
            <select
              class="select"
              [class.input-error]="errors.documentType"
              [(ngModel)]="formData.documentType"
              name="documentType"
              (blur)="validateDocumentType()"
              (change)="onDocumentTypeChange()"
              required
            >
              <option value="" disabled>Selecciona tipo de documento</option>
              <option value="cc">Cédula de ciudadanía</option>
              <option value="ce">Cédula de extranjería</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="ti">Tarjeta de identidad</option>
            </select>
            <span class="error-message" *ngIf="errors.documentType">{{ errors.documentType }}</span>
          </div>

          <div class="form-group">
            <label class="label">Número de documento*</label>
            <input
              type="text"
              class="input"
              [class.input-error]="errors.documentNumber"
              placeholder="Ingresa tu número de documento"
              [(ngModel)]="formData.documentNumber"
              name="documentNumber"
              (blur)="validateDocumentNumber()"
              (input)="onDocumentNumberInput()"
              required
            />
            <span class="error-message" *ngIf="errors.documentNumber">{{ errors.documentNumber }}</span>
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

    .input, .select {
      padding: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      color: #1f2937;
      transition: all 0.2s;
      font-family: inherit;
      background: white;
    }

    .input::placeholder, .select option[value=""] {
      color: #9ca3af;
    }

    .input:focus, .select:focus {
      outline: none;
      border-color: #667eea;
    }

    .select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-right: 48px;
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

      .input, .select {
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
export class AdditionalInfoComponent {
  private router = inject(Router);
  private subscriptionService = inject(SubscriptionService);
  private customerService = inject(CustomerService);
  companyId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;

  constructor(){
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
    this.filterById();
  }

  businessName = this.subscriptionService.getSubscriptionData().businessName || '+Breve';

  formData = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: '',
    documentType: '',
    documentNumber: ''
  };

  errors = {
    gender: '',
    documentType: '',
    documentNumber: ''
  };

  async filterById(){
    const customer = await this.customerService.filterById(this.customerId!);
    this.formData.id = customer.id!;
    this.formData.firstName = customer.firstName!;
    this.formData.lastName = customer.lastName!;
    this.formData.email = customer.email!;
  }

  validateGender() {
    if (!this.formData.gender) {
      this.errors.gender = 'Selecciona tu género';
      return false;
    }
    this.errors.gender = '';
    return true;
  }

  validateDocumentType() {
    if (!this.formData.documentType) {
      this.errors.documentType = 'Selecciona el tipo de documento';
      return false;
    }
    this.errors.documentType = '';
    return true;
  }

  validateDocumentNumber() {
    if (!this.formData.documentNumber.trim()) {
      this.errors.documentNumber = 'Completa tu número de documento';
      return false;
    }
    if (!/^[0-9]+$/.test(this.formData.documentNumber)) {
      this.errors.documentNumber = 'El número de documento solo puede contener números';
      return false;
    }
    if (this.formData.documentNumber.length < 6) {
      this.errors.documentNumber = 'El número de documento debe tener al menos 6 dígitos';
      return false;
    }
    this.errors.documentNumber = '';
    return true;
  }

  onGenderChange() {
    if (this.errors.gender) {
      this.validateGender();
    }
  }

  onDocumentTypeChange() {
    if (this.errors.documentType) {
      this.validateDocumentType();
    }
  }

  onDocumentNumberInput() {
    if (this.errors.documentNumber) {
      this.validateDocumentNumber();
    }
  }

  isFormValid(): boolean {
    return this.formData.gender !== '' &&
           this.formData.documentType !== '' &&
           this.formData.documentNumber.trim() !== '' &&
           this.errors.gender === '' &&
           this.errors.documentType === '' &&
           this.errors.documentNumber === '';
  }

  async onSubmit() {
    this.validateGender();
    this.validateDocumentType();
    this.validateDocumentNumber();

    if (this.isFormValid()) {
      try {
        const customer = await this.customerService.update(this.formData);
        this.router.navigate(['/contract'], { state: { company: { id: this.companyId }, customer: {id: customer.id }, plan: {id: this.planId } }});
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
