import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SubscriptionService } from '../../services/subscription.service';
import { PlanService } from '../../services/plan-service';
import { Plan } from '../../models/plan';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProgressBarComponent],
  template: `
    <div class="page-container">
      <app-header [businessName]="businessName"></app-header>

      <div class="content">
        <div class="step-header">
          <h1 class="title">Planes</h1>
          <span class="step-counter">2/6</span>
        </div>

        <app-progress-bar [currentStep]="2" [totalSteps]="6"></app-progress-bar>

        <p class="description">
          Elige el plan que mejor se adapte a tus necesidades
        </p>

        <div class="plans-container">
          <div
            *ngFor="let plan of plans"
            class="plan-card"
            [class.selected]="selectedPlan?.id === plan.id"
            (click)="selectPlan(plan)"
          >
            <div class="plan-badge" *ngIf="plan.popular">
              MÁS POPULAR
            </div>

            <div class="plan-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <div class="plan-price">\${{ formatPrice(plan.price!) }}/mes</div>
            </div>

            <ul class="features-list">
              <li *ngFor="let feature of plan.features" class="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          class="btn-continue"
          [disabled]="!selectedPlan"
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

    .plans-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .plan-card {
      position: relative;
      border: 3px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .plan-card:hover {
      border-color: #667eea;
    }

    .plan-card.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .plan-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: linear-gradient(90deg, #f59e0b 0%, #f97316 100%);
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 20px;
      margin-top: 24px;
    }

    .plan-card:not(:has(.plan-badge)) .plan-header {
      margin-top: 0;
    }

    .plan-name {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .plan-price {
      font-size: 24px;
      font-weight: 700;
      color: #6B4EE6;
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

      .plan-card {
        padding: 20px;
      }

      .plan-name {
        font-size: 20px;
      }

      .plan-price {
        font-size: 20px;
      }

      .feature-item {
        font-size: 14px;
      }

      .btn-continue {
        margin-top: 32px;
        padding: 16px;
        font-size: 16px;
      }
    }
  `]
})
export class PlansComponent {
  private router = inject(Router);
  private subscriptionService = inject(SubscriptionService);
  private planService = inject(PlanService);

  businessName = this.subscriptionService.getSubscriptionData().businessName || '+Breve';
  plans: Plan[] = [];
  selectedPlan: Plan | null = null;
  companyId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
    this.filterByCompany();
  }

  async filterByCompany(){
    try {
    this.plans = await this.planService.filterByCompany(this.companyId!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }

  onContinue() {
    if (this.selectedPlan) {
      this.planId = this.selectedPlan.id!;
      this.router.navigate(['/additional-info'], { state: { company: { id: this.companyId }, customer: {id: this.customerId }, plan: {id: this.planId } }});
    }
  }
}
