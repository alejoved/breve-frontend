import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from '../../models/subscription';
import { SubscriptionService } from '../../services/subscription-service';
import { v4 as uuidv4 } from 'uuid';
import { Pay } from '../../models/pay';
import { PayService } from '../../services/pay-service';
import Swal from 'sweetalert2';
import { prefix } from '../../../constants';

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
    private router: Router, private subscriptionService: SubscriptionService, private payService: PayService) {
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

  async onPay(renovacion: Subscription) {
    try{
      this.pay = new Pay();
      this.pay.customer = { id: renovacion.customer?.id! };
      this.pay.plan = { id: renovacion.plan?.id! };
      this.pay.business = { id: renovacion.business?.id! };
      this.pay = await this.payService.create(this.pay);
      const Widget = window.WidgetCheckout;
      if (!Widget) {
        Swal.fire({
          icon: 'error',
          title: 'Widget de pago no disponible',
          text: 'El script del widget no se cargó. Recarga la página e intenta de nuevo.'
        });
        return;
      }
      var checkout = new Widget({
        currency: this.pay.currency,
        amountInCents: this.pay.amountInCents,
        reference: this.pay.reference,
        publicKey: this.pay.publicKey,
        signature: {integrity : this.pay.signature},
        customerData: { // Opcional
          fullName: this.pay.customer?.firstName + ' ' + this.pay.customer?.lastName,
          email: this.pay.customer?.email,
          phoneNumber: this.pay.customer?.phone,
          phoneNumberPrefix: prefix,
          legalId: this.pay.customer?.documentNumber,
          legalIdType: this.pay.customer?.documentType
        },
      });
      checkout.open(async (result: any) => {
        try {
          this.pay!.status = result.transaction.status;
          this.pay!.type = result.transaction.paymentMethodType;
          this.pay!.transactionDate = result.transaction.finalizedAt;
          this.pay = await this.payService.update(this.pay!);
          const subscription = new Subscription();
          subscription.business = { id: renovacion.business?.id! };
          subscription.customer = { id: renovacion.customer?.id! };
          subscription.plan = { id: renovacion.plan?.id! };
          subscription.pay = { id: this.pay?.id! };
          await this.subscriptionService.create(subscription);
          renovacion.status = "inactive";
          console.log(renovacion);
          await this.subscriptionService.update(renovacion);
          Swal.fire({
            icon: 'success',
            title: 'Pago exitoso',
            text: 'Tu pago ha sido procesado correctamente.'
          });
          this.router.navigate(['/portal']);
        } catch (ex: any) {
          Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
        }
      });
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
  }
}
