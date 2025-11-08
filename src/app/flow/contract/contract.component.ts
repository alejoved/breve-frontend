import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { business_name } from '../../../constants';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  template: `
    <div class="page-container">
      <app-header [businessName]="businessName"></app-header>

      <div class="content">
        <div class="step-header">
          <h1 class="title">Contrato</h1>
          <span class="step-counter">4/6</span>
        </div>

        <app-progress-bar [currentStep]="4" [totalSteps]="6"></app-progress-bar>

        <p class="description">
          Lee y acepta nuestros términos para continuar
        </p>

        <div class="contract-box">
          <h2 class="contract-title">Contrato de suscripción</h2>
          <div class="contract-content">
            <p>Al suscribirte a GymUp Manizales, aceptas los siguientes términos y condiciones:</p>

            <p><strong>1. SERVICIOS:</strong> El proveedor se compromete a brindar los servicios descritos en el plan seleccionado.</p>

            <p><strong>2. PAGO:</strong> El pago se realizará de forma automática según la periodicidad del plan elegido.</p>

            <p><strong>3. CANCELACIÓN:</strong> Puedes cancelar tu suscripción en cualquier momento con un preaviso de 30 días. No se realizarán reembolsos proporcionales del período en curso.</p>

            <p><strong>4. USO DE INSTALACIONES:</strong> El suscriptor se compromete a seguir las normas de uso de las instalaciones y respetar el reglamento interno del gimnasio.</p>

            <p><strong>5. RESPONSABILIDAD:</strong> El gimnasio no se hace responsable por lesiones causadas por mal uso de los equipos o por no seguir las recomendaciones del personal.</p>

            <p><strong>6. PRIVACIDAD:</strong> Tus datos personales serán tratados de acuerdo con nuestra política de privacidad y no serán compartidos con terceros sin tu consentimiento.</p>

            <p><strong>7. MODIFICACIONES:</strong> Nos reservamos el derecho de modificar estos términos con previo aviso de 15 días.</p>
          </div>
        </div>

        <label class="checkbox-container">
          <input
            type="checkbox"
            [(ngModel)]="termsAccepted"
            name="terms"
          />
          <span class="checkbox-label">
            Acepto los términos y condiciones del contrato de suscripción.
          </span>
        </label>

        <button
          type="button"
          class="btn-continue"
          [disabled]="!termsAccepted"
          (click)="onContinue()"
        >
          Continuar
        </button>
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

    .contract-box {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      max-height: 400px;
      overflow-y: auto;
    }

    .contract-title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 20px 0;
    }

    .contract-content {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.6;
    }

    .contract-content p {
      margin: 0 0 16px 0;
    }

    .contract-content p:last-child {
      margin-bottom: 0;
    }

    .contract-content strong {
      color: #1f2937;
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      padding: 20px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.2s;
    }

    .checkbox-container:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.02);
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 2px;
      accent-color: #667eea;
    }

    .checkbox-label {
      font-size: 16px;
      color: #1f2937;
      line-height: 1.5;
    }

    .btn-continue {
      width: 100%;
      margin-top: 32px;
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

      .contract-box {
        padding: 20px;
        max-height: 300px;
      }

      .contract-title {
        font-size: 18px;
      }

      .contract-content {
        font-size: 14px;
      }

      .checkbox-container {
        padding: 16px;
      }

      .checkbox-label {
        font-size: 14px;
      }

      .btn-continue {
        margin-top: 24px;
        padding: 16px;
        font-size: 16px;
      }
    }
  `]
})
export class ContractComponent {
  private router = inject(Router);
  companyId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  businessName = business_name;
  termsAccepted = false;

  onContinue() {
    if (this.termsAccepted) {
      this.router.navigate(['/summary'], { state: { company: { id: this.companyId }, customer: {id: this.customerId }, plan: {id: this.planId } }});
    }
  }
}
