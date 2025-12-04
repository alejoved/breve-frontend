import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from '../../models/subscription';
import { SubscriptionService } from '../../services/subscription-service';
import Swal from 'sweetalert2';
import { Pay } from '../../models/pay';
import { PayService } from '../../services/pay-service';
import { prefix } from '../../../constants';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  cedula: string = '';
  subscriptionId: string = '';
  renovacion: Subscription | null = null;
  pay: Pay | null = null;
  loading: boolean = true;

  constructor(private router: Router, private subscriptionService: SubscriptionService, private payService: PayService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.subscriptionId = state['subscription'].id;
      }
      if(!state){
        this.router.navigate(['/portal']);
      }
  }

  ngOnInit(): void {
    this.loadSubscription();
  }

  async loadSubscription() {
    this.loading = true;
    this.renovacion = await this.subscriptionService.filterById(this.subscriptionId);
    this.loading = false;
  }

  goBack(): void {
    this.router.navigate(['/subscription'])
  }

  async handlePay() {
    try{
        this.pay = new Pay();
        this.pay.customer = { id: this.renovacion?.customer?.id! };
        this.pay.plan = { id: this.renovacion?.plan?.id! };
        this.pay.business = { id: this.renovacion?.business?.id! };
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
        currency: this.pay?.currency,
        amountInCents: this.pay?.amountInCents,
        reference: this.pay?.reference,
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
            subscription.business = { id: this.renovacion?.business?.id! };
            subscription.customer = { id: this.renovacion?.customer?.id! };
            subscription.plan = { id: this.renovacion?.plan?.id! };
            subscription.pay = { id: this.pay?.id! };
            await this.subscriptionService.create(subscription);
            this.renovacion!.status = "inactive";
            console.log(this.renovacion);
            await this.subscriptionService.update(this.renovacion!);
            Swal.fire({
            icon: 'success',
            title: 'Pago exitoso',
            text: 'Tu pago ha sido procesado correctamente.'
            });
            this.router.navigate(['/payment'], { state: { customer: {id: this.renovacion?.customer?.id! } } });
        } catch (ex: any) {
            Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
            this.router.navigate(['/portal']);
        }
        });
    } catch (ex: any) {
        Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
        this.router.navigate(['/portal']);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO');
  }

  formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('es-CO');
  }
}