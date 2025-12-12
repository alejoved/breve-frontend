import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PlanService } from '../../services/plan-service';
import { Plan } from '../../models/plan';
import Swal from 'sweetalert2';
import { business_name } from '../../../constants';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProgressBarComponent],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  private router = inject(Router);
  private planService = inject(PlanService);

  businessName = business_name;
  plans: Plan[] = [];
  selectedPlan: Plan | null = null;
  businessId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;
  expandedPlans: Set<string> = new Set<string>();

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.businessId = state['business'].id;
      this.customerId = state['customer'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
    this.filterByBusiness();
  }

  async filterByBusiness(){
    try {
      this.plans = await this.planService.filterByBusiness(this.businessId!);
      if(this.plans.length === 0){
        Swal.fire({ icon: "error", title: "Error", text: "No se encontraron planes para este negocio." });
        this.router.navigate(['']);
      }
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
      this.router.navigate(['']);
    }
  }

  isSelected(planId: string): boolean {
    return this.selectedPlan?.id === planId;
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }

  toggleExpanded(event: Event, planId: string): void {
    event.stopPropagation();
    if (this.expandedPlans.has(planId)) {
      this.expandedPlans.delete(planId);
    } else {
      this.expandedPlans.add(planId);
    }
  }

  isExpanded(planId: string): boolean {
    return this.expandedPlans.has(planId);
  }

  getVisibleFeatures(plan: Plan): string[] {
    return this.isExpanded(plan.id!) ? plan.features! : plan.features!.slice(0, 3);
  }

  hasMoreFeatures(plan: Plan): boolean {
    return plan.features!.length > 3;
  }

  onContinue() {
    if (this.selectedPlan) {
      this.planId = this.selectedPlan.id!;
      this.router.navigate(['/additional-info'], { state: { business: { id: this.businessId }, customer: {id: this.customerId }, plan: {id: this.planId } }});
    }
  }
}
