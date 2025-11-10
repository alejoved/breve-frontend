import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pay } from '../../models/pay';
import { Router } from '@angular/router';
import { PayService } from '../../services/pay-service';
import Swal from 'sweetalert2';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-button" (click)="onClose()" aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div class="modal-body">
          <div class="icon-container">
            <img src="/assets/Seguro.png" alt="Pago seguro" class="security-icon" />
          </div>

          <h2 class="modal-title">Pago seguro con</h2>

          <div class="logos-container">
            <img src="/assets/Logo Wompi +Breve.png" alt="Wompi + Breve" class="partnership-logo" />
          </div>

          <p class="modal-description">
            Procesamos tu pago con Wompi a través de +Breve, quien gestiona la transacción y envía el dinero a
            <strong>{{ business?.name }}</strong>.
          </p>

          <button class="btn-continue" (click)="onContinue()">
            Continuar con el pago
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay{
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:1000;
      padding:20px;
      box-sizing:border-box;
      animation: fadeIn .2s ease-out;
    }
    @keyframes fadeIn{
      from { opacity:0; } to { opacity:1; }
    }

    .modal-content{
      background:#fff;
      border-radius:24px;
      max-width:900px;
      width:100%;
      position:relative;
      animation: slideUp .3s ease-out;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow:hidden;
    }
    @keyframes slideUp{
      from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; }
    }

    .close-button{
      position:absolute;
      top:20px;
      right:20px;
      background:#f3f4f6;
      border:none;
      border-radius:50%;
      width:40px;
      height:40px;
      display:flex;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      transition:all .2s;
      color:#6b7280;
    }
    .close-button:hover{
      background:#e5e7eb;
      color:#1f2937;
    }

    .modal-body{
      padding:48px 32px 32px;
      text-align:center;
    }

    .icon-container{
      display:flex;
      justify-content:center;
      margin-bottom:24px;
    }
    .security-icon{
      width:48px;
      height:auto;
    }

    .modal-title{
      font-size:28px;
      font-weight:700;
      color:#1f2937;
      margin:0 0 24px 0;
      line-height:1.3;
    }

    .logos-container{
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:32px;
    }
    .partnership-logo{
      max-width:320px;
      width:100%;
      height:auto;
    }

    .modal-description{
      font-size:16px;
      color:#6b7280;
      line-height:1.6;
      margin:0 0 32px 0;
      text-align:center;
    }
    .modal-description strong{
      color:#1f2937;
      font-weight:600;
    }

    .btn-continue{
      width:100%;
      padding:18px;
      background: linear-gradient(90deg, #FF8BAA 0%, #6B4EE6 100%);
      color:#fff;
      border:none;
      border-radius:40px;
      font-size:18px;
      font-weight:600;
      cursor:pointer;
      transition: all .3s;
      font-family: inherit;
    }
    .btn-continue:hover{
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102,126,234,0.3);
    }

    @media (max-width: 768px) {
      .modal-content{ border-radius:20px; margin:0 16px; }
      .close-button{ width:36px; height:36px; top:16px; right:16px; }
      .modal-title{ font-size:24px; margin-bottom:20px; }
      .modal-body{ padding:40px 24px 24px; }
      .security-icon{ width:40px; }
      .partnership-logo{ max-width:280px; }
      .modal-description{ font-size:15px; margin-bottom:24px; }
      .btn-continue{ padding:16px; font-size:16px; }
    }
  `]
})
export class ClarityComponent {
    private router = inject(Router);
    private payService = inject(PayService);
    private businessService = inject(BusinessService);
    @Output() close = new EventEmitter<void>();
    @Output() continue = new EventEmitter<void>();

    businessId: string | null = null;
    customerId: string | null = null;
    planId: string | null = null;
    business: Business | null = null;

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
        const pay = new Pay();
        pay.customer = { id: this.customerId! };
        pay.plan = { id: this.planId! };
        pay.business = { id: this.businessId! };
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
      } catch (ex: any) {
        Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
      }
    }
}