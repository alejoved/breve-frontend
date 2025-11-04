import { Injectable, signal } from '@angular/core';
import { SubscriptionData } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionData = signal<SubscriptionData>({
    businessName: '+Breve',
    businessLogo: '',
    companyId: ""
  });

  getSubscriptionData() {
    return this.subscriptionData();
  }

  updateTermsAccepted(accepted: boolean) {
    this.subscriptionData.update(current => ({
      ...current,
      termsAccepted: accepted
    }));
  }
}
