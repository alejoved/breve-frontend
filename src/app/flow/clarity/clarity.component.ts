import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pay } from '../../models/pay';
import { Router } from '@angular/router';
import { PayService } from '../../services/pay-service';
import Swal from 'sweetalert2';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';
import { SubscriptionService } from '../../services/subscription-service';
import { Subscription } from '../../models/subscription';
import { prefix } from '../../../constants';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clarity.component.html',
  styleUrls: ['./clarity.component.css']
})
export class ClarityComponent {
    private router = inject(Router);
    private payService = inject(PayService);
    private businessService = inject(BusinessService);
    private subscriptionService = inject(SubscriptionService)
    @Output() close = new EventEmitter<void>();
    @Output() continue = new EventEmitter<void>();

    businessId: string | null = null;
    customerId: string | null = null;
    planId: string | null = null;
    business: Business | null = null;
    pay: Pay | null = null;

    constructor() {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
            this.businessId = state['business'].id;
            this.customerId = state['customer'].id;
            this.planId = state['plan'].id;
        }
        if(!state){
            this.router.navigate(['']);
        }
        this.businessFilterById();
    }

    onClose(): void {
        this.close.emit();
    }

    onContinue(): void {
        this.onPay();
    }

    async businessFilterById(){
        try {
          this.business = await this.businessService.filterById(this.businessId!);
        } catch (ex: any) {
          Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
        }
    }
    async onPay() {
      try{
        this.pay = new Pay();
        this.pay.customer = { id: this.customerId! };
        this.pay.plan = { id: this.planId! };
        this.pay.business = { id: this.businessId! };
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
            console.log(result.transaction);
            this.pay!.status = result.transaction.status;
            this.pay!.type = result.transaction.paymentMethodType;
            this.pay!.transactionDate = result.transaction.finalizedAt;
            this.payService.update(this.pay!);
            const subscription = new Subscription();
            subscription.business = { id: this.businessId! };
            subscription.customer = { id: this.customerId! };
            subscription.plan = { id: this.planId! };
            subscription.pay = { id: this.pay!.id };
            await this.subscriptionService.create(subscription);
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