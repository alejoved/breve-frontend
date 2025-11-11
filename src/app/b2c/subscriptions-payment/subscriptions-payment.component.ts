import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from '../../models/subscription';
import { SubscriptionService } from '../../services/subscription-service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-subscriptions-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions-payment.component.html',
  styleUrls: ['./subscriptions-payment.component.css']
})
export class SubscriptionsPaymentComponent implements OnInit {
  subscriptions: Subscription[] = [];
  payId = uuidv4();
  issueDate = null;
  dueDate = null;
  isLoading: boolean = true;
  customerId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService) {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.customerId = state['customer'].id;
      }
      if(!state){
        this.router.navigate(['/portal']);
      }
    }

  async ngOnInit() {
    await this.loadSubscriptionData();
  }

  async loadSubscriptionData() {
    this.isLoading = true;

    try {
      this.subscriptions = await this.subscriptionService.filterByCustomerAndRenewal(this.customerId);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      this.router.navigate(['/']);
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  editPlan(subscription: Subscription) {
    this.router.navigate(['/modify-plan'], { state: { business: { id: subscription.business?.id }, customer: {id: subscription.customer?.id }, plan: {id: subscription.plan?.id } }});
  }

  formatCurrency(amount: number): string {
    return `$${amount.toLocaleString('es-CO')}`;
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const day = d.getDate();
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} de ${month} de ${year}`;
  }

  onPagar(subscription: Subscription) {
    alert(`Procesando pago de ${this.formatCurrency(subscription.plan?.price!)} para la suscripción ${subscription.id}`);
  }
}
