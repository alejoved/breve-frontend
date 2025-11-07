import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CustomerService } from '../../services/customer-service';
import { PlanService } from '../../services/plan-service';
import { Plan } from '../../models/plan';
import { Customer } from '../../models/customer';
import Swal from 'sweetalert2';
import { PayService } from '../../services/pay-service';
import { Pay } from '../../models/pay';
import { business_name } from '../../../constants';
declare global {
  interface Window { WidgetCheckout?: any; }
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProgressBarComponent],
  template: `
    <div class="page-container">
      <app-header [businessName]="businessName"></app-header>

      <div class="content">
        <div class="step-header">
          <h1 class="title">Resumen</h1>
          <span class="step-counter">5/6</span>
        </div>

        <app-progress-bar [currentStep]="5" [totalSteps]="6"></app-progress-bar>

        <p class="description">
          Revisa los detalles antes de proceder al pago
        </p>

        <div class="summary-section">
          <h3 class="section-label">Negocio</h3>
          <div class="section-content">
            <h4 class="section-title">Contrato de suscripción</h4>
          </div>
        </div>

        <div class="summary-section">
          <h3 class="section-label">Plan seleccionado</h3>
          <div class="section-content">
            <h4 class="section-title">{{ plan?.name }}</h4>
            <p class="plan-price">\${{ formatPrice(plan?.price || 0) }}/mes</p>
          </div>
        </div>

        <div class="summary-section">
          <h3 class="section-label">Datos personales</h3>
          <div class="section-content">
            <h4 class="section-title">
              {{ customer?.firstName }} {{ customer?.lastName }}
            </h4>
            <p class="section-text">{{ customer?.email }}</p>
            <p class="section-text">
              {{ getDocumentTypeLabel() }}: {{ customer?.documentNumber }}
            </p>
          </div>
        </div>

        <div class="summary-section">
          <h3 class="section-label">Características del Plan</h3>
          <ul class="features-list">
            <li *ngFor="let feature of plan?.features" class="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
          <button
            type="button"
            class="btn-continue"
            (click)="onPay()">
            Pagar
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

    .summary-section {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 16px;
    }

    .section-label {
      font-size: 14px;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 12px 0;
    }

    .section-content {
      margin: 0;
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 8px 0;
    }

    .section-text {
      font-size: 16px;
      color: #6b7280;
      margin: 4px 0;
    }

    .plan-price {
      font-size: 20px;
      font-weight: 700;
      color: #6B4EE6;
      margin: 4px 0 0 0;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 16px;
      color: #1f2937;
    }

    .feature-item svg {
      flex-shrink: 0;
      margin-top: 2px;
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

    .btn-continue:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
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

      .summary-section {
        padding: 20px;
      }

      .section-title {
        font-size: 18px;
      }

      .section-text {
        font-size: 14px;
      }

      .plan-price {
        font-size: 18px;
        color: #6B4EE6;
      }

      .feature-item {
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
export class SummaryComponent {
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private planService = inject(PlanService);
  private payService = inject(PayService);
  companyId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;
  plan: Plan | null = null;
  customer: Customer | null = null;

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
    this.planFilterById();
    this.customerFilterById();
  }

  businessName = business_name;

  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }

  getDocumentTypeLabel(): string {
    const types: { [key: string]: string } = {
      'cc': 'Cédula de ciudadanía',
      'ce': 'Cédula de extranjería',
      'pasaporte': 'Pasaporte',
      'ti': 'Tarjeta de identidad'
    };
    return types[this.customer?.documentType || ''] || 'Documento';
  }

  async planFilterById(){
    try {
      this.plan = await this.planService.filterById(this.planId!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
  }
  async customerFilterById(){
    try {
      this.customer = await this.customerService.filterById(this.customerId!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
  }

  async onPay() {
    const pay = new Pay();
    pay.customer = { id: this.customerId! };
    pay.plan = { id: this.planId! };
    pay.company = { id: this.companyId! };
    const res = await this.payService.create(pay);
    const Widget = window.WidgetCheckout;
    if (!Widget) {
      Swal.fire({
        icon: 'error',
        title: 'Widget de pago no disponible',
        text: 'El script del widget no se cargó. Recarga la página e intenta de nuevo.'
      });
      return;
    }
    console.log(res);
    var checkout = new Widget({
      currency: res.currency,
      amountInCents: res.amount,
      reference: res.reference,
      publicKey: res.publicKey,
      signature: {integrity : res.signature},
      customerData: { // Opcional
        fullName: res.customer?.firstName + ' ' + res.customer?.lastName,
        email: res.customer?.email,
        phoneNumber: res.customer?.phone,
        phoneNumberPrefix: res.prefix,
        legalId: res.customer?.documentNumber,
        legalIdType: res.customer?.documentType
      },
    });
    checkout.open(function (result: any) {
      if (result?.transaction) {
        console.log('Transaction:', result.transaction);
      } else {
        console.log('Checkout result:', result);
      }
    });
  }
}
