import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from '../../models/subscription';
import { SubscriptionService } from '../../services/subscription-service';
import { v4 as uuidv4 } from 'uuid';
import { Pay } from '../../models/pay';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  subscriptions: Subscription[] = [];
  payId = uuidv4();
  issueDate = null;
  dueDate = null;
  isLoading: boolean = true;
  customerId: string = '';
  pay: Pay | null = null;

  constructor(
    private router: Router, private subscriptionService: SubscriptionService) {
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
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
      this.router.navigate(['']);
    } finally {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  viewDetail(subscriptionId: string): void {
    this.router.navigate(['/payment-detail'], { state: { subscription: {id: subscriptionId } } });
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

  formatStatus(status: string): string {
    if(status === 'active') {
      return 'Activa';
    } else if (status === 'inactive') {
      return 'Inactiva';
    } else if (status === 'renewal') {
      return 'Renovación';
    } else {
      return status;
    }
  }
}
