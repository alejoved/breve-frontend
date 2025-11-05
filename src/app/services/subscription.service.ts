import { Injectable, signal } from '@angular/core';
import { SubscriptionData, Plan } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionData = signal<SubscriptionData>({
    businessName: '+Breve',
    businessLogo: ''
  });

  getSubscriptionData() {
    return this.subscriptionData();
  }

  updateContactData(data: any) {
    this.subscriptionData.update(current => ({
      ...current,
      contactData: data
    }));
  }

  updateSelectedPlan(plan: Plan) {
    this.subscriptionData.update(current => ({
      ...current,
      selectedPlan: plan
    }));
  }

  updateAdditionalInfo(data: any) {
    this.subscriptionData.update(current => ({
      ...current,
      additionalInfo: data
    }));
  }

  updateTermsAccepted(accepted: boolean) {
    this.subscriptionData.update(current => ({
      ...current,
      termsAccepted: accepted
    }));
  }

  getPlans(): Plan[] {
    return [
      {
        id: 'basico',
        name: 'Plan Básico',
        price: 89000,
        features: [
          'Acceso al gimnasio.',
          'Vestuarios',
          '1 clase grupal/semana'
        ]
      },
      {
        id: 'premium',
        name: 'Plan Premium',
        price: 129000,
        features: [
          'Acceso al gimnasio.',
          'Clases grupales ilimitadas',
          'Entrenador personal 2h/mes',
          'Nutricionista'
        ],
        popular: true
      }
    ];
  }
}
