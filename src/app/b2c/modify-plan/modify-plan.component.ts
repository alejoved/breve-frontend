import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Plan } from '../../models/plan';
import { PlanService } from '../../services/plan-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.css']
})
export class ModifyPlanComponent implements OnInit {
  plans: Plan[] = [];
  selectedPlanId: string = '';
  customerId: string = '';
  businessId: string = '';
  planId: string = '';
  isLoading: boolean = true;
  isSaving: boolean = false;

  constructor(
    private router: Router,
    private planService: PlanService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.customerId = state['customer'].id;
      this.businessId = state['business'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['/portal']);
    }
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      this.plans = await this.planService.filterByBusiness(this.businessId);
      this.selectedPlanId = this.planId;
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
      this.router.navigate(['/portal']);
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/payment']);
  }

  selectPlan(planId: string) {
    this.selectedPlanId = planId;
  }

  async onSaveChanges() {
    if (this.selectedPlanId === this.planId) {
      this.goBack();
      return;
    }
    this.isSaving = true;
    this.router.navigate(['/payment'], { state: { business: { id: this.businessId }, customer: { id: this.customerId }, plan: { id: this.selectedPlanId } } });
    this.isSaving = false;
  }

  formatCurrency(amount: number, type: string): string {
    return `$${amount.toLocaleString('es-CO')}/` + type;
  }

  canSave(): boolean {
    return !this.isSaving && this.selectedPlanId !== '' &&
           this.selectedPlanId !== this.planId;
  }
}
