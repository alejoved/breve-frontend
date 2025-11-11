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
import { business_name } from '../../../constants';
declare global {
  interface Window { WidgetCheckout?: any; }
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProgressBarComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private planService = inject(PlanService);
  businessId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;
  plan: Plan | null = null;
  customer: Customer | null = null;

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
    this.router.navigate(['/clarity'], { state: { business: { id: this.businessId }, customer: {id: this.customerId }, plan: {id: this.planId } }});
  }
}
